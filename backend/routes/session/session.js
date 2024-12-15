const User = require("../../models/user");
const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

function generateToken(res, email, id) {
  const expiration = 604800000;
  const token = jwt.sign({ email, id }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: false, // set to true if your using https
    httpOnly: false,
  });
}

module.exports = function (app) {
  app.post("/signup", async function (req, res) {
    let userData = req.body;
    let user = await User.findOne({ email: userData.email });
    if (!user) {
      let pw = SHA256(userData.password);
      userData.password = pw;
      let user = new User(userData);
      user.save(function (err) {
        if (err) {
          res.status(422).send("Daten sind fehlerhaft.");
        } else {
          generateToken(res, userData.email, user._id);
          res.status(201).send("Erfolgreich registriert.");
        }
      });
    } else {
      res.status(401).send("Benutzer existiert bereits.");
    }
  });

  app.post("/login", async function (req, res) {
    let userData = req.body;
    let user = await User.findOne({ email: userData.email });
    if (user) {
      let pw = SHA256(userData.password);

      if (user.password === pw.toString()) {
        generateToken(res, userData.email, user._id);
        res.status(201).send("Erfolgreich angemeldet.");
      } else {
        res.status(401).send("Benutzername oder Passwort falsch.");
      }
    } else {
      res.status(401).send("Benutzer existiert nicht.");
    }
  });

  app.post("/logout", function (req, res) {
    res.clearCookie("token");
    res.status(200).send("Erfolgreich abgemeldet.");
  });

  app.post("/getUser", verifyToken, async (req, res) => {
    const token = req.body.token || "";
    let userId;

    try {
      if (!token) {
        return res.status(401).json("Sie müssen dazu angemeldet sein.");
      }

      const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET);
      userId = decrypt.id;
    } catch (err) {
      return res.status(500).json(err.toString());
    }

    const user = await User.findOne({ _id: userId });
    if (user) {
      user.password = undefined;
      res.status(201).send(user);
    } else {
      res.status(401).send("Benutzer existiert nicht.");
    }
  });

  app.post("/setUserData", verifyToken, async (req, res) => {
    const user = new User(req.body);
    const foundUser = await User.findOne({ _id: user._id });
    if (foundUser) {
      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          firstname: user.firstname,
          lastname: user.lastname,
          street: user.street,
          postcode: user.postcode,
          city: user.city,
          country: user.country,
          phone: user.phone,
        }
      );

      res.status(201).send("Änderungen erfolgreich gespeichert.");
    } else {
      res.status(401).send("Benutzer existiert nicht.");
    }
  });

  app.post("/setUserEmail", verifyToken, async (req, res) => {
    const user = new User(req.body);
    const foundUser = await User.findOne({ _id: user._id });
    if (foundUser) {
      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          email: user.email,
        }
      );

      res.status(201).send("Email erfolgreich geändert.");
    } else {
      res.status(401).send("Benutzer existiert nicht.");
    }
  });

  app.post("/setUserPassword", verifyToken, async (req, res) => {
    const user = new User(req.body);
    const foundUser = await User.findOne({ _id: user._id });
    if (foundUser) {
      const oldPw = SHA256(req.body.oldPassword);
      const newPw = SHA256(req.body.password);

      if (foundUser.password === oldPw.toString()) {
        user.password = newPw;

        await User.findByIdAndUpdate(
          { _id: user._id },
          {
            password: user.password,
          }
        );

        res.status(201).send("Passwort erfolgreich geändert.");
      } else {
        res.status(401).send("Passwort falsch.");
      }
    } else {
      res.status(401).send("Benutzer existiert nicht.");
    }
  });
};

const User = require("../../models/user");
const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

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
          res.status(422).send("data are not correct!");
        } else {
          generateToken(res, userData.email, user._id);
          res.status(201).send("successfully signed up!");
        }
      });
    } else {
      res.status(401).send("user already exists");
    }
  });

  app.post("/login", async function (req, res) {
    let userData = req.body;
    let user = await User.findOne({ email: userData.email });
    if (user) {
      let pw = SHA256(userData.password);

      if (user.password === pw.toString()) {
        generateToken(res, userData.email, user._id);
        res.status(201).send("successfully signed in!");
      } else {
        res.status(401).send("user or password wrong!");
      }
    } else {
      res.status(401).send("user does not exists");
    }
  });

  app.post("/logout", function (req, res) {
    res.clearCookie("token");
    res.status(200).send("logout successful");
  });

  app.post("/user", async (req, res) => {
    console.log(req.body);
    const token = req.body.token || "";
    let userId;

    try {
      if (!token) {
        return res.status(401).json("you need to login");
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
      res.status(401).send("user not found!");
    }
  });
};
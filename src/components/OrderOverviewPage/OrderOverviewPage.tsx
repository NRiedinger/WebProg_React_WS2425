import { useEffect, useState } from "react";
import axios from "../../axiosURL";
import { IOrder } from "../../interfaces/OrderInterface";
import "./OrderOverviewPage.scss";

const OrderOverviewPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    axios
      .get("/shop/orders", { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <div className="OrderOverviewPage"></div>;
};
export default OrderOverviewPage;

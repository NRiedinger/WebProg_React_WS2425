import { Accordion, AccordionTab } from "primereact/Accordion";
import { Column } from "primereact/Column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { IOrder } from "../../interfaces/OrderInterface";
import "./OrderOverviewPage.scss";

const OrderOverviewPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const navigate = useNavigate();

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

  const getArticlesTotalSum = (articles: any[]) => {
    return articles
      .map((article) => article.price * article.quantity)
      .reduce((a, b) => a + b, 0);
  };

  const orderAccordionHeaderTemplate = (order: IOrder) => {
    return (
      <div className="Header__Container">
        <div className="Header__Container__Item">
          <div>Bestellung aufgegeben</div>
          <div>{new Date(Date.parse(order.orderDate)).toLocaleString()}</div>
        </div>

        <div className="Header__Container__Item">
          <div>Summe</div>
          <div>{getArticlesTotalSum(order.articles).toFixed(2)}€</div>
        </div>
      </div>
    );
  };

  const articleImageTemplate = (article: any) => {
    return (
      <div
        className="Article__List__Image"
        onClick={() => {
          navigate(`/product/${article.articleId}`);
        }}
      >
        <img src={axios.defaults.baseURL + article.href} alt={article.href} />
      </div>
    );
  };

  const articlePriceTemplate = (article: any) => {
    return <div>{article.price.toFixed(2)}€</div>;
  };

  const orderArticleListFooterTemplate = (articles: any[]) => {
    return (
      <div className="Article__List__Footer">
        <h3>Summe: {getArticlesTotalSum(articles).toFixed(2)}€</h3>
      </div>
    );
  };

  const renderOrderArticleList = (articles: any[]) => {
    return (
      <div className="Article">
        <div className="Article__Header"></div>

        <DataTable
          className="Article__List"
          value={articles}
          tableStyle={{ minWidth: "50rem" }}
          stripedRows
          footer={orderArticleListFooterTemplate(articles)}
        >
          <Column header="" body={articleImageTemplate}></Column>
          <Column field="name" header="Name"></Column>
          <Column header="Preis" body={articlePriceTemplate}></Column>
          <Column field="quantity" header="Anzahl"></Column>
        </DataTable>
      </div>
    );
    return;
  };

  const orderList = orders.map((order: IOrder, index) => {
    return (
      <AccordionTab
        className="OrderOverviewPage__Container__Item"
        key={index}
        header={orderAccordionHeaderTemplate(order)}
      >
        {renderOrderArticleList(order.articles)}
      </AccordionTab>
    );
  });

  const noOrdersMessage = (
    <div className="OrderOverviewPage__NoOrders">
      Keine Bestellungen verfügbar
    </div>
  );

  return (
    <div className="OrderOverviewPage">
      <h2>Meine Bestellungen</h2>
      {!orders || orders.length === 0 ? (
        noOrdersMessage
      ) : (
        <Accordion className="OrderOverviewPage__Container">
          {orderList}
        </Accordion>
      )}
    </div>
  );
};
export default OrderOverviewPage;

import { ThunkDispatch } from "@reduxjs/toolkit";
import { DataView } from "primereact/dataview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../interfaces/ProductInterface";
import { AppState, loadItems } from "../../reducer/reducer";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import "./ProductOverviewPage.scss";

const ProductOverviewPage = () => {
  //const [items, setItems] = useState<IProduct[]>(populateItemList(100));
  const items = useSelector((state: AppState) => state.items);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  const itemTemplate = (item: IProduct) => {
    return (
      <div key={item._id} className="ProductOverviewPage__Item Grid">
        <ProductOverviewItem product={item}></ProductOverviewItem>
      </div>
    );
  };

  const listTemplate = (items: IProduct[]) => {
    if (!items || items.length === 0) return null;

    const list = items.map((item) => {
      return itemTemplate(item);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="ProductOverviewPage card">
      <DataView
        value={items}
        layout="grid"
        listTemplate={listTemplate}
      ></DataView>
    </div>
  );
};

export default ProductOverviewPage;

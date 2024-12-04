import { DataView } from "primereact/dataview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/ProductInterface";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import "./ProductOverviewPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadItems, AppState } from "../../reducer/reducer";
import { AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";

const ProductOverviewPage = () => {
  //const [items, setItems] = useState<IProduct[]>(populateItemList(100));
  const items = useSelector((state: AppState) => state.items);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  const itemTemplate = (item: IProduct) => {
    return (
      <div key={item._id} className="ProductOverview__Item Grid">
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
    <div className="ProductOverview card">
      <DataView value={items} layout="grid" listTemplate={listTemplate}></DataView>
    </div>
  );
};

export default ProductOverviewPage;

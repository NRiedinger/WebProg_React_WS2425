import { useState } from "react";
import "./ProductOverview.scss";
import { IProduct } from "../../interfaces/ProductInterface";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { classNames } from "primereact/utils";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const populateItemList = (count: number): IProduct[] => {
  const result: IProduct[] = [];
  for (let i = 1; i <= count; i++) {
    result.push({
      id: i,
      productname: `testproduct ${i}`,
      previewImagePath: null,
      price: 19.99,
    });
  }
  return result;
};

const ProductOverview = () => {
  const [items, setItems] = useState<IProduct[]>(populateItemList(100));
  const [layout, setLayout] = useState("grid");

  const gridItem = (item: IProduct) => {
    return (
      <div key={item.id} className="ProductOverview__Item Grid">
        <ProductOverviewItem
          product={item}
          layout={"grid"}
        ></ProductOverviewItem>
      </div>
    );
  };

  const listItem = (item: IProduct) => {
    return (
      <div key={item.id} className="ProductOverview__Item List">
        <ProductOverviewItem
          product={item}
          layout={"list"}
        ></ProductOverviewItem>
      </div>
    );
  };

  const itemTemplate = (item: IProduct, layout: string) => {
    if (!item) return;

    if (layout === "list") return listItem(item);
    else if (layout === "grid") return gridItem(item);
  };

  const listTemplate = (items: IProduct[], layout: string) => {
    return (
      <div className="grid grid-nogutter">
        {items.map((item) => itemTemplate(item, layout))}
      </div>
    );
  };

  /* const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout as "grid" | "list"}
          onChange={(e) => setLayout(e.value as "grid" | "list")}
        />
      </div>
    );
  }; */

  return (
    <div className="ProductOverview card">
      <DataView
        value={items}
        layout={layout as "grid" | "list"}
        listTemplate={listTemplate}
        /* header={header()} */
      ></DataView>
    </div>
  );
};

export default ProductOverview;

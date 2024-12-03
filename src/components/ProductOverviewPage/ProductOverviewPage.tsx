import { DataView } from "primereact/dataview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useState } from "react";
import { IProduct } from "../../interfaces/ProductInterface";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import "./ProductOverviewPage.scss";

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

const ProductOverviewPage = () => {
  const [items, setItems] = useState<IProduct[]>(populateItemList(100));

  const itemTemplate = (item: IProduct) => {
    return (
      <div key={item.id} className="ProductOverview__Item Grid">
        <ProductOverviewItem
          product={item}
          layout={"grid"}
        ></ProductOverviewItem>
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
      <DataView
        value={items}
        layout="grid"
        listTemplate={listTemplate}
      ></DataView>
    </div>
  );
};

export default ProductOverviewPage;

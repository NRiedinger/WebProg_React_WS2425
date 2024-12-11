import { ThunkDispatch } from "@reduxjs/toolkit";
import { DataView } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/ProductInterface";
import { AppState, loadItems } from "../../reducer/reducer";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import "./ProductOverviewPage.scss";

interface ISortOption {
  label: string;
  compareFn: (a: IProduct, b: IProduct) => number;
}

const ProductOverviewPage = () => {
  const items: IProduct[] = useSelector((state: AppState) => state.items);
  const [sortOption, setSortOption] = useState<ISortOption | null>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const sortOptions: ISortOption[] = [
    {
      label: "Niedrigster Preis",
      compareFn: (a: IProduct, b: IProduct) => {
        return a.price - b.price;
      },
    },
    {
      label: "Höchster Preis",
      compareFn: (a: IProduct, b: IProduct) => {
        return b.price - a.price;
      },
    },
  ];

  const onSortOptionChange = (e: DropdownChangeEvent) => {
    console.log(e.value);
    setSortOption(e.value);
  };

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  const itemTemplate = (item: IProduct) => {
    return (
      <div
        key={item._id}
        onClick={() => {
          navigate(`/product/${item._id}`);
        }}
        className="ProductOverviewPage__ItemWrapper Grid"
      >
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
    <div className="ProductOverviewPage">
      <div className="ProductOverviewPage__Toolbar">
        <Dropdown
          value={sortOption}
          options={sortOptions}
          optionLabel="label"
          onChange={(e) => setSortOption(e.value)}
        />
      </div>
      <DataView
        value={items}
        layout="grid"
        listTemplate={listTemplate}
      ></DataView>
    </div>
  );
};

export default ProductOverviewPage;

import { ThunkDispatch } from "@reduxjs/toolkit";
import { DataView } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/ProductInterface";
import { AppState, loadItems, setItems } from "../../reducer/reducer";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import "./ProductOverviewPage.scss";

enum SortType {
  PRICE_ASC = 1,
  PRICE_DESC,
  RATING_ASC,
  RATING_DESC,
}

interface ISortOption {
  label: string;
  sortType: SortType;
}

const ProductOverviewPage = () => {
  let items: IProduct[] = useSelector((state: AppState) => {
    return state.items;
  });
  const [sortOption, setSortOption] = useState<ISortOption | null>(null);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const sortOptions: ISortOption[] = [
    {
      label: "Niedrigster Preis",
      sortType: SortType.PRICE_ASC,
    },
    {
      label: "Höchster Preis",
      sortType: SortType.PRICE_DESC,
    },
    {
      label: "Niedrigste Bewertung",
      sortType: SortType.RATING_ASC,
    },
    {
      label: "Höchste Bewertung",
      sortType: SortType.RATING_DESC,
    },
  ];

  const onSortOptionChange = (e: DropdownChangeEvent) => {
    setSortOption(e.value);
    const itemArray = [...items];
    const sortType = e.value.sortType;
    switch (sortType) {
      case SortType.PRICE_ASC: {
        itemArray.sort((a: IProduct, b: IProduct) => {
          return a.price - b.price;
        });
        break;
      }
      case SortType.PRICE_DESC: {
        itemArray.sort((a: IProduct, b: IProduct) => {
          return b.price - a.price;
        });
        break;
      }
      case SortType.RATING_ASC: {
        itemArray.sort((a: IProduct, b: IProduct) => {
          return a.rating - b.rating;
        });
        break;
      }
      case SortType.RATING_DESC: {
        itemArray.sort((a: IProduct, b: IProduct) => {
          return b.rating - a.rating;
        });
        break;
      }
      default:
        break;
    }
    dispatch(setItems(itemArray));
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
        {
          <Dropdown
            value={sortOption}
            options={sortOptions}
            optionLabel="label"
            onChange={(e: DropdownChangeEvent) => onSortOptionChange(e)}
            placeholder="Sortieren"
          />
        }
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

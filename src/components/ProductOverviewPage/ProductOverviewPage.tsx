import { ThunkDispatch } from "@reduxjs/toolkit";
import { DataView } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../interfaces/Category";
import { IProduct } from "../../interfaces/ProductInterface";
import { ISubcategory } from "../../interfaces/Subcategory";
import { AppState, loadItemData } from "../../reducer/reducer";
import ProductOverviewItem from "../ProductOverviewItem/ProductOverviewItem";
import "./ProductOverviewPage.scss";

interface ISortOption {
  label: string;
  value: string;
}

const sortOptions: ISortOption[] = [
  { label: "Preis absteigend", value: "!price" },
  { label: "Preis aufsteigend", value: "price" },
  { label: "Bewertung absteigend", value: "!rating" },
  { label: "Bewertung aufsteigend", value: "rating" },
];

const ProductOverviewPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const { items, categories, subcategories } = useSelector(
    (state: AppState) => {
      return {
        items: state.items,
        categories: state.categories,
        subcategories: state.subcategories,
      };
    }
  );

  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<1 | 0 | -1 | undefined | null>(0);
  const [sortField, setSortField] = useState<string>("");

  const [filteredItems, setFilteredItems] = useState<IProduct[]>();
  const [allItems, setAllItems] = useState<IProduct[]>();
  const [selectedCategoryOptionName, setSelectedCategoryOptionName] = useState<
    string | undefined
  >();
  const [selectedSubcategoryOptionName, setSelectedSubcategoryOptionName] =
    useState<string | undefined>();
  const [subcategoryOptions, setSubcategoryOptions] =
    useState<ISubcategory[]>(subcategories);

  useEffect(() => {
    dispatch(loadItemData());
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    setAllItems(items);
  }, [items]);

  useEffect(() => {});

  const onSortOptionChange = (e: DropdownChangeEvent) => {
    const value = e.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const onCategoryOptionChange = (e: DropdownChangeEvent) => {
    const category: ICategory | undefined = categories.find(
      (category) => category.name === e.value
    );
    setSelectedCategoryOptionName(category?.name);
    setSelectedSubcategoryOptionName(undefined);

    if (category) {
      const filtered = items.filter(
        (item: IProduct) => item.categoryId === category._id
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems);
    }

    // filter subcategories depending on selected category
    if (category) {
      const filtered = subcategories.filter((subcategory: ISubcategory) => {
        return category.subcategoryIds.includes(subcategory._id);
      });
      setSubcategoryOptions(filtered);
    }
  };

  const onSubcategoryOptionChange = (e: DropdownChangeEvent) => {
    const category: ICategory | undefined = categories.find(
      (category) => category.name === selectedCategoryOptionName
    );

    const subcategory: ISubcategory | undefined = subcategories.find(
      (subcategory) => subcategory.name === e.value
    );
    setSelectedSubcategoryOptionName(subcategory?.name);

    if (category && subcategory) {
      setFilteredItems(
        items.filter(
          (item) =>
            item.categoryId === category._id &&
            item.subcategoryId === subcategory._id
        )
      );
    } else {
      setFilteredItems(
        items.filter((item) => item.categoryId === category?._id)
      );
    }

    if (!subcategory) {
      setSubcategoryOptions(subcategories);
    }
  };

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

  const listTemplate = (itemList: IProduct[]) => {
    if (!itemList || itemList.length === 0) return null;

    const list = itemList.map((item) => {
      return itemTemplate(item);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="ProductOverviewPage">
      <div className="ProductOverviewPage__Toolbar">
        <Dropdown
          value={sortKey}
          options={sortOptions}
          optionLabel="label"
          onChange={(e: DropdownChangeEvent) => onSortOptionChange(e)}
          placeholder="Sortieren"
        />

        <Dropdown
          value={selectedCategoryOptionName}
          options={categories}
          optionLabel="name"
          optionValue="name"
          onChange={(e: DropdownChangeEvent) => onCategoryOptionChange(e)}
          placeholder="Kategorie auswählen"
          showClear
        />

        {selectedCategoryOptionName ? (
          <Dropdown
            value={selectedSubcategoryOptionName}
            options={subcategoryOptions}
            optionLabel="name"
            optionValue="name"
            onChange={(e: DropdownChangeEvent) => onSubcategoryOptionChange(e)}
            placeholder="Unterkategorie auswählen"
            showClear
          />
        ) : null}
      </div>
      <DataView
        value={filteredItems}
        layout="grid"
        listTemplate={listTemplate}
        sortField={sortField}
        sortOrder={sortOrder}
      ></DataView>
    </div>
  );
};

export default ProductOverviewPage;

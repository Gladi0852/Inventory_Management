import React, { createContext, useMemo, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Initial states
const INITIAL_ITEM_DATA = [];
const INITIAL_CATEGORY = ["All"];

// Action types
const SET_DATA = "SET_DATA";
const SET_CATEGORY = "SET_CATEGORY";

// Reducers
const itemDataReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return action.payload;
    default:
      return state;
  }
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

// Context
export const AddItemContext = createContext({
  itemData: INITIAL_ITEM_DATA,
  category: INITIAL_CATEGORY,
  addData: () => {},
  setCategory: () => {},
});

// Context provider
const AddItemContextProvider = ({ children }) => {
  // Reducer for item data
  const [itemData, dispatchItemData] = useReducer(
    itemDataReducer,
    INITIAL_ITEM_DATA,
    () => {
      const savedData = localStorage.getItem("itemdata");
      return savedData ? JSON.parse(savedData) : INITIAL_ITEM_DATA;
    }
  );

  // Reducer for category
  const [category, dispatchCategory] = useReducer(
    categoryReducer,
    INITIAL_CATEGORY,
    () => {
      const savedCategory = localStorage.getItem("category");
      return savedCategory ? JSON.parse(savedCategory) : INITIAL_CATEGORY;
    }
  );

  //   states
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortDirection, setSortDirection] = useState("asc");


  const addData = (formRef, setFormOpen) => {
    const formData = new FormData(formRef.current);
    const data = {};
    let isValid = true;
    formData.forEach((value, key) => {
      if (key === "name" || key === "category") {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          alert(`Invalid input for ${key}. Please enter English letters only.`);
          isValid = false;
        }
      }
      if (key === "category") {
        if (!category.includes(value.toLowerCase())) {
          category.push(value.toLowerCase());
          localStorage.setItem("category", JSON.stringify(category));
        }
      }
      data[key] = value;
    });

    // edit existing item
    if (editingItem) {
      const updatedData = itemData.map((item) =>
        item.id === editingItem.id ? { ...item, ...data } : item
      );
      localStorage.setItem("itemdata", JSON.stringify(updatedData));
      dispatchItemData({ type: SET_DATA, payload: updatedData });
      setEditingItem(null);
    }
    // new item add
    else {
      if (isValid) {
        const newItem = { id: uuidv4(), ...data };
        const updatedData = [...itemData, newItem];
        localStorage.setItem("itemdata", JSON.stringify(updatedData));
        dispatchItemData({ type: SET_DATA, payload: updatedData });
        formRef.current.reset();
        setFormOpen(false);
      }
    }
  };

  const handleDeleteItem = (id, categ) => {
    const newData = itemData.filter((item) => item.id !== id);
    localStorage.setItem("itemdata", JSON.stringify(newData));
    let del = true;
    newData.forEach((item) => {
      if (item.category.toLowerCase() === categ.toLowerCase()) {
        del = false;
      }
    });

    if (del) {
      const newList = category.filter((item) => item !== categ.toLowerCase());
      localStorage.setItem("category", JSON.stringify(newList));
      dispatchCategory({ type: SET_CATEGORY, payload: newList });
    }
    dispatchItemData({ type: SET_DATA, payload: newData });
  };

  const sortedList = useMemo(() => {
    let result = [...itemData];

    if (selectedCategory.toLowerCase() !== "all") {
      result = result.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      return (a.quantity - b.quantity) * modifier;
    });
    return result;
  }, [itemData, selectedCategory, sortDirection]);

  return (
    <AddItemContext.Provider
      value={{
        itemData,
        category,
        selectedCategory,
        editingItem,
        setEditingItem,
        addData,
        handleDeleteItem,
        sortDirection,
        setSortDirection,
        sortedList,
        setSelectedCategory,
      }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export default AddItemContextProvider;

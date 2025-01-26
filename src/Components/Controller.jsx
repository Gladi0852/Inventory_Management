import React, { useContext, useState } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import { motion } from "framer-motion";
import ItemsAddForm from "./ItemsAddForm";
import ShowData from "./ShowData";
import { AddItemContext } from "../store/ItemsStore";

function Controller() {
  const {
    itemData,
    category,
    selectedCategory,
    editingItem,
    sortDirection,
    setSortDirection,
    setSelectedCategory,
  } = useContext(AddItemContext);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className="mt-5 flex flex-col mb-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex gap-4 my-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-3 py-2"
            style={{ color: "var(--text_color)" }}
          >
            {category.map((item, index) => (
              <option key={index} value={item} className="text-black">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            style={{ color: "var(--text_color)" }}
            className="border rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer"
          >
            Sort by Quantity
            <IoIosArrowRoundDown
              className={`${
                sortDirection === "desc" ? "rotate-180" : "rotate-0"
              } transition-all delay-100`}
            />
          </button>
        </div>
        <div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white cursor-pointer font-bold xl:text-lg"
            onClick={() => setFormOpen(true)}
          >
            Add Item
          </motion.button>
        </div>
      </div>
      {itemData.length != 0 ? (
        <ShowData />
      ) : (
        <div className="text-center mt-10">There is no data</div>
      )}
      {(formOpen || editingItem) && (
        <ItemsAddForm
          setFormOpen={setFormOpen}
        />
      )}
    </>
  );
}

export default Controller;

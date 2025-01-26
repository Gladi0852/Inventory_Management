import React, { useContext } from "react";
import { MdErrorOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { AddItemContext } from "../store/ItemsStore";

function ShowData() {
  const { setEditingItem, handleDeleteItem, sortedList } =
    useContext(AddItemContext);
  return (
    <div className="overflow-x-auto mt-10">
      <table className="w-full">
        <thead style={{ background: "var(--table_head)" }}>
          <tr className="text-blue-500 text-xs lg:text-base">
            <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "var(--text_color)" }}>
          {sortedList.map((item, index) => (
            <tr
              key={index}
              className="border-b 2xl:text-lg"
              style={{ borderBottomColor: "var(--divider)" }}
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {item.quantity}
                  {item.quantity < 10 && (
                    <MdErrorOutline className="text-red-500 text-xl 2xl:text-2xl" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <CiEdit className="text-xl xl:text-2xl" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.category)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <MdDelete className="text-xl xl:text-2xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;

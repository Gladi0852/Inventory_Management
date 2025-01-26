import React, { useContext, useRef } from "react";
import { AddItemContext } from "../store/ItemsStore";

function ItemsAddForm({ setFormOpen }) {
  const formRef = useRef();
  const { addData, editingItem, setEditingItem } = useContext(AddItemContext);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addData(formRef, setFormOpen);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-md">
        <h2 className="text-xl font-bold mb-4">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <form className="space-y-4" ref={formRef} onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={editingItem?.name}
              className="p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              required
              defaultValue={editingItem?.category}
              className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              required
              min="0"
              defaultValue={editingItem?.quantity}
              className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              defaultValue={editingItem?.price}
              className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (editingItem) {
                  setEditingItem(null);
                } else {
                  setFormOpen(false);
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              {editingItem ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemsAddForm;

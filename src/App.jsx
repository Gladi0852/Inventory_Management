import React from "react";
import Navbar from "./Components/Navbar";
import Controller from "./Components/Controller";
import AddItemContextProvider from "./store/ItemsStore";

function App() {
  return (
    <div className="w-screen relative">
      <Navbar />
      <div className="inventory w-[90%] mx-auto box-shadow-main rounded-xl px-5 mt-30 mb-10 py-10">
        <h1
          className="text-lg w-fit border-b-1 xl:text-2xl"
          style={{ color: "var(--text_color)" }}
        >
          Manage Inventory
        </h1>
        <AddItemContextProvider>
          <Controller />
        </AddItemContextProvider>
      </div>
    </div>
  );
}

export default App;

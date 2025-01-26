import React, { useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";

function Navbar() {
  const [toogle, setToogle] = useState(false);
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const changeMode = () => {
    setToogle(!toogle);
    if (!toogle) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <nav
      className="w-full flex justify-center items-center box-shadow-nav fixed top-0 z-50"
      style={{ background: "var(--body_background)" }}
    >
      <div className="w-[90%] flex items-center justify-between py-4">
        <h1 className="text-lg font-bold lg:text-xl 2xl:text-2xl" style={{ color: "var(--heading)" }}>
          Inventory Management
        </h1>
        <div className="w-fit border py-2 px-1 rounded-full box-shadow-mode bg-white">
          <div
            className="flex relative justify-around w-16 cursor-pointer"
            onClick={changeMode}
          >
            <div
              className={`absolute bg-red-200 w-[50%] aspect-square rounded-full top-1/2 -translate-y-1/2 right-0 z-10 
                ${toogle ? "right-0" : "left-0"} 
                transition-all duration-300 ease-in-out`} // Added transition class
            ></div>
            <IoIosSunny className="z-20 text-xl" />
            <FaMoon className="z-20 text-xl" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

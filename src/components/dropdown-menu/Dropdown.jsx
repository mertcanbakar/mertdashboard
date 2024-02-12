/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";

export default function Dropdown({
  variant = "blue",
  children,
  menuItem,
  setLanguage,
  language,
}) {
  const handleSelect = (lang) => {
    localStorage.setItem("lang", lang);
    setLanguage(lang);
  };
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames({
              "p-1 rounded-md transition-colors w-9 h-9 text-sm flex items-center justify-center": true,
              "bg-purple-100 text-purple-900 hover:bg-purple-800 hover:text-purple-100":
                variant === "purple",
              "bg-blue-100 text-blue-900 hover:bg-blue-800 hover:text-blue-100 ":
                variant === "blue",
            })}
          >
            {children}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-[150px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className=" py-1">
              {menuItem.map((item) => (
                <Menu.Item key={item.value}>
                  <button
                    onClick={() => handleSelect(item.value)}
                    className={classNames({
                      "group flex w-full pl-5 gap-x-2 text-zinc-900 items-center py-2 text-sm hover:bg-purple-100 hover:text-purple-900 transition-colors": true,
                      "!bg-purple-100 !text-purple-900":
                        item.value === language,
                    })}
                  >
                    {item.title}{" "}
                    <span className="text-xs text-zinc-400">({item.code})</span>
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

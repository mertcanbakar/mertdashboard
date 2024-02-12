import classNames from "classnames";

/* eslint-disable react/prop-types */
export default function Button({ variant = "blue", children, ...props }) {
  return (
    <button
      className={classNames({
        "p-1 rounded-md transition-colors w-9 h-9 flex items-center justify-center": true,
        "bg-purple-100 text-purple-900 hover:bg-purple-800 hover:text-purple-100":
          variant === "purple",
        "bg-blue-100 text-blue-900 hover:bg-blue-800 hover:text-blue-100 ":
          variant === "blue",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

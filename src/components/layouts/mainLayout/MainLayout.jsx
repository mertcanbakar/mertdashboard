/* eslint-disable react/prop-types */
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="overflow-auto w-full mx-3 p-10">{children}</div>
      </div>
    </div>
  );
}

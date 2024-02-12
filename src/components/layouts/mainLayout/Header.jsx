import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebar } from "../../../store/sidebarSlice/sidebarSlice";
import { HiMiniSignal } from "react-icons/hi2";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import Dropdown from "../../dropdown-menu/Dropdown";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") ?? "tr"
  );
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebarSlice.sidebarState);
  const languages = [
    {
      id: 1,
      value: "tr",
      title: "Türkçe",
      code: "TR",
    },
    {
      id: 2,
      value: "en",
      title: "English",
      code: "EN",
    },
  ];

  const handleSidebar = () => {
    dispatch(changeSidebar(!sidebar));
  };
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  return (
    <>
      <header className="bg-white w-full p-4 px-6 flex items-center justify-between">
        <div className="flex gap-x-10 p-3 justify-center items-center">
          <Link to="/" className="text-xl">
            Mert Dashboard
          </Link>
          <Button variant={"blue"} onClick={handleSidebar}>
            <IoMenu size={20} />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-x-10">
          <div className="flex justify-center items-center gap-x-3">
            <Button variant={"blue"}>
              <HiMiniSignal size={20} />
            </Button>
            <Dropdown
              setLanguage={setLanguage}
              variant="purple"
              menuItem={languages}
              language={language}
            >
              {language === "tr" ? "TR" : "EN"}
            </Dropdown>
            <Button variant={"blue"}>
              <IoNotificationsOutline size={20} />
            </Button>
          </div>
          <div className="flex justify-center items-center gap-x-3">
            <button className="flex items-center gap-x-4 px-3 py-1.5 bg-purple-100 rounded-full text-purple-900 hover:bg-purple-800 hover:text-purple-100 transition-colors">
              <img
                src="https://hms.genyazilim.com/static/media/user-round.13b5a31bebd2cc6016d6db2cac8e92d1.svg"
                alt=""
              />
              <IoSettingsOutline size={22} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

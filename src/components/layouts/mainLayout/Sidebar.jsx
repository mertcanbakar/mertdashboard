/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MdSpeed } from "react-icons/md";
import { FaProductHunt, FaUsers, FaStoreAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { singOutUser } from "../../../store/userSlice/userSlice";
import { logout } from "../../../firebase/firebase";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const sidebar = useSelector((state) => state.sidebarSlice.sidebarState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    dispatch(singOutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={classNames({
        "w-[75px] flex flex-col px-3 gap-y-3 pt-10  bg-white transition-all": true,
        "!w-[250px]": sidebar,
      })}
    >
      <div className="flex flex-col gap-y-3 mb-10 pb-10 border-b border-zinc-300">
        <NavLink
          to="/"
          className={classNames({
            "w-full h-12 flex items-center gap-x-3 px-1 hover:bg-[#ede7f7] hover:text-purple-800 text-sm rounded-md text-zinc-600": true,
            "!w-10 !h-10 justify-center": !sidebar,
          })}
        >
          <MdSpeed size={20} />
          <span
            className={classNames({
              "flex items-center justify-center": true,
              hidden: !sidebar,
            })}
          >
            {t("dashboard")}
          </span>
        </NavLink>
        <NavLink
          to="/products"
          className={classNames({
            "w-full h-12 flex items-center gap-x-3 px-1 hover:bg-[#ede7f7] hover:text-purple-800 text-sm rounded-md text-zinc-600": true,
            "!w-10 !h-10 justify-center": !sidebar,
          })}
        >
          <FaProductHunt size={20} />
          <span
            className={classNames({
              "flex items-center justify-center": true,
              hidden: !sidebar,
            })}
          >
            {t("products")}
          </span>
        </NavLink>
        <NavLink
          to="/users"
          className={classNames({
            "w-full h-12 flex items-center justify-start gap-x-3 px-1 hover:bg-[#ede7f7] hover:text-purple-800 text-sm rounded-md text-zinc-600": true,
            "!w-10 !h-10 justify-center": !sidebar,
          })}
        >
          <FaUsers size={20} />
          <span
            className={classNames({
              "flex items-center justify-center": true,
              hidden: !sidebar,
            })}
          >
            {t("users")}
          </span>
        </NavLink>
        <NavLink
          to="/branches"
          className={classNames({
            "w-full h-12 flex items-center justify-start gap-x-3 px-1 hover:bg-[#ede7f7] hover:text-purple-800 text-sm rounded-md text-zinc-600": true,
            "!w-10 !h-10 justify-center": !sidebar,
          })}
        >
          <FaStoreAlt size={20} />
          <span
            className={classNames({
              "flex items-center justify-center": true,
              hidden: !sidebar,
            })}
          >
            {t("branches")}
          </span>
        </NavLink>
      </div>
      <button
        onClick={handleSignOut}
        className={classNames({
          "w-full h-12 flex items-center flex-nowrap gap-x-3 px-1 hover:bg-[#ede7f7] hover:text-purple-800 text-md rounded-md text-zinc-900": true,
          "!w-10 !h-10 justify-center": !sidebar,
        })}
      >
        <CiLogin size={20} />{" "}
        <span
          className={classNames({
            "flex items-center whitespace-nowrap justify-center text-sm": true,
            hidden: !sidebar,
          })}
        >
          Çıkış Yap
        </span>
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";
import { loginUser } from "../../../store/userSlice/userSlice";
import { useFormik } from "formik";
import { login } from "../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  const formik = useFormik({
    initialValues: {
      email: "mert@dashboard.com",
      password: "123123",
    },
    onSubmit: async (values) => {
      const user = await login(values.email, values.password);
      dispatch(loginUser(user));
    },
  });

  const [isChecked, setIsChecked] = useState(true);
  const [type, setType] = useState("password");

  const handleVisible = () => {
    setType(type === "password" ? "text" : "password");
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-white w-[400px] h-[600px] p-8 rounded-md border border-zinc-300 shadow-sm flex flex-col items-center">
        <h2 className="text-4xl font-bold my-5">Mert Dashboard</h2>
        <h6 className="text-xl text-[#5e35b1] font-medium mt-5">
          Merhaba, tekrar hoş geldiniz.
        </h6>
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 p-2 border-b">
          <input
            name="email"
            className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text"
            placeholder="Kullanıcı adı veya e-posta"
          />
          <div className="w-full relative">
            <input
              name="password"
              className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={type}
              placeholder="Şifre"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleVisible();
              }}
              className="absolute flex justify-center items-center p-3 right-1 top-1/2 transform -translate-y-1/2 rounded-full opacity-60 hover:bg-zinc-100 transition-colors"
            >
              {type === "text" ? (
                <HiMiniEye size={22} />
              ) : (
                <HiMiniEyeSlash size={22} />
              )}
            </button>
          </div>
          <div className="w-full flex justify-between items-center mb-3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 cursor-pointer"
                checked={isChecked}
                onChange={toggleCheckbox}
              />
              <span className="ml-2 text-gray-500 font-light text-sm">
                Beni hatırla
              </span>
            </label>
            <a href="#" className="text-[#5e35b1]">
              Şifreni mi unuttun?
            </a>
          </div>
          <button
            onClick={formik.handleSubmit}
            className="w-full p-2 bg-[#5e35b1] text-white rounded-md"
          >
            Giriş Yap
          </button>
        </div>
        <div className="w-full h-5 p-1 flex justify-center items-center gap-x-1 my-8">
          Hesabın yok mu?
          <Link to="/register" className="text-[#5e35b1] font-medium">
            Kaydol
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [isChecked, setIsChecked] = useState(true);

  const handleVisible = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-white w-[400px] h-[700px] p-8 rounded-md border border-zinc-300 shadow-sm flex flex-col items-center">
        <h2 className="text-4xl font-bold my-5">Mert Dashboard</h2>
        <h6 className="text-xl text-[#5e35b1] font-medium mt-5">Kaydol</h6>
        <div className="w-full my-4">
          <button
            type="button"
            className="w-full flex justify-center items-center gap-x-2 bg-[#f5f5f5] p-2 rounded-md border border-transparent transition-colors hover:border-blue-300 hover:bg-blue-50"
          >
            <FcGoogle size={24} />
            Google ile kayıt ol.
          </button>
        </div>
        <div className="w-full flex justify-center items-center my-2">
          <span className="flex flex-1 h-px bg-zinc-200"></span>
          <span className="mx-4 px-2 bg-white border border-zinc-300 rounded-xl ">
            YA DA
          </span>
          <span className="flex-1 h-px bg-zinc-200"></span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center items-center gap-y-2 p-4 border-b"
        >
          <div className="flex gap-x-3">
            <input
              className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Ad"
            />
            <input
              className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Soyad"
            />
          </div>
          <input
            className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Kullanıcı adı veya e-posta"
          />
          <div className="w-full relative">
            <input
              className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={type}
              placeholder="Şifre"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // Bu satır, tarayıcıda otomatik form göndermeyi önler
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
              <span className="ml-2 text-gray-500 font-light text-sm flex gap-x-1">
                <a href="#" className="text-black">
                  Şartları ve Koşulları
                </a>
                <p>kabul ediyorum.</p>
              </span>
            </label>
          </div>
          <div className="w-full flex justify-between items-center mb-3"></div>
          <button
            type="submit"
            className="w-full p-2 bg-[#5e35b1] text-white rounded-md"
          >
            Kayıt ol
          </button>
        </form>
        <div className="w-full h-5 p-1 flex justify-center items-center gap-x-1 my-8">
          Zaten bir hesabın var mı?
          <Link to="/login" className="text-[#5e35b1] font-medium">
            Giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { CiSearch } from "react-icons/ci";

export default function SearchSection() {
  return (
    <div className="w-[300px] relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 border border-zinc-300 rounded-lg outline-none focus:border-zinc-400"
      />
      <CiSearch
        size={24}
        className="absolute top-1/2 -translate-y-1/2 right-2 text-zinc-400 "
      />
    </div>
  );
}

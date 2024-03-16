import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full h-24 px-10">
      <Link to="/">
        <span className=" text-2xl">Tech</span>
        <span className=" text-3xl text-purple-500 ">Stock</span>
      </Link>
      <div className="flex items-center gap-8 text-xl">
        <Link
          to="/"
          className=" hover:text-purple-500 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/produtos"
          className=" hover:text-purple-500 transition-colors duration-300"
        >
          Produtos
        </Link>
      </div>
    </header>
  );
}

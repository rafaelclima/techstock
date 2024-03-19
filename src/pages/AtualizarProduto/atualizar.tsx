import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import produtos from "../../database.json";

export default function Atualizar() {
  const [isAllProductsActive, setAllProductsActive] = useState(false);
  const { id } = useParams();

  const produto = id ? produtos.filter((produto) => produto.id === +id) : [];

  const handleButtonClick = () => {
    setAllProductsActive(!isAllProductsActive);
  };

  return (
    <div className=" w-full m-auto ">
      <h2 className=" text-4xl mb-8 mx-8 ">Produtos em estoque</h2>
      <div className="mx-8 mb-12">
        <button
          className={`mr-8 hover:text-purple-500 focus:outline-none ${
            isAllProductsActive ? "text-purple-500" : ""
          }`}
          onClick={handleButtonClick}
        >
          <Link to="/produtos">Todos os produtos</Link>
        </button>
        <button
          className={`hover:text-purple-500 focus:outline-none ${
            !isAllProductsActive ? "text-purple-500" : ""
          }`}
          onClick={handleButtonClick}
        >
          Novo produto
        </button>
        <hr className="mt-3 border-zinc-500" />
      </div>

      <main className=" mx-8 ">
        {produto &&
          produto.map((prod) => (
            <>
              <div
                key={prod.id}
                className=" grid grid-cols-2 gap-4 w-1/2 m-auto place-items-center "
              >
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="name">Nome</label>
                  <input
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    type="text"
                    name="name"
                    id="name"
                    value={prod.nome}
                  />
                </div>
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="qtd">Quantidade</label>
                  <input
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    type="number"
                    name="qtd"
                    id="qtd"
                    value={prod.quantidade_em_estoque}
                  />
                </div>
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="preco">Preço</label>
                  <input
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    type="number"
                    name="preco"
                    id="preco"
                    value={prod.preco}
                  />
                </div>
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="categoria">Categoria</label>
                  <select
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    name="categoria"
                    id="categoria"
                  >
                    <option value="Processador">{prod.categoria}</option>
                    {/* Renderizar as categorias aqui... */}
                  </select>
                </div>

                <div className=" col-span-2 w-full m-auto place-items-center ">
                  <div className=" flex flex-col gap-1 w-full ">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                      className=" bg-zinc-800 px-2 py-2 rounded "
                      name="descricao"
                      id="descricao"
                      rows={6}
                      value={prod.descricao}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className=" w-1/2 m-auto mt-4 ">
                <button className="flex gap-2 items-center justify-center bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                  <SaveIcon />
                  {id ? "Atualizar" : "Salvar"}
                </button>
              </div>
            </>
          ))}
      </main>
    </div>
  );
}

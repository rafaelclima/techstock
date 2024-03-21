import { useState } from "react";
import { Link } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  quantidade_em_estoque: number;
  categoria: string;
  data_de_inclusao: string;
  data_de_atualizacao?: string;
  preco: number;
  img: string;
  descricao: string;
}

export default function Produtos() {
  const [isAllProductsActive, setAllProductsActive] = useState(true);

  const produtosSalvos: string = localStorage.getItem("produtos") ?? "";
  const produtosJson: Produto[] = JSON.parse(produtosSalvos);

  const handleButtonClick = () => {
    setAllProductsActive(!isAllProductsActive);
  };

  return (
    <div className=" w-full m-auto ">
      <h2 className=" text-4xl mb-8 mx-8 ">Produtos em estoque</h2>
      <div className="mx-8 mb-8">
        <button
          className={`mr-8 hover:text-purple-500 focus:outline-none ${
            isAllProductsActive ? "text-purple-500" : ""
          }`}
          onClick={handleButtonClick}
        >
          <Link className=" py-2 " to="/produtos">
            Todos os produtos
          </Link>
        </button>
        <button
          className={`hover:text-purple-500 focus:outline-none ${
            !isAllProductsActive ? "text-purple-500" : ""
          }`}
          onClick={handleButtonClick}
        >
          <Link className=" py-2 " to="/produtos/cadastro">
            Novo produto
          </Link>
        </button>
        <hr className="mt-3 border-zinc-500" />
      </div>

      <section className=" mx-8 ">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className=" calc-altura-produtos overflow-y-auto ">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-start text-xs font-medium bg-zinc-800 uppercase"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-start text-xs font-medium bg-zinc-800 uppercase"
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-xs text-start font-medium bg-zinc-800 uppercase"
                      >
                        Em Estoque
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-xs text-start font-medium bg-zinc-800 uppercase"
                      >
                        Categoria
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-xs text-start font-medium bg-zinc-800 uppercase"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosJson.map((produto) => (
                      <tr
                        key={produto.id}
                        className="hover:bg-gray-100 dark:hover:bg-zinc-900"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {produto.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-gray-800 dark:text-gray-200">
                          {produto.nome}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-gray-800 dark:text-gray-200">
                          {produto.quantidade_em_estoque}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-gray-800 dark:text-gray-200">
                          {produto.categoria}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                          <button
                            type="button"
                            className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                          >
                            <Link
                              className=" py-2 "
                              to={`/produtos/${produto.id}`}
                            >
                              Ver
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 mx-3 border border-purple-500 hover:border-transparent rounded"
                          >
                            <Link
                              className=" py-2 "
                              to={`/produtos/atualizar/${produto.id}`}
                            >
                              Atualizar
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

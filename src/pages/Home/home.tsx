import { useEffect, useState } from "react";
import produtos from "../../database.json";
import { Link } from "react-router-dom";
//import moment from "moment";

interface Produtos {
  id: number;
  nome: string;
  quantidade_em_estoque: number;
  categoria: string;
  data_de_inclusao: string;
  preco: number;
  img: string;
  descricao: string;
}

interface CategoriaContador {
  [categoria: string]: number;
}

function Home() {
  const [itensRecentes, setItensRecentes] = useState<Produtos[]>([]);
  const [fimDeEstoque, setFimDeEstoque] = useState<Produtos[]>([]);
  const [diversidadeEstoque, setDiversidadeEstoque] = useState(0);

  useEffect(() => {
    const dataAtual = new Date();

    const produtosRecentes = produtos.filter((produto) => {
      const dataCadastro = new Date(produto.data_de_inclusao);
      const diferencaMilissegundos =
        dataAtual.getTime() - dataCadastro.getTime();
      const diferencaDias = diferencaMilissegundos / (24 * 60 * 60 * 1000);

      return diferencaDias < 10;
    });

    const fimDeEstoque = produtos.filter(
      (produto) => produto.quantidade_em_estoque < 10
    );

    let qtdItens = 0;
    produtos.reduce((contador: CategoriaContador, categoria: Produtos) => {
      if (!contador[categoria.categoria]) {
        contador[categoria.categoria] = 1;
        qtdItens++;
      } else {
        contador[categoria.categoria]++;
      }

      return contador;
    }, {});

    setDiversidadeEstoque(qtdItens);
    setItensRecentes(produtosRecentes);
    setFimDeEstoque(fimDeEstoque);
  }, []);

  return (
    <main className=" w-full m-auto ">
      <h1 className=" text-4xl mb-8 ml-8 ">Dashboard</h1>
      <div className=" mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div className=" h-48 flex flex-col items-center p-4 gap-4 rounded bg-zinc-800 ">
          <h3 className=" text-xl ">Diversidade de Itens</h3>
          <div className=" w-28 h-28 flex items-center justify-center bg-purple-700 rounded-full ">
            <span className=" text-center text-2xl ">{diversidadeEstoque}</span>
          </div>
        </div>
        <div className=" h-48 flex flex-col items-center p-4 gap-4 rounded bg-zinc-800 ">
          <h3 className=" text-xl ">Inventário Total</h3>
          <div className=" w-28 h-28 flex items-center justify-center bg-purple-700 rounded-full ">
            <span className=" text-center text-2xl ">{produtos.length}</span>
          </div>
        </div>
        <div className=" h-48 flex flex-col items-center p-4 gap-4 rounded bg-zinc-800 ">
          <h3 className=" text-xl ">Itens Recentes</h3>
          <div className=" w-28 h-28 flex items-center justify-center bg-purple-700 rounded-full ">
            <span className=" text-center text-2xl ">
              {itensRecentes.length}
            </span>
          </div>
        </div>
        <div className=" h-48 flex flex-col items-center p-4 gap-4 rounded bg-zinc-800 ">
          <h3 className=" text-xl ">Itens Acabando</h3>
          <div className=" w-28 h-28 flex items-center justify-center bg-purple-700 rounded-full ">
            <span className=" text-center text-2xl ">
              {fimDeEstoque.length}
            </span>
          </div>
        </div>
      </div>

      <section className=" mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <div className="flex flex-col ml-8">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="calc-altura-home overflow-y-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-start text-xs font-medium bg-zinc-800 uppercase"
                      >
                        Adicionados Recentemente
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-xs font-medium bg-zinc-800 uppercase"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itensRecentes &&
                      itensRecentes.map((produto) => (
                        <tr
                          key={produto.id}
                          className="hover:bg-gray-100 dark:hover:bg-zinc-900"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {produto.nome}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-purple-500 hover:text-purple-400 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:focus:outline-none"
                            >
                              <Link to={`produtos/${produto.id}`}>Ver</Link>
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

        <div className="flex flex-col mr-8">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="calc-altura-home overflow-y-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-start text-xs font-medium bg-zinc-800 uppercase"
                      >
                        Estoque Baixo
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-center text-xs font-medium bg-zinc-800 uppercase"
                      >
                        Qtd.
                      </th>
                      <th
                        scope="col"
                        className=" top-0 sticky px-6 py-4 text-xs font-medium bg-zinc-800 uppercase"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fimDeEstoque &&
                      fimDeEstoque.map((produto) => (
                        <tr
                          key={produto.id}
                          className="hover:bg-gray-100 dark:hover:bg-zinc-900"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {produto.nome}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 dark:text-gray-200">
                            {produto.quantidade_em_estoque}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-purple-500 hover:text-purple-400 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:focus:outline-none"
                            >
                              <Link to={`produtos/${produto.id}`}>Ver</Link>
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
    </main>
  );
}

export default Home;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";

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

export default function Detalhes() {
  const [isAllProductsActive, setAllProductsActive] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const produtosSalvos: string = localStorage.getItem("produtos") ?? "";
  const produtosJson: Produto[] = JSON.parse(produtosSalvos);

  const produto = id
    ? produtosJson.filter((produto: { id: number }) => produto.id === +id)
    : [];

  const handleButtonClick = () => {
    setAllProductsActive(!isAllProductsActive);
  };

  function goBack() {
    navigate(-1);
  }

  function formatData(data: string) {
    const [ano, mes, dia] = data.split("-");
    const dataFormatada = `${dia.padStart(2, "0")}/${mes.padStart(
      2,
      "0"
    )}/${ano}`;
    return dataFormatada;
  }

  function handleDeleteClick() {
    if (id !== undefined) {
      const excluirItem = produtosJson.findIndex((item) => item.id === +id);

      if (excluirItem !== -1) {
        produtosJson.splice(excluirItem, 1);
        localStorage.setItem("produtos", JSON.stringify(produtosJson));
        alert("Item excluído com sucesso!");
        goBack();
      } else {
        alert("Error! Item não foi encontrado!");
      }
    }
  }

  return (
    <div className=" w-full m-auto ">
      <div className="mx-8 mb-8">
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

      <main className="mx-8">
        {produto.map((item) => (
          <h2 key={item.id} className=" font-bold text-3xl mb-6 ">
            {item.nome}
          </h2>
        ))}
        {produto &&
          produto.map((item) => (
            <div key={item.id}>
              <div className=" flex gap-4 mb-6 ">
                <p className=" w-max bg-zinc-800 p-4 rounded text-xl ">
                  Categoria: {item.categoria}
                </p>
                <p className=" w-max bg-zinc-800 p-4 rounded text-xl ">
                  Quantidade em estoque: {item.quantidade_em_estoque}
                </p>
                <p className=" w-max bg-zinc-800 p-4 rounded text-xl ">
                  Preço: R$ {item.preco}
                </p>
              </div>

              <p className="my-3 text-xl w-1/2">Descrição: {item.descricao}</p>
              <p className=" text-xl">
                Cadastrado em: {formatData(item.data_de_inclusao)}
              </p>
              {item.data_de_atualizacao && item.data_de_atualizacao ? (
                <p className=" text-xl mt-2 ">
                  Atualizado em: {formatData(item.data_de_atualizacao)}
                </p>
              ) : null}

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                >
                  <Link to={`/produtos/atualizar/${item.id}`}>Atualizar</Link>
                </button>
                <button
                  type="button"
                  className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  onClick={handleDeleteClick}
                >
                  Excluir
                </button>

                <button
                  onClick={goBack}
                  className="flex gap-1 items-center justify-center bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                >
                  <Undo2 />
                  Voltar
                </button>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

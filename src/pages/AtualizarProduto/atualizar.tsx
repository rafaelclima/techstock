import { SaveIcon } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Produtos {
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

interface CategoriaContador extends Array<string> {}

export default function Atualizar() {
  const { id } = useParams();

  const produtosSalvos: string = localStorage.getItem("produtos") ?? "";
  const produtosJson: Produtos[] = JSON.parse(produtosSalvos);

  const produto = id
    ? produtosJson.filter((produto: { id: number }) => produto.id === +id)
    : [];

  const [isAllProductsActive, setAllProductsActive] = useState(false);
  const [nomeProduto, setNomeProduto] = useState(produto[0].nome);
  const [qtdProduto, setQtdProduto] = useState<number>(
    produto[0].quantidade_em_estoque
  );
  const [precoProduto, setPrecoProduto] = useState<number>(produto[0].preco);
  const [categoriaProduto, setCategoriaProduto] = useState(
    produto[0].categoria
  );
  const [descricaoProduto, setDescricaoProduto] = useState(
    produto[0].descricao
  );

  const category = produtosJson.reduce(
    (contador: CategoriaContador, categoria: Produtos) => {
      if (!contador.includes(categoria.categoria)) {
        contador.push(categoria.categoria);
      }
      return contador;
    },
    []
  );

  const handleButtonClick = () => {
    setAllProductsActive(!isAllProductsActive);
  };

  function handleUpdateProdutos() {
    const dataDeHoje = moment();
    const dataFormatada = dataDeHoje.format("YYYY-MM-DD");

    const novoProduto = {
      id: produto[0].id,
      nome: nomeProduto,
      quantidade_em_estoque: qtdProduto,
      categoria: categoriaProduto,
      data_de_inclusao: produto[0].data_de_inclusao,
      data_de_atualizacao: dataFormatada,
      preco: precoProduto,
      img: "www.imgprod.com.br",
      descricao: descricaoProduto,
    };

    if (id !== undefined) {
      const atualizarItem = produtosJson.findIndex((item) => item.id === +id);

      if (atualizarItem !== -1) {
        produtosJson.splice(atualizarItem, 1, novoProduto);
        localStorage.setItem("produtos", JSON.stringify(produtosJson));
        alert("Produto Atualizado com sucesso!");
      } else {
        alert("Produto não encontrado!");
      }
    }
  }

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
            <div key={prod.id}>
              <div className=" grid grid-cols-2 gap-4 w-1/2 m-auto place-items-center ">
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="name">Nome</label>
                  <input
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    type="text"
                    name="name"
                    id="name"
                    value={nomeProduto}
                    onChange={(ev) => setNomeProduto(ev.target.value)}
                  />
                </div>
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="qtd">Quantidade</label>
                  <input
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    type="number"
                    name="qtd"
                    id="qtd"
                    value={qtdProduto}
                    onChange={(ev) => setQtdProduto(+ev.target.value)}
                  />
                </div>
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="preco">Preço</label>
                  <input
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    type="number"
                    name="preco"
                    id="preco"
                    value={precoProduto}
                    onChange={(ev) => setPrecoProduto(+ev.target.value)}
                  />
                </div>
                <div className=" flex flex-col items-start gap-1 w-full ">
                  <label htmlFor="categoria">Categoria</label>
                  <select
                    className=" px-2 py-4 w-full rounded text-base text-white bg-zinc-800 "
                    name="categoria"
                    id="categoria"
                    onChange={(ev) => setCategoriaProduto(ev.target.value)}
                  >
                    <option value={categoriaProduto}>{categoriaProduto}</option>
                    {category &&
                      category.map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
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
                      value={descricaoProduto}
                      onChange={(ev) => setDescricaoProduto(ev.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className=" w-1/2 m-auto mt-4 ">
                <button
                  className="flex gap-2 items-center justify-center bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                  onClick={handleUpdateProdutos}
                >
                  <SaveIcon />
                  {id ? "Atualizar" : "Salvar"}
                </button>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/not-found";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home/home";
import Produtos from "./pages/Produtos/produtos";
import Detalhes from "./pages/Detalhes/detalhes";
import Atualizar from "./pages/AtualizarProduto/atualizar";
import Cadastrar from "./pages/CadastrarProduto/cadastro";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/produtos",
        element: <Produtos />,
      },
      {
        path: "/produtos/:id",
        element: <Detalhes />,
      },
      {
        path: "/produtos/cadastro",
        element: <Cadastrar />,
      },
      {
        path: "/produtos/atualizar/:id",
        element: <Atualizar />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

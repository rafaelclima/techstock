import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/not-found";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home/home";
import Produtos from "./pages/Produtos/produtos";
import Detalhes from "./pages/Detalhes/detalhes";

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

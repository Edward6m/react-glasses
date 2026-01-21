import Layout from "../Layout";
import Home from "../pages/Home";
import Products from "../pages/Products.jsx";
// import Product from "../pages/Product";
// import Cart from "../pages/Cart";
import Page404 from "../pages/Page404";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;

import Layout from "../Layout";
import Home from "../pages/Home";
import Products from "../pages/Products.jsx";
import Store from "../pages/Store.jsx";
import QA from "../pages/QA.jsx";
import Page404 from "../pages/Page404";
import StoreDetail from "../pages/StoreDetail.jsx";
import Blog from "../pages/blog.jsx";
import BlogDetail from "../pages/BlogDetail.jsx";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "storedetail/:storeId",
        element: <StoreDetail />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "qa",
        element: <QA />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;

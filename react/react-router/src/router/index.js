import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/RootPages/Home";
import Posts from "../pages/RootPages/DummyPages/Posts";
import Products from "../pages/RootPages/DummyPages/Products";
import Carts from "../pages/RootPages/DummyPages/Carts";
import CartsList from "../components/CartsList";
import ProductsList from "../components/ProductsList";
import PostsList from "../components/PostsList";
import RootLayout from "../components/layouts/RootLayout";
import DummyLayout from "../components/layouts/DummyLayout";
import ProductDetail from "../pages/RootPages/DummyPages/ProductDetail";
import PostDetail from "../pages/RootPages/DummyPages/PostDetail";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/dummy",
        Component: DummyLayout,
        children: [
          {
            path: "carts",
            Component: Carts,
          },
          {
            path: "posts",
            Component: Posts,
          },
          {
            path: "products",
            Component: Products,
          },
        ],
      },
      {
        path: "/posts/:postId",
        Component: PostDetail,
      },
      {
        path: "/porducts/:productId",
        Component: ProductDetail,
      },
      {
        path: "productslist",
        Component: ProductsList,
      },
      {
        path: "cartslist",
        Component: CartsList,
      },
      {
        path: "postslist",
        Component: PostsList,
      },
    ],
  },
]);

export default router;

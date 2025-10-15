import RootLayout from "../../components/layouts/RootLayout";
import PostDetail from "../../pages/RootPages/DummyPages/PostDetail";
import Carts from "../../pages/RootPages/DummyPages/Carts";
import Posts from "../../pages/RootPages/DummyPages/Posts";
import ProductDetail from "../../pages/RootPages/DummyPages/ProductDetail";
import Products from "../../pages/RootPages/DummyPages/Products";
import PATHS from "../../constants/paths";
import PostsList from "../../components/PostsList";
import ProductsList from "../../components/ProductsList";
import CartsList from "../../components/CartsList";
import Home from "../../pages/RootPages/Home";
import DummyLayout from "../../components/layouts/DummyLayout";
const rootRoutes = [
  {
    path: PATHS.ROOT.INDEX,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: PATHS.ROOT.DUMMY,
        Component: DummyLayout,
        children: [
          {
            path: PATHS.ROOT.CARTS,
            Component: Carts,
          },
          {
            path: PATHS.ROOT.POSTS,
            Component: Posts,
          },
          {
            path: PATHS.ROOT.PRODUCTS,
            Component: Products,
          },
        ],
      },
      {
        path: PATHS.ROOT.POST_DETAIL,
        Component: PostDetail,
      },
      {
        path: PATHS.ROOT.PRODUCTS_DETAIL,
        Component: ProductDetail,
      },
      {
        path: PATHS.ROOT.PRODUCTSLIST,
        Component: ProductsList,
      },
      {
        path: PATHS.ROOT.CARTSLIST,
        Component: CartsList,
      },
      {
        path: PATHS.ROOT.POSTSLIST,
        Component: PostsList,
      },
    ],
  },
];
export default rootRoutes;

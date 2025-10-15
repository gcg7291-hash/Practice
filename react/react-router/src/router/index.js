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
import rootRoutes from "./routes/rootRoutes";

const router = createBrowserRouter([...rootRoutes]);

export default router;

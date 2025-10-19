import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Memo from "../Page/Memo";
import MemoList from "../Page/MemoList";
import Signup from "../Page/Signup";
import AuthLayout from "../layout/AuthLayout";
import PrivateLayout from "../layout/PrivateLayout";
import RootLayout from "../layout/RootLayout";
import About from "../Page/About";
import NotFound from "../Page/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/memo",
    Component: Memo,
  },
  {
    path: "/memolist",
    Component: MemoList,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/authlayout",
    Component: AuthLayout,
  },
  {
    path: "/privatelayout",
    Component: PrivateLayout,
  },
  {
    path: "/rootlayout",
    Component: RootLayout,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;

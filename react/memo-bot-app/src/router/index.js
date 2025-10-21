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
import Profile from "../Page/Profile";
import NotFound from "../Page/NotFound";

const router = createBrowserRouter([
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/authlayout",
    Component: AuthLayout,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/privatelayout",
    Component: PrivateLayout,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
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
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import CountView from "../pages/CountView";
import CountIncrement from "../pages/CountIncrement";
import CountDecrement from "../pages/CountDecrement";
import StepSet from "../pages/StepSet";

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
        path: "count-view",
        Component: CountView,
      },
      // 이하 CountIncrement, CountDecrement, StepSet 페이지 경로 속성(path, Component) 정의
      {
        path: "count-decrement",
        Component: CountDecrement,
      },
      {
        path: "count-increment",
        Component: CountIncrement,
      },
      {
        path: "step-set",
        Component: StepSet,
      },
    ],
  },
]);

export default router;

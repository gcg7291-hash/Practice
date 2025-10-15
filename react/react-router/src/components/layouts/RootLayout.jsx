import React from "react";
import { Link, Outlet } from "react-router-dom";
import PATHS from "../../constants/paths";
export default function RootLayout() {
  return (
    <div>
      <Link to={PATHS.ROOT.INDEX}> 홈페이지 </Link>

      <Link to={PATHS.ROOT.PRODUCTS}>product </Link>

      <Link to={PATHS.ROOT.CARTS}>cart </Link>

      <Link to={PATHS.ROOT.POSTS}>post </Link>

      <Outlet />
    </div>
  );
}

import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function RootLayout() {
  return (
    <div>
      <Link to="/"> 홈페이지 </Link>

      <Link to="/dummy/products">product </Link>

      <Link to="/dummy/carts">cart </Link>

      <Link to="/dummy/posts">post </Link>

      <Outlet />
    </div>
  );
}

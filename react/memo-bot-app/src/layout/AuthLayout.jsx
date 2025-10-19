import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import router from "../router";
export default function AuthLayout() {
  const baseColor = "border-2 border-amber-300 p-2 ";
  const activeCalss = `border-2 border-red-900`;
  return (
    <div>
      <div className="text-center text-5xl">
        <NavLink
          className={({ isActitve }) =>
            `${baseColor} ${isActitve ? activeCalss : ""}`
          }
          to="/login"
        >
          로그인 페이지
        </NavLink>
        <NavLink
          className={({ isActitve }) =>
            `${baseColor} ${isActitve ? activeCalss : ""}`
          }
          to="/signup"
        >
          회원가입 페이지
        </NavLink>
        <NavLink
          className={({ isActitve }) =>
            `${baseColor} ${isActitve ? activeCalss : ""}`
          }
          to="/"
        >
          홈페이지
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

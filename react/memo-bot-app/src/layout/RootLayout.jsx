import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  const navItems = [
    { path: "/", label: "Memo AI" },
    { path: "/memo", label: "메모 작성" },
    { path: "/memolist", label: "메모 목록" },
  ];
  const activeNavItemClass = "bg-blue-50 text-blue-700 border border-blue-200";
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-50 border-b border-gray-300 p-4">
        <div className="text-gray-900 font-extrabold text-xl cursor-pointer">
          <nav className="bg-white border-b border-gray-200 w-full">
            <div className="text-gray-900 font-extrabold text-xl cursor-pointer">
              {navItems.map((item) => {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      ` px-4 py-3 text-sm  ${
                        isActive ? activeNavItemClass : "text-gray-600 "
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
        <div className="flex imtems-center gap-2">
          <a
            className="text-blue-600 px-1 py-2 cursor-pointer text-[14px]"
            href="/login"
            data-discover="true"
          >
            로그인
          </a>
          <a
            className="text-blue-600 px-1 py-2 cursor-pointer text-[14px]"
            href="/signup"
            data-discover="true"
          >
            회원가입
          </a>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white text-gray-900 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="flex flex-col itmes-center justify-center text-center">
              <div className="flex flex-col items-center space-y-6 mb-12">
                <h1 className="text-6xl font-extrabold leading-tight">
                  <span>Memo AI</span>
                  <p className="text-3xl">지능형 AI</p>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

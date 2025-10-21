import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function RootLayout() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isLoggedIn = !!token;

  // ⭐️ 1. 로고 항목은 항상 포함
  const logoItem = { path: "/", label: "Memo AI" };

  // ⭐️ 2. 로그인 상태일 때만 '메모 작성'과 '메모 목록'을 추가
  const loggedInLinks = isLoggedIn
    ? [
        { path: "/memo", label: "메모 작성" },
        { path: "/memolist", label: "메모 목록" },
        { path: "/profile", label: "내 정보" }
      ]
    : [];

  // 모든 네비게이션 아이템을 합칩니다.
  const navLinks = [logoItem, ...loggedInLinks];

  const activeNavItemClass =
    "bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/50 transition duration-300 transform scale-105";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      
      {/* ⭐️ 헤더: W-FULL, FLEX */}
      <header className="w-full flex justify-between items-center bg-gray-800 border-b border-gray-700 p-3 sm:p-4 sticky top-0 z-20 shadow-lg">
        
        {/* ⭐️ 1. 내비게이션 링크 섹션: 로고와 기타 링크를 한 번에 처리 */}
        <nav className="flex items-center space-x-1 sm:space-x-4 flex-1 min-w-0">
          {navLinks.map((item) => {
            const isLogo = item.path === "/";
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  // 로고와 일반 링크 스타일을 분리하여 적용합니다.
                  `px-2 py-1 text-sm whitespace-nowrap cursor-pointer hover:text-blue-400 transition duration-200 
                  ${isLogo 
                    ? "text-blue-400 font-extrabold text-xl sm:text-2xl hover:text-blue-300 mr-2 sm:mr-4 shrink-0" 
                    : "text-gray-300 hover:bg-gray-700 rounded-lg sm:px-4 sm:py-2"}
                  ${isActive && !isLogo ? activeNavItemClass : ""}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* ⭐️ 2. 인증 버튼 그룹: shrink-0으로 보호 */}
        <div className="flex items-center space-x-1 sm:space-x-3 shrink-0 ml-2 sm:ml-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg cursor-pointer text-xs sm:text-sm font-medium hover:bg-red-700 transition duration-200 shadow-md shadow-red-500/50 whitespace-nowrap"
            >
              🚪 로그아웃
            </button>
          ) : (
            <div className="flex space-x-1 sm:space-x-3 items-center">
              <Link
                to="/login"
                className="text-blue-400 px-1 py-1 sm:px-3 sm:py-2 cursor-pointer text-xs sm:text-sm font-medium hover:text-blue-300 transition duration-200 whitespace-nowrap"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg cursor-pointer text-xs sm:text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-500/50 whitespace-nowrap"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex justify-center p-0 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-6xl h-full flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
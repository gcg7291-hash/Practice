import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function RootLayout() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isLoggedIn = !!token;

  // 로고를 제외한 필수 네비게이션 아이템
  const essentialLinks = [
    { path: "/memo", label: "메모 작성" },
    { path: "/memolist", label: "메모 목록" },
  ];

  const userNavItems = isLoggedIn
    ? [{ path: "/profile", label: "내 정보" }]
    : [];

  const navLinks = [...essentialLinks, ...userNavItems];

  const activeNavItemClass =
    "bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/50 transition duration-300 transform scale-105";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      {/* ⭐️ 헤더: w-full, flex */}
      <header className="w-full flex justify-between items-center bg-gray-800 border-b border-gray-700 p-3 sm:p-4 sticky top-0 z-20 shadow-lg">
        {/* ⭐️ 1. 로고 섹션: 항상 고정된 크기 */}
        <Link
          to="/"
          className="text-blue-400 font-extrabold text-xl sm:text-2xl hover:text-blue-300 whitespace-nowrap mr-4 shrink-0"
        >
          Memo AI
        </Link>

        {/* ⭐️ 2. 네비게이션 링크 섹션: flex-1로 남은 공간 유연하게 사용 */}
        <nav className="flex items-center space-x-2 flex-1 min-w-0">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                // ⭐️ 모바일에서 패딩을 더 줄여 공간 확보 (px-2, py-1)
                `px-2 py-1 sm:px-4 sm:py-2 text-sm whitespace-nowrap cursor-pointer hover:text-blue-400 transition duration-200 
                text-gray-300 hover:bg-gray-700 rounded-lg
                ${isActive ? activeNavItemClass : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ⭐️ 3. 인증 버튼 그룹: shrink-0과 min-w-fit으로 절대 깨지지 않도록 보호 */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 min-w-fit ml-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-700 transition duration-200 shadow-md shadow-red-500/50 whitespace-nowrap"
            >
              🚪 로그아웃
            </button>
          ) : (
            // ⭐️ 로그인/회원가입 그룹: 내부 div로 묶어 flex 공간 확보
            <div className="flex space-x-2 sm:space-x-3 items-center">
              <Link
                to="/login"
                // ⭐️ 모바일에서 패딩을 더 줄여 공간 확보 (px-2)
                className="text-blue-400 px-2 py-1 sm:px-3 sm:py-2 cursor-pointer text-sm font-medium hover:text-blue-300 transition duration-200 whitespace-nowrap"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-500/50 whitespace-nowrap"
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

import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
// Redux 상태 사용을 위해 useSelector와 useDispatch를 가져옵니다.
import { useSelector, useDispatch } from "react-redux";
// 로그아웃 액션 생성자 함수를 가져옵니다.
import { logout } from "../store/authSlice";

export default function RootLayout() {
  // Redux에서 토큰 상태를 가져옵니다.
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // 토큰 존재 여부로 로그인 상태를 판단합니다.
  const isLoggedIn = !!token;

  // 필수로 보여야 하는 네비게이션 아이템
  const essentialNavItems = [
    { path: "/", label: "Memo AI" },
    { path: "/memo", label: "메모 작성" },
    { path: "/memolist", label: "메모 목록" },
  ];

  // 로그인 상태에 따라 추가되는 아이템
  const userNavItems = isLoggedIn
    ? [{ path: "/profile", label: "내 정보" }]
    : [];

  // 모든 네비게이션 아이템
  const navItems = [...essentialNavItems, ...userNavItems];

  // ⭐️ 활성화된 내비게이션 항목의 스타일을 명확하게 정의
  const activeNavItemClass =
    "bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/50 transition duration-300 transform scale-105";

  // 로그아웃 처리 함수
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // 전체 컨테이너: min-h-screen으로 화면 꽉 채우기, 다크 배경
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      {/* ⭐️ 헤더/내비게이션 바: sticky top-0, 반응형 패딩, z-index 높여서 고정 */}
      <header className="flex justify-between items-center bg-gray-800 border-b border-gray-700 p-3 sm:p-4 sticky top-0 z-20 shadow-lg">
        {/* ⭐️ 네비게이션 항목 그룹: flex-wrap 대신 nowrap을 유지하며, 중요한 항목(Logo, 작성, 목록)은 항상 보이도록 배치 */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          {navItems.map((item) => {
            const isLogo = item.path === "/";

            return (
              <NavLink
                key={item.path}
                to={item.path}
                // ⭐️ whitespace-nowrap 유지하여 줄바꿈 방지
                className={({ isActive }) =>
                  `px-3 py-1 sm:px-4 sm:py-2 text-sm whitespace-nowrap cursor-pointer hover:text-blue-400 transition duration-200 
                  ${
                    isLogo
                      ? "text-blue-400 font-extrabold text-xl sm:text-2xl hover:text-blue-300"
                      : "text-gray-300 hover:bg-gray-700 rounded-lg"
                  } 
                  ${isActive ? activeNavItemClass : ""}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* ⭐️ 인증 관련 버튼 그룹: flex를 유지하여 가로 정렬 보장 */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isLoggedIn ? (
            // 로그인 상태일 때: 로그아웃 버튼 표시
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-700 transition duration-200 shadow-md shadow-red-500/50 whitespace-nowrap"
            >
              🚪 로그아웃
            </button>
          ) : (
            // 로그아웃 상태일 때: 로그인 및 회원가입 버튼 표시 (가로 정렬)
            <div className="flex space-x-2 sm:space-x-3 items-center">
              {/* 로그인 링크 */}
              <Link
                to="/login"
                className="text-blue-400 px-1 py-1 sm:px-3 sm:py-2 cursor-pointer text-sm font-medium hover:text-blue-300 transition duration-200 whitespace-nowrap"
              >
                로그인
              </Link>
              {/* 회원가입 버튼: 강조 스타일 적용 */}
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

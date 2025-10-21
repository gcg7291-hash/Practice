import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
// ⭐️ Redux 상태 사용을 위해 useSelector와 useDispatch를 가져옵니다.
import { useSelector, useDispatch } from "react-redux";
// ⭐️ 로그아웃 액션 생성자 함수를 가져옵니다. (authSlice 파일에 logout이 정의되어 있다고 가정)
import { logout } from "../store/authSlice"; 

export default function RootLayout() {
  // ⭐️ Redux에서 토큰 상태를 가져옵니다.
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  
  // ⭐️ 토큰 존재 여부로 로그인 상태를 판단합니다.
  const isLoggedIn = !!token;

  const navItems = [
    { path: "/", label: "Memo AI" },
    { path: "/memo", label: "메모 작성" },
    { path: "/memolist", label: "메모 목록" },
    // ⭐️ 로그인 상태일 때만 '내 정보' 링크를 추가할 수 있습니다.
    ...(isLoggedIn ? [{ path: "/profile", label: "내 정보" }] : []),
  ];
  
  const activeNavItemClass = "bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/50 transition duration-300";

  // ⭐️ 로그아웃 처리 함수
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // 전체 배경을 어두운 색으로 설정하고 min-h-screen으로 화면 꽉 채우기
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* 헤더/내비게이션 바: 어두운 배경 및 경계선 */}
      <div className="flex justify-between items-center bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
        
        {/* 네비게이션 항목 그룹 */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isLogo = item.path === "/";
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm cursor-pointer hover:text-blue-400 transition duration-200 
                  ${isLogo ? "text-blue-400 font-extrabold text-xl" : "text-gray-300"} 
                  ${isActive ? activeNavItemClass : ""}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* ⭐️ 인증 관련 버튼 그룹 (로그인 상태에 따라 변경) */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            // ⭐️ 로그인 상태일 때: 로그아웃 버튼 표시
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-500 transition duration-200"
            >
              로그아웃
            </button>
          ) : (
            // ⭐️ 로그아웃 상태일 때: 로그인 및 회원가입 버튼 표시
            <>
              {/* 로그인 링크 */}
              <Link
                to="/login"
                className="text-blue-400 px-3 py-2 cursor-pointer text-sm hover:text-blue-300 transition duration-200"
              >
                로그인
              </Link>
              {/* 회원가입 버튼 */}
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-500 transition duration-200"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex justify-center overflow-y-auto">
        <div className="w-full max-w-6xl h-full flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
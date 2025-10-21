import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  const navItems = [
    { path: "/", label: "Memo AI" },
    { path: "/memo", label: "메모 작성" },
    { path: "/memolist", label: "메모 목록" },
  ];
  // 다크 모드에 맞게 파란색으로 강조하는 스타일 변경
  const activeNavItemClass = "bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 transition duration-300";

  return (
    // ⭐️ 변경: min-h-screen을 사용하여 최소 높이를 뷰포트 높이로 설정
    // ⭐️ 변경: flex-col을 추가하여 내부 요소를 수직으로 배치
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* 헤더/내비게이션 바: 어두운 배경 및 경계선 (높이는 고정) */}
      <div className="flex justify-between items-center bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
        {/* 네비게이션 항목 그룹 */}
        <div className="flex items-center">
          <nav>
            <div className="flex items-center gap-2">
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
            </div>
          </nav>
        </div>

        {/* 로그인, 회원가입은 맨 오른쪽으로 배치 */}
        <div className="flex items-center gap-2">
          <a
            className="text-blue-400 px-3 py-2 cursor-pointer text-sm hover:text-blue-300 transition duration-200"
            href="/login"
            data-discover="true"
          >
            로그인
          </a>
          <a
            className="bg-blue-600 text-white px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-500 transition duration-200"
            href="/signup"
            data-discover="true"
          >
            회원가입
          </a>
        </div>
      </div>
      
      {/* 메인 콘텐츠 영역: ⭐️ 변경: flex-1을 사용하여 남은 모든 공간을 채움 */}
      <div className="flex-1 flex justify-center overflow-y-auto">
        <div className="w-full max-w-6xl h-full flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
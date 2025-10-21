import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    // ⭐️ 전체 컨테이너: 다크 테마 배경(bg-gray-900), 텍스트(text-gray-100) 적용
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 sm:p-8 text-center">
      
      {/* ⭐️ 컨테이너 카드: 시각적으로 강조하고 모바일/웹 크기 제한 */}
      <div className="bg-gray-800 p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700">
        
        {/* 오류 코드: 폰트 사이즈를 더 크게, 강조 색상 사용 */}
        <h1 className="text-8xl sm:text-9xl font-extrabold text-blue-500 mb-6 tracking-widest animate-pulse">
          404
        </h1>
        
        {/* 오류 제목 */}
        <p className="text-3xl sm:text-4xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-4">
          페이지를 찾을 수 없습니다.
        </p>
        
        {/* 오류 상세 메시지 */}
        <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
          <br className="hidden sm:inline" /> 아래 버튼을 눌러 홈으로 돌아가주세요.
        </p>

        {/* '홈페이지로 돌아가기' 링크/버튼 스타일링 */}
        <Link
          to="/"
          className="
            inline-block 
            w-full sm:w-auto 
            px-8 py-3 
            text-lg font-bold 
            text-white 
            bg-blue-600 
            rounded-lg 
            shadow-xl shadow-blue-500/50 
            hover:bg-blue-700 
            transition duration-300 
            ease-in-out 
            transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
          "
        >
          <span className="flex items-center justify-center space-x-2">
            <span>홈으로 돌아가기</span> 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6 0h6" />
            </svg>
          </span>
        </Link>
        
      </div>
    </div>
  );
}
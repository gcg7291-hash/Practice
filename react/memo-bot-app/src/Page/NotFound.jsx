import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    // 전체 컨테이너: 화면 전체 높이를 차지하고 내용을 중앙에 배치
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      {/* 오류 메시지 영역: 큰 폰트와 볼드체로 강조, 텍스트 색상 지정 */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-red-600 mb-4">
        404 Error
      </h1>
      <p className="text-xl text-gray-800 mb-8">
        페이지를 찾을 수 없습니다. 요청하신 페이지가 존재하지 않거나, 이동되었을
        수 있습니다.
      </p>

      {/* '홈페이지로 돌아가기' 링크/버튼 스타일링 */}
      <Link
        to="/"
        className="
          inline-block 
          px-6 py-3 
          text-lg font-semibold 
          text-white 
          bg-indigo-600 
          rounded-lg 
          shadow-md 
          hover:bg-indigo-700 
          transition duration-300 
          ease-in-out 
          transform hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
        "
      >
        홈페이지로 돌아가기 🏠
      </Link>
    </div>
  );
}

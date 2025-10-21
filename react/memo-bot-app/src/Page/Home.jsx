import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    // 전체 페이지 설정: 다크 모드, 최소 높이, 모바일/웹 패딩 설정
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 sm:p-8 md:p-12"> 
      
      {/* 중앙 정렬 컨테이너. sm:p-0 추가하여 컨테이너 안쪽에서 패딩이 겹치지 않게 정리 */}
      <div className="max-w-4xl mx-auto">

        {/* 히어로 섹션 */}
        <section className="text-center py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 tracking-tight"> 
            {/* tracking-tight 추가로 모바일에서 가독성 개선 */}
            Memo AI
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-6 font-medium"> 
            {/* sm:text-2xl 추가로 태블릿 크기에서도 텍스트 크기 조절 */}
            지능형 메모 관리
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8"> 
            {/* sm:text-lg 추가로 모바일 가독성 개선 */}
            자연어로 할 일을 입력하면 **AI가 자동으로 구조화된 메모로 변환**해주는
            지능형 메모 관리 서비스입니다.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-500/50 transform hover:scale-105"
            // transform hover:scale-105 추가로 버튼에 재미있는 애니메이션 효과 추가
          >
            지금 무료로 시작하기!
          </Link>
        </section>

        <hr className="border-gray-700 my-12 md:my-16" />

        {/* 주요 기능 섹션 */}
        <section className="py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-10 text-center">
            {/* sm:text-4xl로 모바일 제목 크기 조절 */}
            주요 기능
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-12 text-center max-w-xl mx-auto">
            AI 기술을 활용하여 할 일 관리를 더욱 쉽고 효율적으로 만들어 드립니다.
          </p>

          {/* 기능 카드 레이아웃 - 모바일(1열), 중간 크기(3열) */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* AI 자연어 처리 카드 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-blue-600 transition duration-300 hover:shadow-blue-500/20">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-3">AI 자연어 처리</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                "내일 오후 3시에 회의 준비하기" 와 같은 자연어로 입력하면 **AI가 자동으로
                구조화된 메모로 변환**합니다.
              </p>
            </div>

            {/* 스마트 메모 생성 카드 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-blue-600 transition duration-300 hover:shadow-blue-500/20">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-3">스마트 메모 생성</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                할 일 내용, 마감일, 우선순위, 카테고리를 자동으로 추출하여 **체계적인
                메모**를 생성합니다.
              </p>
            </div>

            {/* 효율적인 관리 카드 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-blue-600 transition duration-300 hover:shadow-blue-500/20">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-3">효율적인 관리</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                메모 목록에서 상태를 변경하고, 지연된 할 일을 확인하며, **완료된 작업을
                쉽게 관리**할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-700 my-12 md:my-16" />

        {/* 사용 방법 섹션 */}
        <section className="py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-10 text-center">
            사용 방법
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-12 text-center max-w-xl mx-auto">
            간단한 3단계로 할 일을 효율적으로 관리하세요.
          </p>

          {/* 3단계 프로세스 레이아웃 - 모바일(1열), 중간 크기(3열) */}
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 text-center">
            
            {/* 1단계 */}
            <div className="p-4 rounded-lg bg-gray-800/50"> {/* 배경 색상 및 패딩 추가 */}
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-3 bg-gray-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-blue-500">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mt-4 mb-2">자연어로 입력</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                "내일 오전 10시에 프로젝트 보고서 작성하기"와 같이 자연스러운 문장으로
                할 일을 입력합니다.
              </p>
            </div>

            {/* 2단계 */}
            <div className="p-4 rounded-lg bg-gray-800/50"> {/* 배경 색상 및 패딩 추가 */}
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-3 bg-gray-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-blue-500">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mt-4 mb-2">AI 구조화</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                AI가 입력된 내용을 분석하여 할 일 내용, 마감일, 우선순위, 카테고리로
                자동 분류합니다.
              </p>
            </div>

            {/* 3단계 */}
            <div className="p-4 rounded-lg bg-gray-800/50"> {/* 배경 색상 및 패딩 추가 */}
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-3 bg-gray-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-blue-500">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mt-4 mb-2">메모로 저장</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                구조화된 메모를 확인하고 저장하여 체계적으로 할 일을 관리합니다.
              </p>
            </div>
          </div>
        </section>
        
        <hr className="border-gray-700 my-12 md:my-16" />

      </div>

      {/* 푸터 섹션 - ⭐️ 전체 너비로 변경 */}
      <footer className="bg-gray-800 py-12 md:py-16 text-center mt-8 w-full"> 
        <div className="max-w-4xl mx-auto px-4"> {/* 푸터 내용 중앙 정렬 */}
          <h2 className="text-3xl font-bold text-gray-100 mb-3">지금 시작해보세요</h2>
          <p className="text-lg text-gray-400 mb-8">
            AI 기술로 더욱 스마트한 할 일 관리를 경험해보세요
          </p>
          <Link to="signup">
            <button 
              className="bg-blue-600 text-white font-bold px-10 py-4 rounded-full text-xl hover:bg-blue-700 transition duration-300 shadow-2xl shadow-blue-400/50 transform hover:scale-105"
            >
              무료로 시작하기
            </button>
          </Link>
          <p className="text-sm text-gray-500 mt-10">© 2025 Memo AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
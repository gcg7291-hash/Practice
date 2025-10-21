import React from "react";
import { Link } from "react-router-dom";
// Outlet과 NavLink는 이 컴포넌트에서는 사용되지 않지만,
// 이전 컴포넌트에서 가져온 것이므로 import 문에서 제거했습니다.

export default function Home() {
  return (
    // ⭐️ 전체 페이지를 뷰포트에 꽉 채우고(min-h-screen), 다크 배경과 밝은 텍스트 설정
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 md:p-12">
      
      {/* ⭐️ 중앙 정렬을 위한 컨테이너. max-w-4xl로 콘텐츠 너비 제한 */}
      <div className="max-w-4xl mx-auto">

        {/* 히어로 섹션 */}
        <section className="text-center py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-4">
            Memo AI
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            지능형 메모 관리
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            자연어로 할 일을 입력하면 **AI가 자동으로 구조화된 메모로 변환**해주는
            지능형 메모 관리 서비스입니다.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/50"
          >
            지금 무료로 시작하기!
          </Link>
        </section>

        <hr className="border-gray-700 my-16" />

        {/* 주요 기능 섹션 */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
            주요 기능
          </h1>
          <p className="text-lg text-gray-400 mb-12 text-center">
            AI 기술을 활용하여 할 일 관리를 더욱 쉽고 효율적으로 만들어 드립니다.
          </p>

          {/* 기능 카드 레이아웃 */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* AI 자연어 처리 카드 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-blue-600">
              <h1 className="text-2xl font-semibold text-gray-100 mb-3">AI 자연어 처리</h1>
              <p className="text-gray-400">
                "내일 오후 3시에 회의 준비하기" 와 같은 자연어로 입력하면 **AI가 자동으로
                구조화된 메모로 변환**합니다.
              </p>
            </div>

            {/* 스마트 메모 생성 카드 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-blue-600">
              <h1 className="text-2xl font-semibold text-gray-100 mb-3">스마트 메모 생성</h1>
              <p className="text-gray-400">
                할 일 내용, 마감일, 우선순위, 카테고리를 자동으로 추출하여 **체계적인
                메모**를 생성합니다.
              </p>
            </div>

            {/* 효율적인 관리 카드 */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-blue-600">
              <h1 className="text-2xl font-semibold text-gray-100 mb-3">효율적인 관리</h1>
              <p className="text-gray-400">
                메모 목록에서 상태를 변경하고, 지연된 할 일을 확인하며, **완료된 작업을
                쉽게 관리**할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-700 my-16" />

        {/* 사용 방법 섹션 */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
            사용 방법
          </h1>
          <p className="text-lg text-gray-400 mb-12 text-center">
            간단한 3단계로 할 일을 효율적으로 관리하세요.
          </p>

          {/* 3단계 프로세스 레이아웃 */}
          <div className="grid md:grid-cols-3 gap-10 text-center">
            
            {/* 1단계 */}
            <div>
              <div className="text-5xl font-extrabold text-blue-500 mb-3 bg-gray-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-blue-500">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mt-4 mb-2">자연어로 입력</h3>
              <p className="text-gray-400">
                "내일 오전 10시에 프로젝트 보고서 작성하기"와 같이 자연스러운 문장으로
                할 일을 입력합니다.
              </p>
            </div>

            {/* 2단계 */}
            <div>
              <div className="text-5xl font-extrabold text-blue-500 mb-3 bg-gray-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-blue-500">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mt-4 mb-2">AI 구조화</h3>
              <p className="text-gray-400">
                AI가 입력된 내용을 분석하여 할 일 내용, 마감일, 우선순위, 카테고리로
                자동 분류합니다.
              </p>
            </div>

            {/* 3단계 */}
            <div>
              <div className="text-5xl font-extrabold text-blue-500 mb-3 bg-gray-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-blue-500">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mt-4 mb-2">메모로 저장</h3>
              <p className="text-gray-400">
                구조화된 메모를 확인하고 저장하여 체계적으로 할 일을 관리합니다.
              </p>
            </div>

          </div>
        </section>
        
        <hr className="border-gray-700 my-16" />

      </div>

      {/* 푸터 섹션 */}
      <footer className="bg-gray-800 py-16 text-center mt-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-3">지금 시작해보세요</h2>
        <p className="text-lg text-gray-400 mb-8">
          AI 기술로 더욱 스마트한 할 일 관리를 경험해보세요
        </p>
        <Link to="signup">
          <button className="bg-blue-600 text-white font-bold px-10 py-4 rounded-full text-xl hover:bg-blue-700 transition duration-300 shadow-md shadow-blue-400">
            무료로 시작하기
          </button>
        </Link>
        <p className="text-sm text-gray-500 mt-10">© 2025 Memo AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
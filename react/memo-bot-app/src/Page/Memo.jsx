// 📁 src/pages/Memo.jsx (또는 프로젝트에 맞게 경로 확인)

import { useState, useEffect } from "react";
import axios from "axios"; // ⭐️ axios 설치 완료 확인
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ⭐️ 프로젝트의 다른 파일들
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";
import { addMemo } from "../utils/memoStorage"; // 메모 저장 유틸리티

// ⭐️ 메모 확인 UI 컴포넌트 (UI를 깔끔하게 분리)
const MemoConfirmation = ({ structuredMemo, onSave, onCancel }) => (
  <div className="bg-blue-900/50 p-4 rounded-xl max-w-xl self-start mb-4 shadow-lg border border-blue-800">
    <h3 className="text-lg font-bold text-blue-300 mb-3">
      AI가 메모를 작성했습니다. 저장하시겠어요?
    </h3>

    <div className="space-y-2 text-gray-200 text-sm">
      <p>
        <strong className="text-blue-200">제목:</strong> {structuredMemo.title}
      </p>
      <p>
        <strong className="text-blue-200">작성일:</strong>{" "}
        {structuredMemo.createdAt} ({structuredMemo.toDay})
      </p>
      <p>
        <strong className="text-blue-200">마감일:</strong>{" "}
        {structuredMemo.dueDate} ({structuredMemo.newDay})
      </p>
      <p>
        <strong className="text-blue-200">중요도:</strong>{" "}
        {structuredMemo.priority}
      </p>
      <p>
        <strong className="text-blue-200">카테고리:</strong>{" "}
        {structuredMemo.category}
      </p>
    </div>

    <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-blue-800">
      <button
        onClick={onSave}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-200 shadow-md"
      >
        ✔️ 메모 저장
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-600 text-gray-200 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-500 transition duration-200 shadow-md"
      >
        ❌ 취소
      </button>
    </div>
  </div>
);

export default function Memo() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [structuredMemo, setStructuredMemo] = useState(null);

  // 인증 관련
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // 폼 제출 핸들러
  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading || prompt.trim() === "") return;

    setStructuredMemo(null);

    // 사용자 메시지를 먼저 대화 목록에 추가
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    const currentPrompt = prompt;
    setPrompt("");

    setIsLoading(true);
    await generateAiContent(currentPrompt);
    setIsLoading(false);
  }

  // ⭐️ 핵심 로직: 서버리스 함수를 호출하여 AI 응답을 받음
  async function generateAiContent(currentPrompt) {
    try {
      // ⭐️ 서버리스 함수인 /api/ai/generate-memo 경로에 POST 요청
      const response = await axios.post("/api/ai/generate-memo", {
        message: currentPrompt,
        // (필요하다면 responseSchema 등 추가 데이터 전송)
      });

      // ⭐️ 서버리스 함수에서 구조화된 데이터와 일반 응답을 동시에 받음
      const { structuredMemo: parsedData, aiText } = response.data;

      // 1. 구조화된 메모 상태 업데이트 (메모 확인 UI 표시)
      setStructuredMemo({
        title: parsedData.title,
        content: parsedData.content,
        dueDate: parsedData.dueDate || "N/A",
        priority: parsedData.priority,
        category: parsedData.category,
        createdAt: parsedData.createdAt,
        newDay: parsedData.newDay,
        toDay: parsedData.toDay,
      });

      // 2. 일반 텍스트 응답을 메시지 목록에 추가 (대화 내용)
      setMessages((prev) => [...prev, { role: "ai", content: aiText }]);
      
    } catch (error) {
      console.error("AI 응답 생성 오류:", error);

      // ⭐️ 서버리스 함수 응답(404, 500 등)에서 에러 메시지를 추출하여 사용자에게 표시
      const errorMessage = error.response?.data?.error 
                         || "AI 메모 생성에 실패했습니다 (서버 또는 네트워크 오류).";
                         
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `죄송합니다. 오류가 발생했습니다: ${errorMessage}` },
      ]);
      setStructuredMemo(null); // 오류 발생 시 메모 확인 UI 표시하지 않음
    }
  }

  // 메모 저장 핸들러
  const handleCreateMemo = () => {
    if (structuredMemo) {
      addMemo(structuredMemo);
      setStructuredMemo(null);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `"${structuredMemo.title}" 메모가 성공적으로 저장되었습니다.`,
        },
      ]);
    }
  };

  // 메모 취소 핸들러
  const handleCancelMemo = () => {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "메모 생성을 취소했습니다.",
      },
    ]);
    setStructuredMemo(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col h-full md:h-[600px] bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        
        {/* 메시지 목록 및 메모 확인 UI */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 rounded-t-xl">
          {/* 기존 메시지 목록 렌더링 */}
          <MessageList messages={messages} />

          {/* 구조화된 메모 확인 UI 렌더링 */}
          {structuredMemo && (
            <MemoConfirmation
              structuredMemo={structuredMemo}
              onSave={handleCreateMemo}
              onCancel={handleCancelMemo}
            />
          )}
        </div>

        {/* 채팅 입력 폼 */}
        <div className="p-4 bg-gray-700/50 border-t border-gray-700 rounded-b-xl">
          <ChatForm
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
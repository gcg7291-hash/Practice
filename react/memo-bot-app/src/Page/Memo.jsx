import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ⭐️ 프로젝트의 다른 파일들
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";
import { addMemo } from "../utils/memoStorage"; // 메모 저장 유틸리티

// (MemoConfirmation 컴포넌트는 위에 정의된 코드를 그대로 사용하세요.)
const MemoConfirmation = ({ structuredMemo, onSave, onCancel }) => {
  // ... (위의 MemoConfirmation 코드)
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "높음":
      case "high":
        return "text-red-400 font-bold";
      case "중간":
      case "medium":
        return "text-yellow-400 font-bold";
      case "낮음":
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-blue-900/40 p-5 rounded-xl max-w-lg w-full self-end ml-auto mr-0 mt-4 shadow-xl border border-blue-700 animate-fadeIn">
      <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
        ✨ AI 메모 초안이 완성되었습니다!
      </h3>
      <div className="space-y-3 text-gray-200 text-sm border-t border-blue-700 pt-4">
        <p className="flex justify-between items-start">
          <strong className="text-blue-200 min-w-[70px]">제목</strong>
          <span className="text-right flex-1">{structuredMemo.title}</span>
        </p>
        <p className="flex justify-between items-start">
          <strong className="text-blue-200 min-w-[70px]">내용</strong>
          <span className="text-right flex-1 break-words">
            {structuredMemo.content}
          </span>
        </p>
        <p className="flex justify-between items-center">
          <strong className="text-blue-200 min-w-[70px]">마감일</strong>
          <span className="text-right">{structuredMemo.dueDate}</span>
        </p>
        <p className="flex justify-between items-center">
          <strong className="text-blue-200 min-w-[70px]">중요도</strong>
          <span
            className={`text-right ${getPriorityColor(
              structuredMemo.priority
            )}`}
          >
            {structuredMemo.priority}
          </span>
        </p>
        <p className="flex justify-between items-center">
          <strong className="text-blue-200 min-w-[70px]">카테고리</strong>
          <span className="text-right">{structuredMemo.category}</span>
        </p>
      </div>
      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-blue-700">
        <button
          onClick={onSave}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-[1.03]"
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
};
// --------------------------------------------------------------------------------

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

  // 폼 제출 핸들러 (이하 로직은 변경 없음)
  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading || prompt.trim() === "") return;

    setStructuredMemo(null);

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    const currentPrompt = prompt;
    setPrompt("");

    setIsLoading(true);
    await generateAiContent(currentPrompt);
    setIsLoading(false);
  }

  async function generateAiContent(currentPrompt) {
    const apiUrl = `/api/ai/generate-memo`;

    try {
      const response = await axios.post(apiUrl, {
        message: currentPrompt,
      });

      const { structuredMemo: parsedData, aiText } = response.data;

      setStructuredMemo({
        title: parsedData.title,
        content: parsedData.content,
        dueDate: parsedData.dueDate || "N/A",
        priority: parsedData.priority,
        category: parsedData.category,
        createdAt:
          parsedData.createdAt || new Date().toISOString().slice(0, 10),
        toDay: parsedData.toDay || new Date().toISOString().slice(0, 10),
      });

      setMessages((prev) => [...prev, { role: "ai", content: aiText }]);
    } catch (error) {
      console.error("AI 응답 생성 오류:", error);

      const errorMessage =
        error.response?.data?.error ||
        "AI 메모 생성에 실패했습니다 (서버 또는 네트워크 오류).";
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `죄송합니다. 오류가 발생했습니다: ${errorMessage}`,
        },
      ]);
      setStructuredMemo(null);
    }
  }

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
    // ⭐️ 전체 컨테이너: 모바일에서 꽉 채우기 (min-h-screen 대신 h-full 사용 가능)
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col items-center justify-center p-4">
      {/* ⭐️ 채팅 박스: 모바일 최적화를 위해 높이 조정 */}
      <div className="w-full max-w-3xl flex flex-col h-[calc(100vh-6rem)] md:h-[650px] bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        {/* 메시지 목록 영역 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 rounded-t-xl space-y-4">
          <MessageList messages={messages} />

          {/* 메모 확인 UI */}
          {structuredMemo && structuredMemo.title !== "답변 불가" && (
            <MemoConfirmation
              structuredMemo={structuredMemo}
              onSave={handleCreateMemo}
              onCancel={handleCancelMemo}
            />
          )}
        </div>

        {/* 채팅 입력 폼 영역 */}
        <div className="p-2 bg-gray-700/70 border-t border-gray-700 rounded-b-xl shadow-inner shadow-gray-900/50">
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

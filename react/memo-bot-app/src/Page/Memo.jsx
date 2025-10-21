import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// ⭐️ axios 추가 (npm install axios 필요)
import axios from 'axios'; 

// ❌ 기존 AI 관련 import는 삭제하거나, 서버리스로 대체되므로 사용하지 않습니다.
// import { ai } from "../utils/genai";
// import { chat } from "../utils/genai";
// import { config } from "../utils/genai";
import { responseSchema } from "../utils/genai"; // responseSchema는 타입 정의를 위해 남겨둘 수 있습니다.
import { addMemo } from "../utils/memoStorage";
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";

// ⭐️ MemoConfirmation 컴포넌트는 변경 없음
const MemoConfirmation = ({ structuredMemo, onSave, onCancel }) => (
  // ⭐️ 일반 AI 메시지 말풍선과 유사한 스타일을 적용
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
      {/* 생성 버튼: 파란색 강조 */}
      <button
        onClick={onSave}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-200 shadow-md"
      >
        ✔️ 메모 저장
      </button>
      {/* 취소 버튼: 보조 색상 */}
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

  const token = useSelector((state) => {
    return state.auth.token;
  });
  const navigate = useNavigate();
  
  // 인증 로직 (변경 없음)
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // 제출 핸들러 (변경 없음)
  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading === true || prompt.trim() === "") return;

    setStructuredMemo(null);

    // ⭐️ 사용자 메시지 추가
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    const currentPrompt = prompt;
    setPrompt("");

    setIsLoading(true);
    await generateAiContent(currentPrompt);
    setIsLoading(false);
  }

  // ⭐️ 서버리스 API 요청으로 대체된 함수
  async function generateAiContent(currentPrompt) {
    const today = new Date().toISOString().slice(0, 10);
    // ⭐️ 서버리스 함수에 전달할 최종 프롬프트
    const contentsWithDate = `오늘 날짜는 ${today}입니다. 이 정보를 바탕으로 메모의 제목, 내용, 그리고 작성 날짜(toDay)와 마감 날짜(dueDate)를 JSON 형식으로 추출해 주세요: "${currentPrompt}"`;
    
    try {
      // 1. 기존 주소 대신 서버리스 함수 파일의 경로(/api/ai/generate-memo)에 요청을 보낸다
      const response = await axios.post("/api/ai/generate-memo", {
        message: contentsWithDate, // 서버리스 함수에 프롬프트를 전송
      });

      // ⭐️ 서버리스 함수가 이미 파싱된 JSON 객체를 반환했으므로 response.data를 사용
      const parsedData = response.data;

      // 메모 구조화 상태 업데이트
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

      // AI 응답 메시지 추가
      setMessages((prev) => [
        ...prev, 
        { 
          role: "ai", 
          content: `말씀하신 내용에서 메모 정보를 추출했습니다. 저장하시겠어요? (제목: ${parsedData.title})` 
        }
      ]);
      
    } catch (error) {
      console.error("서버리스 API 요청 오류:", error);
      setStructuredMemo(null);
      
      // 서버 에러 응답 처리
      let errorMessage = "죄송합니다. 서버 통신 또는 메모 분석 중 오류가 발생했습니다.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: errorMessage },
      ]);
    }
  }

  // 메모 저장 핸들러 (변경 없음)
  const handleCreateMemo = () => {
    if (structuredMemo) {
      addMemo(structuredMemo);
      setStructuredMemo(null);
      // ⭐️ 메모 생성 완료 메시지를 대화에 추가
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `"${structuredMemo.title}" 메모가 성공적으로 저장되었습니다.`,
        },
      ]);
    }
  };

  // 메모 취소 핸들러 (변경 없음)
  const handleCancelMemo = () => {
    // ⭐️ 메모 생성 취소 메시지를 대화에 추가
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "메모 생성을 취소했습니다.",
      },
    ]);
    setStructuredMemo(null);
  };

  // 렌더링 부분 (변경 없음)
  return (
    // 🚀 수정된 컨테이너: 화면을 꽉 채우고(min-h-screen), 수직 중앙 정렬(items-center)
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      {/* 🚀 중앙에 배치될 메인 컨텐츠 영역 (메시지 목록 + 입력 폼) */}
      {/* 🚀 max-w-2xl: 최대 너비를 설정하여 가운데 정렬되게 함 */}
      {/* 🚀 flex-grow: 화면 크기가 충분할 때 중앙 정렬을 돕기 위해 사용 */}
      <div className="w-full max-w-2xl flex flex-col h-full md:h-[600px] bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        
        {/* ⭐️ 메시지 목록: 유연하게 채우고 스크롤 가능하게 함 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 rounded-t-xl">
          {/* 기존 메시지 목록 렌더링 */}
          <MessageList messages={messages} />

          {/* ⭐️ 구조화된 메모 확인 UI를 메시지 목록의 흐름에 따라 렌더링 */}
          {structuredMemo && (
            <MemoConfirmation
              structuredMemo={structuredMemo}
              onSave={handleCreateMemo}
              onCancel={handleCancelMemo}
            />
          )}
        </div>

        {/* 🚀 채팅 입력 폼: 하단 고정 해제 및 내부 컨테이너의 하단에 배치 */}
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
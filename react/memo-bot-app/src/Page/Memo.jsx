import { ai } from "../utils/genai";
import { chat } from "../utils/genai";
import { config } from "../utils/genai";
import { useState } from "react";
// ⭐️ 메모 확인 UI를 MessageList 안에서 처리하기 위해 MessageList 내부에서 렌더링되도록 수정하거나,
// 이 코드를 MessageList에 통합하는 것이 이상적이지만, 여기서는 분리된 상태로 스타일링합니다.
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";
import { responseSchema } from "../utils/genai";
import { addMemo } from "../utils/memoStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// ⭐️ MemoConfirmation 컴포넌트를 분리하여 깔끔하게 처리합니다.
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
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
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

  // (generateAiContent 함수는 변경 없음)
  async function generateAiContent(currentPrompt) {
    const today = new Date().toISOString().slice(0, 10);
    const contentsWithDate = `오늘 날짜는 ${today}입니다. 이 정보를 바탕으로 메모의 제목, 내용, 그리고 작성 날짜(toDay)와 마감 날짜(dueDate)를 JSON 형식으로 추출해 주세요: "${currentPrompt}"`;
    try {
      // 1. 구조화된 데이터 추출 시도
      const structuredResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contentsWithDate,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const jsonText = structuredResponse.text.trim();
      let parsedData = {};

      try {
        parsedData = JSON.parse(jsonText);

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
      } catch (e) {
        console.error("JSON 파싱 실패:", e);
        setStructuredMemo(null);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "죄송합니다. 메모 분석 중 오류가 발생했습니다.",
          },
        ]);
        return;
      }

      // 2. 일반 텍스트 응답 생성 및 메시지 추가
      const textResponse = await chat.sendMessage({
        message: currentPrompt,
        config: config,
      });

      const aiText = textResponse.text;

      setMessages((prev) => [...prev, { role: "ai", content: aiText }]);
    } catch (error) {
      console.error("AI 응답 생성 오류:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "죄송합니다. AI 응답 생성에 실패했습니다." },
      ]);
    }
  }

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
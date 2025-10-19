import { ai } from "../utils/genai";
import { chat } from "../utils/genai";
import { config } from "../utils/genai";
import { useState } from "react";
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";
import { responseSchema } from "../utils/genai"; // responseSchema import
import { addMemo } from "../utils/memoStorage";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // LLM이 구조화한 임시 메모 데이터를 저장하는 상태
  const [structuredMemo, setStructuredMemo] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading === true || prompt.trim() === "") return;

    // 이전에 임시 메모가 남아있다면 초기화
    setStructuredMemo(null);

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    const currentPrompt = prompt;
    setPrompt("");

    setIsLoading(true);
    await generateAiContent(currentPrompt);
    setIsLoading(false);
  }

  async function generateAiContent(currentPrompt) {
    try {
      // 1. LLM에게 구조화된 JSON 데이터 생성 요청 (메모 저장용)
      const structuredResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: currentPrompt,
        config: {
          responseMimeType: "application/json", // JSON 응답 강제
          responseSchema: responseSchema, // 수정된 스키마 적용 (title, content 포함)
        },
      });

      const jsonText = structuredResponse.text.trim();
      let parsedData = {};

      try {
        parsedData = JSON.parse(jsonText);
        // 구조화된 데이터 상태 저장: title, content, dueDate 등을 추출하여 저장
        setStructuredMemo({
          title: parsedData.title,
          content: parsedData.content,
          // dueDate 필드가 스키마에 있다면 여기에도 추가
          dueDate: parsedData.dueDate || "N/A",
        });
      } catch (e) {
        console.error("JSON 파싱 실패:", e);
        // JSON 파싱 실패 시, 메모 생성 프로세스를 진행하지 않기 위해 초기화
        setStructuredMemo(null);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "죄송합니다. 메모 분석 중 오류가 발생했습니다.",
          },
        ]);
        return; // 실패 시 여기서 함수 종료
      }

      // 2. LLM에게 포토 카드 텍스트 응답 요청 (사용자 표시용)
      // chat.sendMessage를 사용하여 대화 흐름을 유지하며 포토 카드 텍스트를 요청합니다.
      const textResponse = await chat.sendMessage({
        message: currentPrompt,
        config: config, // 포토 카드 지침이 포함된 config 사용
      });

      const aiText = textResponse.text;

      // 포토 카드 형식의 AI 답변을 메시지 목록에 추가
      setMessages((prev) => [...prev, { role: "ai", content: aiText }]);
    } catch (error) {
      console.error("AI 응답 생성 오류:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "죄송합니다. AI 응답 생성에 실패했습니다." },
      ]);
    }
  }

  // 메모 생성 함수
  const handleCreateMemo = () => {
    if (structuredMemo) {
      // addMemo 유틸리티는 id, createdAt, isCompleted를 자동으로 추가합니다.
      addMemo(structuredMemo);
      alert(
        `메모가 생성되어 로컬 스토리지에 저장되었습니다: ${structuredMemo.title}`
      );
      setStructuredMemo(null); // 임시 메모 초기화
    }
  };

  // 메모 생성 취소 함수
  const handleCancelMemo = () => {
    setStructuredMemo(null);
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "메모 생성을 취소했습니다." },
    ]);
  };

  return (
    <>
      <MessageList messages={messages} />

      {/* 구조화된 데이터 확인 및 생성/취소 버튼 */}
      {structuredMemo && (
        <div className="memo-confirmation">
          <h3>메모를 생성하시겠어요?</h3>
          <p>
            <strong>제목:</strong> {structuredMemo.title}
          </p>
          <p>
            <strong>내용:</strong> {structuredMemo.content}
          </p>
          {structuredMemo.dueDate && structuredMemo.dueDate !== "N/A" && (
            <p>
              <strong>마감일:</strong> {structuredMemo.dueDate}
            </p>
          )}
          <button onClick={handleCreateMemo}>생성</button>
          <button onClick={handleCancelMemo}>취소</button>
        </div>
      )}

      <ChatForm
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </>
  );
}

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
});

// ✅ 메모 생성을 위한 구조화된 데이터 스키마로 수정
// Chat.js에서 이 구조를 파싱하여 로컬 스토리지에 저장합니다.
const responseSchema = {
  type: "object",
  properties: {
    // 제목 필드 추가
    title: {
      type: "string",
      description:
        "사용자의 요청에서 추출하거나 적절히 요약된 메모의 제목을 10~20자 내외로 생성합니다.",
    },
    // 본문 내용은 그대로 유지
    content: {
      type: "string",
      description: "할 일 내용 (본문)",
    },
    // 메모 관련 여부 필드는 삭제하거나 선택적으로 사용합니다. 여기서는 최종 메모 구조에 맞춰 삭제했습니다.
    // dueDate 필드는 그대로 유지하여 메모에 포함될 수 있도록 합니다.
    dueDate: {
      type: "string",
      description: "할 일 마감 기한(YYYY-MM-DD), 없으면 'N/A'로 응답합니다.",
    },
  },
  required: ["title", "content", "dueDate"], // ✅ title을 필수로 추가
  additionalProperties: false,
};

const config = {
  temperature: 0.9,
  maxOutputTokens: 1000,
  stopSequences: "\\n\\n",
  // ✅ 시스템 지침 수정: 포토 카드 형식 텍스트 응답을 명확히 유도합니다.
  systemInstruction: [
    "당신은 전문 업무 및 할 일 관리 분석가입니다.",
    "오로지 업무, 할 일, 메모, 계획 등과 관련된 질문에만 답변해야 합니다.",
    "업무, 할 일 질문이 아니면 `답변 할 수 없습니다` 라고 답변합니다.",
    // LLM이 구조화된 데이터를 생성한 후, 사용자에게는 이 포토 카드 형식의 텍스트 답변을 출력하도록 유도
    "응답할 때는 다음 형식의 포토 카드(텍스트 형식)로 답변합니다. JSON 구조는 메모 저장에 사용됩니다.",
    "--- 메모 포토 카드 ---\n[할 일 유형]\n**제목: [생성된 제목]**\n내용: [생성된 내용]\n마감일: [생성된 마감일]\n우선순위: [분석된 우선순위]\n---------------------",
  ],
};

export { ai, chat, config, responseSchema }; // ✅ responseSchema를 내보냅니다.

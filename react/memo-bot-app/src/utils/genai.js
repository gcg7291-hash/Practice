import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
});

const responseSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "사용자의 요청에서 추출하거나 적절히 요약된 메모의 제목을 10~20자 내외로 생성합니다.",
    },
    content: {
      type: "string",
      description: "할 일 내용 (본문)",
    },

    dueDate: {
      type: "string",
      description: "마감일(YYYY-MM-DD)",
    },
    priority: {
      type: "string",
      enum: ["높음", "중간", "낮음"],
      description: "우선 순위",
    },
    category: {
      type: "string",
      description: "할 일 종류",
    },
    createdAt: {
      type: "string",
      description: "작성일(YYYY-MM-DD)",
    },
    newDay: {
      type: "string",
      enum: ["월", "화", "수", "목", "금", "토", "일"],
      description: "dueDate요일",
    },
    toDay: {
      type: "string",
      enum: ["월", "화", "수,", "목", "금", "토", "일"],
      description: "작성 요일",
    },
  },

  required: [
    "title",
    "content",
    "dueDate",
    "category",
    "createdAt",
    "priority",
    "newDay",
    "toDay",
  ],
  additionalProperties: false,
};

const baseSystemInstruction = [
  "당신은 전문 업무 및 할 일 관리 분석가입니다.",
  "오로지 업무, 할 일, 메모, 계획 등과 관련된 질문에만 답변해야 합니다.",
  "업무, 할 일 질문이 아니면 `답변 할 수 없습니다` 라고 답변합니다.",
];

function config(currentDateString) {
  const systemInstructionWithDate = [
    `오늘 날짜: ${currentDateString}`,
    ...baseSystemInstruction,
  ];

  return {
    temperature: 0.9,
    maxOutputTokens: 1000,
    stopSequences: "\\n\\n",
    systemInstruction: systemInstructionWithDate,
  };
}
export { ai, chat, config, responseSchema };

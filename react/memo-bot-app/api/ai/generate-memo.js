// 📁 api/ai/generate-memo.js

import { GoogleGenAI } from "@google/genai";

// 🚨 Vercel 환경 변수에서 가져옵니다. Vercel 대시보드에 GEMINI_API_KEY를 등록해야 합니다.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

// ==========================================================
// ⭐️ AI 설정 및 스키마
// ==========================================================

const responseSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "사용자의 요청에서 추출하거나 적절히 요약된 메모의 제목을 10~20자 내외로 생성합니다. 업무 관련 질문이 아닐 경우 '답변 불가'를 채웁니다.",
    },
    content: {
      type: "string",
      description:
        "할 일 내용 (본문). 업무 관련 질문이 아닐 경우 '업무 관련 질문이 아닙니다'를 채웁니다.",
    },
    dueDate: {
      type: "string",
      description: "마감일 (YYYY-MM-DD 형식으로, 없으면 오늘의 날짜)",
    },
    priority: {
      type: "string",
      enum: ["높음", "중간", "낮음"],
      description: "우선 순위",
    },
    category: {
      type: "string",
      description:
        "할 일 종류 (예: 업무, 개인, 쇼핑, 학습 등). 업무 관련 질문이 아닐 경우 '답변 불가'를 채웁니다.",
    },
    createdAt: {
      type: "string",
      description: "작성일 (YYYY-MM-DD)",
    },
    newDay: {
      type: "string",
      enum: ["월", "화", "수", "목", "금", "토", "일"],
      description: "dueDate에 해당하는 요일",
    },
    toDay: {
      type: "string",
      enum: ["월", "화", "수", "목", "금", "토", "일"],
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
  // ⭐️ 핵심 지침: 업무 관련 질문이 아닐 때 응답을 강제합니다.
  "사용자 입력이 업무, 할 일, 메모, 계획과 관련이 없다면, title 필드에 '답변 불가'를, content 필드에 '업무 관련 질문이 아닙니다'를 채우고, category 필드에도 '답변 불가'를 채워서 유효한 JSON 객체만 반환해야 합니다. 다른 필수 필드는 임의의 기본값으로 채웁니다.",
];

function getConfig(currentDateString) {
  const systemInstructionWithDate = [
    `오늘 날짜: ${currentDateString}`,
    ...baseSystemInstruction,
  ].join(" ");

  return {
    temperature: 0.5,
    maxOutputTokens: 1000,
    systemInstruction: systemInstructionWithDate,
    responseMimeType: "application/json",
    responseSchema: responseSchema,
  };
}

// ==========================================================
// ⭐️ Vercel 서버리스 handler 함수
// ==========================================================

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!ai) {
    console.error("GEMINI_API_KEY is not set.");
    return res
      .status(500)
      .json({ error: "서버 설정 오류: AI API 키가 설정되지 않았습니다." });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ error: "Message is required in request body." });
    }

    const todayDate = new Date();
    const todayDateString = todayDate.toISOString().slice(0, 10);

    const modelConfig = getConfig(todayDateString);
    const prompt = `사용자의 요청을 분석하여 유효한 JSON 객체를 반환하세요: "${message}"`;

    const structuredResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: modelConfig,
    });

    const jsonText = structuredResponse.text.trim();
    const parsedData = JSON.parse(jsonText);

    // ⭐️ AI 응답 텍스트 결정 로직: 답변 불가 시 다른 메시지를 출력합니다.
    let aiResponseText;
    if (
      parsedData.title === "답변 불가" &&
      parsedData.content === "업무 관련 질문이 아닙니다"
    ) {
      aiResponseText = "죄송합니다. 업무 관련 질문이 아닙니다.";
    }

    return res.status(200).json({
      structuredMemo: parsedData,
      aiText: aiResponseText, // 수정된 메시지 사용
    });
  } catch (error) {
    console.error("서버 에러 발생:", error.message);
    if (error instanceof SyntaxError) {
      return res.status(500).json({
        error:
          "AI 응답 파싱 실패: 모델이 유효한 JSON을 반환하지 않았습니다. 프롬프트 내용을 조정해 주세요.",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "서버 내부 오류: AI API 통신 오류 발생",
      details: error.message,
    });
  }
}

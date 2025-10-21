// 📁 api/ai/generate-memo.js

import { GoogleGenAI } from "@google/genai";
// ⭐️ responseSchema는 프론트엔드 코드에 정의되어 있다고 가정하고,
// 여기서는 프롬프트에 JSON 출력을 요청하는 것으로 처리합니다.
// 실제로는 Schema를 서버리스 함수로 옮겨와 사용하는 것이 더 안전합니다.

// Vercel 환경 변수는 VITE_ 접두사 없이 설정해야 합니다.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let ai;
let chat;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  // Chat 인스턴스는 한 번만 초기화하는 것이 좋습니다.
  chat = ai.chats.create({
    model: "gemini-2.5-flash",
  });
}

// Vercel 서버리스 handler 함수
export default async function handler(req, res) {
  // 1. 서버 및 메서드 유효성 검사
  if (!ai) {
    // API 키가 없는 경우 500 에러 즉시 반환
    console.error("GEMINI_API_KEY is not set.");
    return res.status(500).json({ error: "서버 설정 오류: AI API 키가 설정되지 않았습니다." });
  }
  
  if (req.method !== 'POST') {
    // POST 요청만 허용
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message, responseSchema } = req.body; // 클라이언트가 보낸 데이터와 스키마 (옵션)
    
    if (!message) {
      return res.status(400).json({ error: "Message is required in request body." });
    }

    // 2. 구조화된 데이터 추출 (generateContent 사용)
    const today = new Date().toISOString().slice(0, 10);
    const contentsWithDate = `오늘 날짜는 ${today}입니다. 이 정보를 바탕으로 메모의 제목, 내용, 그리고 작성 날짜(toDay)와 마감 날짜(dueDate)를 JSON 형식으로 추출해 주세요: "${message}"`;
    
    const structuredResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contentsWithDate,
      config: {
        responseMimeType: "application/json",
        // ⭐️ 실제로는 responseSchema를 클라이언트에서 받아와야 합니다. 
        // 여기서는 구조화된 JSON 응답을 얻기 위해 프롬프트로만 요청합니다.
        // responseSchema: responseSchema // 만약 스키마가 있다면 주석 해제
      },
    });

    const jsonText = structuredResponse.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // 3. 일반 대화 응답 생성 (sendMessage 사용)
    // ⭐️ (선택 사항) 일반 응답을 함께 제공할 필요가 없다면 이 부분을 삭제해도 됩니다.
    // 현재 프론트엔드 코드의 로직에 맞춰 두 응답을 모두 받아 클라이언트에게 반환합니다.
    const textResponse = await chat.sendMessage({
      message: message,
    });
    const aiText = textResponse.text;

    // 4. 구조화된 데이터와 일반 텍스트 응답을 묶어서 반환
    return res.status(200).json({
      structuredMemo: parsedData,
      aiText: aiText
    });
    
  } catch (error) {
    console.error("서버 에러 발생:", error.message);
    // JSON 파싱 에러, AI API 통신 에러 등 모든 서버 측 에러 처리
    return res.status(500).json({ 
      error: "서버 내부 오류: AI 응답 생성 또는 파싱 실패",
      details: error.message 
    });
  }
}
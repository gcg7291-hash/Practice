import { GoogleGenAI } from "@google/genai";

// Vercel 서버리스 handler 함수
export default async function handler(req, res) {
  // Vercel 환경 변수 GEMINI_API_KEY 사용 (VITE 접두사 없음)
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  // ⭐️ Vercel 서버리스 함수 내에서 AI 인스턴스 생성
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
  // ⭐️ 채팅 인스턴스 생성
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
  });
  
  try {
    // ⭐️ POST 요청의 body에서 message를 가져옴
    const { message } = req.body;

    if (!message) {
      // 400 Bad Request
      return res.status(400).json({ error: "Message is required in request body." });
    }

    // ⭐️ AI API 요청: chat.sendMessage 호출
    const response = await chat.sendMessage({
      message: message, // 클라이언트에서 보낸 프롬프트(JSON 추출 요청 포함)
    });
    
    // ⭐️ 응답 텍스트를 JSON으로 파싱
    // (클라이언트 측 요청에 따라, AI 응답이 JSON 문자열이라고 가정)
    const parsedData = JSON.parse(response.text);

    // ⭐️ 성공적으로 파싱된 데이터를 200 응답과 함께 반환
    return res.status(200).json(parsedData);
  } catch (error) {
    console.error("에러 발생:", error);
    // ⭐️ 오류 발생 시 500 Internal Server Error 반환
    return res.status(500).json({ error: "서버 에러가 발생했습니다. AI 응답을 확인하세요." });
  }
}
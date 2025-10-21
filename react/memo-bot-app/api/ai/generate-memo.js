import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let ai;
let chat;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  chat = ai.chats.create({
    model: "gemini-2.5-flash",
  });
} else {
    console.error("GEMINI_API_KEY is not set.");
}

// Vercel 서버리스 handler 함수
export default async function handler(req, res) {
  // ⭐️ 1. CORS 헤더 설정 추가 (403 Forbidden 에러 방지)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!ai || !chat) {
    return res.status(500).json({ error: "서버 설정 오류: AI API 키가 설정되지 않았습니다." });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required in request body." });
    }
    
    const response = await chat.sendMessage({
      message: message,
    });
    
    
    const parsedData = JSON.parse(response.text);

    // ⭐️ 3. 클라이언트(Memo.jsx)의 기대에 맞춰 응답 구조 변경
    // 구조화된 데이터와 일반 텍스트를 모두 포함하여 반환합니다.
    return res.status(200).json({
      // 클라이언트에서 structuredMemo: parsedData로 받기 위해 키 이름을 맞춤
      structuredMemo: parsedData, 
      // 클라이언트에서 aiText로 받기 위해 임의의 텍스트를 생성합니다.
      // (실제로는 AI 응답 텍스트를 따로 추출해야 하지만, 여기서는 임시로 구조화된 제목을 사용합니다.)
      aiText: `말씀하신 내용에서 메모 정보를 추출했습니다. 저장하시겠어요? (제목: ${parsedData.title})` 
    });
    
  } catch (error) {
    console.error("에러 발생:", error);
    
    return res.status(500).json({ 
      error: "서버 내부 오류: AI 응답 파싱 실패 또는 API 통신 오류",
      details: error.message
    });
  }
}
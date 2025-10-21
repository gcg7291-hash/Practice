import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Chat 인스턴스는 제거하고, 상태가 없는 ai 인스턴스만 준비합니다.
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

// Vercel 서버리스 handler 함수
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } // API 키 유효성 검사

  if (!ai) {
    console.error("GEMINI_API_KEY is not set in Vercel environment variables.");
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
    } // ⭐️ generateContent를 사용하여 JSON 출력을 강제
    const today = new Date().toISOString().slice(0, 10);
    const prompt = `오늘 날짜는 ${today}입니다. 이 정보를 바탕으로 메모의 제목(title), 내용(content), 작성 날짜(toDay), 마감 날짜(dueDate, YYYY-MM-DD 형식), 중요도(priority, 1-5), 카테고리(category)를 포함하는 유효한 JSON 객체를 반환해주세요: "${message}"`;
    const structuredResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const jsonText = structuredResponse.text.trim();
    const parsedData = JSON.parse(jsonText); // 클라이언트가 기대하는 응답 구조 (구조화된 데이터 + 일반 텍스트)

    return res.status(200).json({
      structuredMemo: parsedData,
      aiText: `AI가 메모 정보를 추출했습니다. 저장하시겠어요? (제목: ${parsedData.title})`,
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

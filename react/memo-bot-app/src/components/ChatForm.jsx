// ChatForm.jsx (새로 만들거나 기존 파일을 수정하세요)

import React from "react";

export default function ChatForm({ prompt, setPrompt, isLoading, onSubmit }) {
  return (
    // ⭐️ form 컨테이너에 flex를 적용하여 요소들을 가로로 배치합니다.
    <form onSubmit={onSubmit} className="flex items-end gap-2">
      
      {/* ⭐️ 텍스트 입력 영역: flex-1로 남은 공간을 모두 차지하도록 함 */}
      <div className="flex-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={isLoading ? "AI가 메모를 생성 중입니다..." : "메시지를 입력하세요..."}
          disabled={isLoading}
          rows={1}
          // ⭐️ 모바일 최적화를 위해 min-h-0, p-2, text-sm 적용
          className="w-full resize-none bg-gray-600 text-gray-100 p-2 text-sm rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 min-h-[40px] leading-snug"
          style={{ height: 'auto', maxHeight: '100px', overflowY: 'auto' }} // CSS를 더 유연하게 조정
        />
      </div>

      {/* ⭐️ 전송 버튼: shrink-0으로 절대 줄어들지 않도록 보호 */}
      <button
        type="submit"
        disabled={isLoading || prompt.trim() === ""}
        // ⭐️ 모바일 최적화를 위해 p-2, text-sm, w-fit으로 버튼 크기 최소화
        className={`shrink-0 h-10 w-fit px-3 py-2 text-sm font-semibold rounded-lg transition duration-200 whitespace-nowrap
          ${isLoading || prompt.trim() === ""
            ? "bg-gray-500 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/50 transform hover:scale-[1.03]"
          }`}
      >
        전송
      </button>
    </form>
  );
}
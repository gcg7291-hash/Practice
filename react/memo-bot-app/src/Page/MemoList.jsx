import React, { useState, useEffect } from "react";
import { getMemos, saveMemos } from "../utils/memoStorage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const FILTER_ALL = "ALL";
const FILTER_PENDING = "PENDING";
const FILTER_COMPLETED = "COMPLETED";

export default function MemoList() {
  const [memos, setMemos] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL);
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const loadedMemos = getMemos() || [];
    setMemos(loadedMemos);
  }, []);

  const toggleCompletion = (id) => {
    const updatedMemos = memos.map((memo) =>
      memo.id === id ? { ...memo, isCompleted: !memo.isCompleted } : memo
    );
    setMemos(updatedMemos);
    saveMemos(updatedMemos);
  };

  const deleteMemo = (id) => {
    // ⭐️ 삭제 전에 사용자에게 확인 메시지 표시 (UX 개선)
    if (!window.confirm("정말로 이 메모를 삭제하시겠습니까?")) {
      return;
    }
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
    saveMemos(updatedMemos);
  };

  const filteredMemos = memos.filter((memo) => {
    if (filter === FILTER_PENDING) {
      return !memo.isCompleted;
    }
    if (filter === FILTER_COMPLETED) {
      return memo.isCompleted;
    }
    return true;
  });

  // 현재 활성화된 필터 버튼의 스타일
  const activeFilterClass =
    "bg-blue-600 text-white shadow-lg shadow-blue-500/50 hover:bg-blue-700";
  // 비활성화된 필터 버튼의 스타일
  const defaultFilterClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  // ⭐️ 중요도(Priority)에 따른 색상 정의 함수
  const getPriorityColor = (priority) => {
    if (!priority) return "text-gray-400";
    switch (priority.toLowerCase()) {
      case "높음":
      case "high":
        return "text-red-400 font-bold";
      case "중간":
      case "medium":
        return "text-yellow-400 font-bold";
      case "낮음":
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    // ⭐️ 전체 컨테이너: 다크 배경, 반응형 패딩
    <div className="w-full flex-grow p-4 md:p-8 text-gray-100 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-6 border-b-2 border-gray-700 pb-3">
          📝 메모 목록
        </h1>

        {/* ⭐️ 필터 버튼 그룹: 모바일에서 랩핑되도록 flex-wrap 추가 */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter(FILTER_ALL)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-200 text-sm ${
              filter === FILTER_ALL ? activeFilterClass : defaultFilterClass
            }`}
          >
            전체 ({memos.length})
          </button>
          <button
            onClick={() => setFilter(FILTER_PENDING)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-200 text-sm ${
              filter === FILTER_PENDING ? activeFilterClass : defaultFilterClass
            }`}
          >
            미완료 ({memos.filter((m) => !m.isCompleted).length})
          </button>
          <button
            onClick={() => setFilter(FILTER_COMPLETED)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-200 text-sm ${
              filter === FILTER_COMPLETED
                ? activeFilterClass
                : defaultFilterClass
            }`}
          >
            완료 ({memos.filter((m) => m.isCompleted).length})
          </button>
        </div>

        {/* ⭐️ 메모 아이템 목록 */}
        <ul className="space-y-4">
          {filteredMemos.map((memo) => (
            <li
              key={memo.id}
              className={`p-5 rounded-xl shadow-xl transition duration-300 border border-gray-700 bg-gray-800 hover:scale-[1.005]
    ${
      memo.isCompleted
        ? "border-l-8 border-green-600 opacity-80 hover:opacity-100" // 완료: 좌측 선색상만 지정
        : "border-l-8 border-blue-600 hover:shadow-blue-500/20" // 미완료: 좌측 선색상만 지정
    }`}
            >
              <h3
                className={`text-lg sm:text-xl font-bold mb-1 ${
                  memo.isCompleted
                    ? "text-gray-400 line-through"
                    : "text-blue-300"
                }`}
              >
                {memo.title}
              </h3>
              <p
                className={`text-gray-300 text-sm mb-3 ${
                  memo.isCompleted ? "line-through" : ""
                }`}
              >
                {memo.content}
              </p>

              {/* ⭐️ 추가 정보 섹션: 반응형 그리드 사용 */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4 border-t border-gray-700 pt-3">
                <p>
                  <strong className="font-semibold text-gray-300">
                    마감일:{" "}
                  </strong>
                  <span className="ml-1">{memo.dueDate}</span>
                </p>
                <p>
                  <strong className="font-semibold text-gray-300">
                    중요도:{" "}
                  </strong>
                  <span className={`ml-1 ${getPriorityColor(memo.priority)}`}>
                    {memo.priority}
                  </span>
                </p>
                <p className="col-span-2">
                  <strong className="font-semibold text-gray-300">
                    카테고리:{" "}
                  </strong>
                  <span className="ml-1">{memo.category}</span>
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                생성일: {new Date(memo.createdAt).toLocaleDateString()}
              </p>

              {/* ⭐️ 버튼 그룹: 스타일 통일성 유지 */}
              <div className="flex space-x-3 mt-4 border-t border-gray-700 pt-3">
                <button
                  onClick={() => toggleCompletion(memo.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 shadow-md
                    ${
                      memo.isCompleted
                        ? "bg-yellow-600 text-white hover:bg-yellow-500"
                        : "bg-green-600 text-white hover:bg-green-500"
                    }`}
                >
                  {memo.isCompleted ? "🔁 미완료로 변경" : "✅ 완료로 변경"}
                </button>
                <button
                  onClick={() => deleteMemo(memo.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-500 transition duration-200 shadow-md"
                >
                  🗑️ 삭제
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* ⭐️ 메모가 없을 때 메시지 */}
        {filteredMemos.length === 0 && (
          <div className="text-center text-lg text-gray-500 mt-12 p-6 border border-gray-700 rounded-xl bg-gray-800/50">
            {filter === FILTER_ALL &&
              "현재 저장된 메모가 없습니다. AI 메모를 만들어보세요!"}
            {filter === FILTER_PENDING &&
              "미완료된 메모가 없습니다. 할 일을 시작해보세요!"}
            {filter === FILTER_COMPLETED &&
              "아직 완료된 메모가 없습니다. 할 일을 끝내봅시다!"}
          </div>
        )}
      </div>
    </div>
  );
}

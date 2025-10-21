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
  }, [token]);

  useEffect(() => {
    // 메모를 가져올 때, localStorage가 아닌 메모리 배열에 저장된 경우를 대비해 기본값 설정
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
    "bg-blue-600 text-white shadow-lg shadow-blue-500/50";
  // 비활성화된 필터 버튼의 스타일
  const defaultFilterClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    // ⭐️ 전체 컨테이너: 패딩 추가 및 다크 모드 텍스트 색상
    <div className="w-full h-full p-4 md:p-6 text-gray-100">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">
        메모 목록
      </h1>

      {/* ⭐️ 필터 버튼 그룹 */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setFilter(FILTER_ALL)}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            filter === FILTER_ALL ? activeFilterClass : defaultFilterClass
          }`}
        >
          전체 ({memos.length})
        </button>
        <button
          onClick={() => setFilter(FILTER_PENDING)}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            filter === FILTER_PENDING ? activeFilterClass : defaultFilterClass
          }`}
        >
          미완료 ({memos.filter((m) => !m.isCompleted).length})
        </button>
        <button
          onClick={() => setFilter(FILTER_COMPLETED)}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            filter === FILTER_COMPLETED ? activeFilterClass : defaultFilterClass
          }`}
        >
          완료 ({memos.filter((m) => m.isCompleted).length})
        </button>
      </div>

      {/* ⭐️ 메모 아이템 목록 */}
      <ul className="space-y-4">
        {filteredMemos.map((memo) => (
          // ⭐️ 메모 항목: 배경색, 그림자, 패딩 설정
          <li
            key={memo.id}
            className={`p-5 rounded-xl shadow-lg transition duration-300 transform 
              ${
                memo.isCompleted
                  ? "bg-gray-800 border-l-4 border-green-500 opacity-70 hover:opacity-100" // 완료: 어두운 배경, 연한 녹색(완료색) 줄
                  : "bg-gray-800 border-l-4 border-blue-500 hover:shadow-xl" // 미완료: 어두운 배경, 파란색(강조색) 줄
              }`}
          >
            <h3
              className={`text-xl font-semibold mb-1 ${
                memo.isCompleted
                  ? "text-gray-400 line-through"
                  : "text-blue-300"
              }`}
            >
              {memo.title}
            </h3>
            <p
              className={`text-gray-300 mb-2 ${
                memo.isCompleted ? "line-through" : ""
              }`}
            >
              {memo.content}
            </p>
            <p className="text-sm text-gray-400 mb-3">
              <strong className="font-medium">마감일:</strong> {memo.dueDate}
            </p>
            <p className="text-xs text-gray-500">
              생성일: {new Date(memo.createdAt).toLocaleDateString()}
            </p>

            {/* ⭐️ 버튼 그룹 */}
            <div className="flex space-x-3 mt-4 border-t border-gray-700 pt-3">
              <button
                onClick={() => toggleCompletion(memo.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 
                  ${
                    memo.isCompleted
                      ? "bg-yellow-600 text-white hover:bg-yellow-500" // 완료 상태: 노란색(주의) 버튼
                      : "bg-green-600 text-white hover:bg-green-500" // 미완료 상태: 녹색(완료) 버튼
                  }`}
              >
                {memo.isCompleted ? "미완료로 변경" : "완료로 변경"}
              </button>
              <button
                onClick={() => deleteMemo(memo.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-500 transition duration-200"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ⭐️ 메모가 없을 때 메시지 */}
      {filteredMemos.length === 0 && (
        <p className="text-center text-lg text-gray-500 mt-10 p-4 border border-gray-700 rounded-lg">
          {filter === FILTER_ALL && "현재 저장된 메모가 없습니다."}
          {filter === FILTER_PENDING &&
            "미완료된 메모가 없습니다. 할 일을 시작해보세요!"}
          {filter === FILTER_COMPLETED && "아직 완료된 메모가 없습니다."}
        </p>
      )}
    </div>
  );
}

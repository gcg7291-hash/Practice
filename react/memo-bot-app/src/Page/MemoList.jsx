import React, { useState, useEffect } from "react";
import { getMemos, saveMemos } from "../utils/memoStorage"; // ✅ 추가

// 필터링 상태 정의
const FILTER_ALL = "ALL";
const FILTER_PENDING = "PENDING";
const FILTER_COMPLETED = "COMPLETED";

export default function MemoList() {
  // 로컬 스토리지에서 불러온 전체 메모 목록 상태
  const [memos, setMemos] = useState([]); // ✅ 수정
  // 현재 선택된 필터 상태
  const [filter, setFilter] = useState(FILTER_ALL); // ✅ 추가

  // 컴포넌트 마운트 시 로컬 스토리지에서 메모를 불러옵니다.
  useEffect(() => {
    setMemos(getMemos());
  }, []); // ✅ 추가

  // 메모 완료/미완료 상태 변경
  const toggleCompletion = (id) => {
    // ✅ 추가
    const updatedMemos = memos.map((memo) =>
      memo.id === id ? { ...memo, isCompleted: !memo.isCompleted } : memo
    );
    setMemos(updatedMemos);
    saveMemos(updatedMemos); // 로컬 스토리지에 저장
  };

  // 메모 삭제
  const deleteMemo = (id) => {
    // ✅ 추가
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
    saveMemos(updatedMemos); // 로컬 스토리지에 저장
  };

  // 현재 필터 상태에 따른 메모 목록 계산
  const filteredMemos = memos.filter((memo) => {
    // ✅ 추가
    if (filter === FILTER_PENDING) {
      return !memo.isCompleted; // 미완료
    }
    if (filter === FILTER_COMPLETED) {
      return memo.isCompleted; // 완료
    }
    return true; // 전체
  });

  // 기존 코드는 그대로 둡니다.
  const storedMemo = localStorage.getItem("memo"); // 예시 코드 (실제 저장된 메모는 아님)
  const parsedMemo = storedMemo ? JSON.parse(storedMemo) : null;
  console.log("로컬 스토리지 예시 메모:", parsedMemo);
  // 실제 사용은 'memos' 상태를 사용합니다.

  return (
    <div className="memo-list-container">
      <h1>메모 목록</h1>

      {/* 필터링 버튼 */}
      <div className="filter-buttons">
        <button onClick={() => setFilter(FILTER_ALL)}>
          전체 ({memos.length})
        </button>
        <button onClick={() => setFilter(FILTER_PENDING)}>
          미완료 ({memos.filter((m) => !m.isCompleted).length})
        </button>
        <button onClick={() => setFilter(FILTER_COMPLETED)}>
          완료 ({memos.filter((m) => m.isCompleted).length})
        </button>
      </div>

      {/* 메모 목록 표시 */}
      <ul className="memo-items">
        {filteredMemos.map((memo) => (
          <li
            key={memo.id}
            className={`memo-item ${memo.isCompleted ? "completed" : ""}`}
          >
            <h3>{memo.title}</h3>
            <p>{memo.content}</p>
            <p className="date">
              생성일: {new Date(memo.createdAt).toLocaleDateString()}
            </p>

            <div>
              <button onClick={() => toggleCompletion(memo.id)}>
                {memo.isCompleted ? "미완료로 변경" : "완료로 변경"}
              </button>
              <button onClick={() => deleteMemo(memo.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>

      {filteredMemos.length === 0 && <p>표시할 메모가 없습니다.</p>}
    </div>
  );
}

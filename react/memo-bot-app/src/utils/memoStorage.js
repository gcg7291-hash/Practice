
/**
 * 로컬 스토리지에서 모든 메모 목록을 가져옵니다.
 * @returns {Array} 메모 객체 배열
 */
export const getMemos = () => {
  const storedMemos = localStorage.getItem("memos");
  return storedMemos ? JSON.parse(storedMemos) : [];
};

/**
 * 새로운 메모 목록을 로컬 스토리지에 저장합니다.
 * @param {Array} memos - 저장할 메모 객체 배열
 */
export const saveMemos = (memos) => {
  localStorage.setItem("memos", JSON.stringify(memos));
};

/**
 * 새로운 메모를 추가합니다.
 * @param {object} newMemo - 추가할 새로운 메모 객체 (id, title, content, createdAt, isCompleted 포함)
 */
export const addMemo = (newMemo) => {
  const memos = getMemos();
  // 새로운 ID를 할당합니다 (가장 큰 ID + 1)
  const newId = memos.length > 0 ? Math.max(...memos.map(m => m.id)) + 1 : 1;
  
  const memoWithId = {
    ...newMemo,
    id: newId,
    createdAt: new Date().toISOString(), // 현재 시간을 ISO 문자열로 저장
    isCompleted: false, // 기본값은 미완료
  };
  
  saveMemos([...memos, memoWithId]);
  return memoWithId;
};

// --- 메모 객체 예시 (참고) ---
// {
//   id: 1,
//   title: "제목",
//   content: "내용",
//   createdAt: "2025-01-01T00:00:00.000Z",
//   isCompleted: false
// }
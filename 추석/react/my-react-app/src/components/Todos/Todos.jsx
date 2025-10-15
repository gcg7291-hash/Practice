import { useMemo, useState, useEffect } from "react";

// Local Storage 키
const STORAGE_KEY = "react-todo-list";

// Local Storage에서 데이터 로드
const loadTodos = () => {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Local Storage 로드 오류:", error);
    return [];
  }
};

// Local Storage에 데이터 저장
const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Local Storage 저장 오류:", error);
  }
};

const FilterType = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export default function TodoList() {
  // 1. 상태 정의
  const [todos, setTodos] = useState(loadTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState("Low");
  const [newTodoColor, setNewTodoColor] = useState("#000000"); // 색상 입력 필드 상태
  const [filter, setFilter] = useState(FilterType.ALL);

  // 2. Local Storage 동기화 (todos 상태 변경 시 저장)
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // --- 기본 기능 구현 ---

  // 할 일 추가 핸들러
  const addTodo = (e) => {
    e.preventDefault();

    if (newTodoText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: newTodoText.trim(),
      priority: newTodoPriority,
      isCompleted: false, // 완료 여부 기본값
      color: newTodoColor,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
  };

  // 할 일 완료 상태 토글 핸들러
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // 할 일 삭제 핸들러
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // --- 필터 기능 및 useMemo 적용 ---

  /**
   * useMemo 훅: todos나 filter 상태가 변경될 때만 필터링 재계산
   */
  const filteredTodos = useMemo(() => {
    console.log("🔥 useMemo: 할 일 목록 필터링 재계산");
    switch (filter) {
      case FilterType.ACTIVE:
        return todos.filter((todo) => !todo.isCompleted);
      case FilterType.COMPLETED:
        return todos.filter((todo) => todo.isCompleted);
      case FilterType.ALL:
      default:
        return todos;
    }
  }, [todos, filter]);

  // --- 렌더링 ---
  return (
    <div>
      <h1>나의 할 일 목록</h1>

      {/* 할 일 추가 폼 */}
      <form onSubmit={addTodo}>
        <h2>새 할 일 추가</h2>
        <input
          type="text"
          placeholder="할 일 내용"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          required
        />
        <select
          value={newTodoPriority}
          onChange={(e) => setNewTodoPriority(e.target.value)}
        >
          <option value="Low">낮음 (Low)</option>
          <option value="Medium">중간 (Medium)</option>
          <option value="High">높음 (High)</option>
        </select>
        <label>
          테두리 색상:
          <input
            type="color"
            value={newTodoColor}
            onChange={(e) => setNewTodoColor(e.target.value)}
          />
        </label>
        <button type="submit">할 일 추가</button>
      </form>

      {/* 필터 버튼 */}
      <div>
        <button onClick={() => setFilter(FilterType.ALL)}>전체 보기</button>
        <button onClick={() => setFilter(FilterType.ACTIVE)}>미 완료</button>
        <button onClick={() => setFilter(FilterType.COMPLETED)}>완료</button>
      </div>

      {/* 할 일 목록 표시 */}
      <div>
        {filteredTodos.length === 0 ? (
          <p>할 일이 없습니다. (현재 필터 상태: {filter})</p>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} style={{ borderLeft: `5px solid ${todo.color}` }}>
              <div>
                <span
                  style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
                >
                  {todo.text}
                </span>
                <span> (우선순위: {todo.priority})</span>
              </div>
              <div>
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.isCompleted ? "미완료" : "완료"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
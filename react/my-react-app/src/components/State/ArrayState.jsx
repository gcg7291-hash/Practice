// components/State/ArrayState.jsx
import { useState } from "react";

export default function ArrayState() {
  const [todos, setTodos] = useState([]);
  function addTodo() {
    console.log("할 일 추가");
    // 상태 업데이트 로직
    const newId = todos["length"] + 1;
    const newTOdo = { id: newId, text: `할 일 ${newId} ` };
    setTodos({ ...todos, newTOdo });
  }

  function removeTodo() {
    console.log("마지막 할 일 제거");
    // 상태 업데이트 로직
    if (todos.length > 0) {
      const newTodos = todos.slice(0, -1);
      setTodos(newTodos);
    } else {
      console.log("제거할 할 일이 없습니다.");
    }
  }

  function clearTodos() {
    console.log("모든 할 일 제거");
    // 상태 업데이트 로직
    setTodos([]);
  }

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">배열 상태 관리</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">할 일 목록:</h3>
        <ul className="list-disc list-inside">
          <li>할 일이 없습니다</li>
        </ul>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTodo}
        >
          할 일 추가
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={removeTodo}
        >
          마지막 할 일 제거
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={clearTodos}
        >
          모든 할 일 제거
        </button>
      </div>
    </div>
  );
}

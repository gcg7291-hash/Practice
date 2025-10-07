import { useMemo, useState } from "react";

export default function Component() {
  const [count, setCount] = useState(1);
  const [temp, setTemp] = useState(false);

  // 일반 함수
  // temp 상태가 변경될 때에도 함수가 실행된다
  const value = () => {
    console.log("value 함수 실행");
    return count * 2;
  };

  // useMemo 훅
  // temp 상태가 변경돼도 함수가 실행되지 않는다
  // 오로지 count 상태가 변경될 때마다 함수가 실행된다
  const memoizedValue = useMemo(() => {
    console.log("memoizedValue 함수 실행");
    return count * 2;
  }, [count]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <p>{value()}</p>
      <p>{memoizedValue}</p>
      <div>
        <button
          className="bg-blue-500 text-white cursor-pointer p-2"
          onClick={() => setTemp(!temp)}
        >
          temp 상태 변경
        </button>
        <button
          className="bg-blue-500 text-white cursor-pointer ml-4 p-2"
          onClick={() => setCount(count + 1)}
        >
          count 상태 변경
        </button>
      </div>
    </div>
  );
}

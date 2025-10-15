// 전역 상태 step 변경 로직을 위한 코드
// ...
import { setStep } from "../store/counterSlice";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
export default function StepSet() {
  // 전역 상태 step 변경 로직을 위한 코드
  // ...
  const dispatch = useDispatch();
  const step = useSelector((state) => state.counter.step);
  function handleSetStep(step) {
    // 전역 상태 step 변경 로직
    // ...
    dispatch(setStep(step));
  }

  return (
    <div>
      <div className="mb-4">
        <div>현재 단위: {step}</div>
      </div>
      <div className="flex gap-2">
        <button
          className="border-2 p-2 cursor-pointer"
          onClick={() => handleSetStep(1)}
        >
          단위 1
        </button>
        <button
          className="border-2 p-2 cursor-pointer"
          onClick={() => handleSetStep(5)}
        >
          단위 5
        </button>
        <button
          className="border-2 p-2 cursor-pointer"
          onClick={() => handleSetStep(10)}
        >
          단위 10
        </button>
      </div>
    </div>
  );
}

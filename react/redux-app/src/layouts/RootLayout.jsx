import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <div className="flex border-2 border-gray-300 gap-2 p-4">
        <Link to="/count-increment">카운터 증가</Link>
        <Link to="/count-decrement">카운터 감소</Link>
        <Link to="/count-view">카운터 조회</Link>
        <Link to="/step-set">단위 설정</Link>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

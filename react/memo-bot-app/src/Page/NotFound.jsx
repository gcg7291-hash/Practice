import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      페이지를 찾을 수 없습니다. 404 Error
      <Link className="border-2 p-1" to="/">
        홈페이지로 돌아가기
      </Link>
    </div>
  );
}

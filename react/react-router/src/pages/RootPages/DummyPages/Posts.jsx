import React from "react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        onClick={() => {
          alert("포스트로 이동합니다");
          navigate("/PostsList");
        }}
      >

      </h1>
    </div>
  );
}

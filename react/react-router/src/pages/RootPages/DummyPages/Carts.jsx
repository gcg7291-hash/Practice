import React from "react";
import { useNavigate } from "react-router-dom";

export default function Carts() {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        onClick={() => {
          alert("carts 로 이동합니다");
          navigate("/CartsList");
        }}
      ></h1>
    </div>
  );
}

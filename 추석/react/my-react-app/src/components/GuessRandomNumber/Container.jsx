import React from "react";
import Form from "./Form";
import RandomNumber from "./RandomNumber";
import { useEffect, useState } from "react";

export default function Container() {
  const [randomNumbe, setRandomNumber] = useState(0);
  const [tryN, setTryN] = useState(0);
  const [message, setMessage] = useState["1부터 100 사이의 숫자를 입력하세요"];
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const newRandom = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandom);
  }, []);
    
  return <div>Container</div>;
}

import React from "react";
import StringState from "./components/State/StringState";
import NumberState from "./components/State/NumberState";
import ObjectState from "./components/State/ObjectState";
import ArrayState from "./components/State/ArrayState";
import Counter from "./components/Counter/Counter";
import Calculator from "./components/Calculator/Calcuator";
import QuoteContainer from "./components/DummyJSON/QuoteContainer";
import Form from "./components/signup/Form";
export default function App() {
  return (
    <div>
      <StringState></StringState>
      <NumberState></NumberState>
      <ObjectState></ObjectState>
      <ArrayState></ArrayState>
      <Counter></Counter>
      <Calculator></Calculator>
      <QuoteContainer></QuoteContainer>
      <Form></Form>
    </div>
  );
}

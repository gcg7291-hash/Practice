import React from "react";
import ListContainer from "./components/PropsList/ListContainer";
import Todos from "./components/Todos/Todos";
import Quotes from "./components/DummyJSON/Quotes";
export default function () {
  return (
    <div>
      <ListContainer></ListContainer>
      <Quotes></Quotes>
      <Todos></Todos>
    </div>
  );
}

import React from "react";
import ListItem from "./ListItem";

export default function ListContainer() {
  const list = [
    { id: 1, name: "1번 아이템" },
    { id: 2, name: "2번 아이템" },
    { id: 3, name: "3번 아이템" },
    { id: 4, name: "4번 아이템" },
    { id: 5, name: "5번 아이템" },
  ];

  const handleClick = (e) => {
    alert(`${e}`);
  };

  return (
    <div>
      {list.map((lists) => {
        return (
          <ListItem
            key={lists.id}
            list={lists}
            onClick={(listName) => {
              handleClick(listName);
            }}
          ></ListItem>
        );
      })}
    </div>
  );
}

import React from "react";

export default function ListItem({ list, onClick }) {
  return (
    <div>
      <p>
        No.{list["id"]} {list["name"]}{" "}
        <button
          onClick={() => onClick(list.name)}
          className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-700 transition duration-300"
        >
          클릭
        </button>
      </p>
    </div>
  );
}

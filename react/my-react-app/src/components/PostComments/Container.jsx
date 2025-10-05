import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import Comment from "./Comment";
import axios from "axios";

export default function Container() {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    async function getCo() {
      const res = await axios.get(
        `https://dummyjson.com/comments/post/${number}`
      );
      const data = res["data"];
      console.log(data);
      setComment(data["comments"]);
      const resPo = await axios.get(`https://dummyjson.com/posts/${number}`);
      const dataPo = resPo["data"];
      console.log(dataPo);
      setPost(dataPo);
    }
    getCo();
  }, [number]);

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="flex items-center mb-4">
        <label htmlFor="postNumber" className="mr-2 font-bold text-gray-700">
          글 번호
        </label>
        <input
          id="postNumber"
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <Post post={post}></Post>
      <div>
        <h2 className="text-xl font-bold my-4 text-gray-800">댓글</h2>
        {comment.map((c) => {
          return <Comment key={c.id} comment={c}></Comment>;
        })}
      </div>
    </div>
  );
}

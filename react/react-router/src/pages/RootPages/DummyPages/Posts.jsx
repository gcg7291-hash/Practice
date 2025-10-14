import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Posts() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const LIMIT = 5;
  const LAST = 250;
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const order = searchParams.get("order") ?? "asc";
    const sortBy = searchParams.get("sortBy") ?? "id";

    async function getPosts() {
      const res = await axios(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}&sortBy=${sortBy}&order=${order}`
      );
      setPosts(res.data.posts);
    }
    getPosts();
  }, [searchParams, skip]);

  function onPrev() {
    if (skip - LIMIT >= 0) {
      setSkip(skip - LIMIT);
    } else {
      alert("이전 페이지가 없습니다.");
    }
  }
  function onNext() {
    if (skip + LIMIT <= LAST) {
      setSkip(skip + LIMIT);
    } else {
      alert("다음 페이지가 없습니다.");
    }
  }
  function page() {
    if (pageNumber === setPageNumber) [count++];
  }

  return (
    <div>
      <button
        className="border-2 p-2 cursor-pointer"
        onClick={() => {
          setSearchParams({ sortBy: "title", order: "asc" });
        }}
      >
        title 오름차순
      </button>
      <button
        className="border-2 p-2 cursor-pointer"
        onClick={() => {
          setSearchParams({ sortBy: "title", order: "desc" });
        }}
      >
        title 내림차순
      </button>
      <button
        className="border-2 p-2 cursor-pointer"
        onClick={() => {
          setSearchParams({ sortBy: "id", order: "desc" });
        }}
      >
        ID 내림차순
      </button>
      <button
        className="border-2 p-2 cursor-pointer"
        onClick={() => {
          setSearchParams({ sortBy: "id", order: "desc" });
        }}
      >
        ID 내림차순
      </button>
      {posts.map((post) => {
        return (
          <Link key={post.id} to={`/posts/${post.id}`}>
            No.{post.id} - {post.title}
          </Link>
        );
      })}
      <div>
        <button className="border p-1" onClick={onPrev}>
          이전
        </button>
        <button className="border p-1" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

export default function Container() {
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [skip, setSkip] = useState(0); // 게시글 시작 인덱스 상태
  const LIMIT = 5; // 한 페이지에 표시할 게시글 수
  const LAST = 250;

  useEffect(() => {
    async function fetchPosts() {
      // 적절한 요청 URL을 작성한다
      const response = await axios.get(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`
      );
      setPosts(response["data"]["posts"]);
    }

    fetchPosts();
  }, [skip]); // 의존성 배열 : useEffect 가 감시하는 데이터

  // 적절한 함수를 작성한다
  function onFirst() {
    setSkip(0);
  }
  function onLast() {
    setSkip(LAST);
  }
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-6">
        <button
          className="bg-gray-500 text-white px-3 py-1 cursor-pointer"
          onClick={() => {
            onFirst();
          }}
        >
          처음으로
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 cursor-pointer"
          onClick={() => {
            onPrev();
          }}
        >
          이전
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 cursor-pointer"
          onClick={() => {
            onNext();
          }}
        >
          다음
        </button>
        <button
          className="bg-gray-500 text-white px-3 py-1 cursor-pointer"
          onClick={() => {
            onLast();
          }}
        >
          마지막으로
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

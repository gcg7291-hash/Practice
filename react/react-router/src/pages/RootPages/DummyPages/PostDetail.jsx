import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      const res = await axios(`https://dummyjson.com/posts/${postId}`);
      setPost(res.data.posts);
    }
    getPost();
  }, [postId]);

  return (
    <div>
      <p>게시글 id:{postId}</p>
      <p>게시글{post.title}</p>
    </div>
  );
}

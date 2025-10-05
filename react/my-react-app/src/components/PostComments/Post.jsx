import React from "react";

export default function Post({ post }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h1>
      <p className="text-gray-700 text-base mb-4">{post.body}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>User ID: {post.userId}</span>
        <span>Views: {post.views}</span>
      </div>
    </div>
  );
}
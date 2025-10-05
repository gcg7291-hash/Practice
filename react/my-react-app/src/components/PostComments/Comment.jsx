import React from "react";

export default function Comment({ comment }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <p className="text-gray-700 text-base">{comment.body}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-sm text-gray-600">
          {comment.user?.username}
        </span>
        <span className="text-sm text-gray-500">Likes: {comment.likes}</span>
      </div>
    </div>
  );
}
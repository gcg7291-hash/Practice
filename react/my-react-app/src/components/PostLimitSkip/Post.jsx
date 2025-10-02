export default function Post({ post }) {
  return (
    <div className="border p-4">
      <h2 className="text-lg font-bold mb-2">
        No. {post.id} {post.title}
      </h2>
      <p className="text-gray-600 mb-3">{post.body}</p>
      <div className="flex gap-4 text-sm text-gray-500">
        <span>userId: {post.userId}</span>
        <span>views: {post.views}</span>
      </div>
    </div>
  );
}

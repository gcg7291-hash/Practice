import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function ChatMessage({ message }) {

  const isUser = message["role"] === "user";
  const isAi = message["role"] === "ai";

  return (
    <div className={`mt-16 flex ${isUser ? "justify-end" : "justify-start"}`}>
      
      {isAi ? (
        <div className="markdown-content max-w-[90%]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="p-3 border rounded-xl border-gray-300">
          {message.content}
        </div>
      )}
    </div>
  );
}

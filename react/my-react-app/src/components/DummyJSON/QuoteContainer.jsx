import Quote from "./Quote";
import axios from "axios";
import { useState } from "react";

export default function QuoteContainer() {
  const [quotes, setQuotes] = useState([
    { id: 1, quote: "견본 인용문", author: "견본 인용자" },
  ]);

  async function handleFetchQuotes() {
    const res = await axios.get("https://dummyjson.com/quotes/random");
    const newQuote = res["data"];

    setQuotes((Quotes) => [newQuote, ...Quotes]);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer mb-6 transition duration-150"
        onClick={handleFetchQuotes}
      >
        인용문 가져오기
      </button>
      <div className="space-y-4"></div>
      {quotes.map((quote) => (
        <Quote key={quote["id"]} quote={quote} />
      ))}
    </div>
  );
}

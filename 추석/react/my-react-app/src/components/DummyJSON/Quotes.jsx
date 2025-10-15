import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function getQuotes() {
      const res = await axios("https://dummyjson.com/quotes");
      setQuotes(res.data);
    }
    getQuotes();
  }, [quotes]);

  return <div>
    {quotes.map((quto) => {
      return 
    })}
  </div>;
}

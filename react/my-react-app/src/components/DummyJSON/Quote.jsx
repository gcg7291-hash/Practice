// components/DummyJSON/Quote.jsx

export default function Quote({ quote }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-2 italic">
        {quote["quote"]}
      </h3>

      <p className="text-gray-600 text-right font-light"> {quote["author"]}</p>
    </div>
  );
}

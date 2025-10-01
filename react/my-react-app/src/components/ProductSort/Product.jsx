import React from "react";

export default function Product({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-b border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-grow pr-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {product["title"]}
          </h2>
          <div className="text-sm text-gray-600 mb-1">
            <p>{product["id"]}</p>
            <p>{product["rating"]}</p>
            <p>{product["category"]}</p>
          </div>
          <p className="text-gray-700 text-sm mt-2">{product["description"]}</p>
        </div>

        <div className="text-right text-gray-700 whitespace-nowrap">
          <p className="text-lg font-bold text-gray-900 mb-1">
            가격: ${product.price.toFixed(2)}
          </p>
          <p className="text-sm">재고: {product["stock"]}</p>
          <p className="text-sm">브랜드: {product["brand"]}</p>
        </div>
      </div>
    </div>
  );
}

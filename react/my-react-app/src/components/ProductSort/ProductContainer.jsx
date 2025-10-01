import React from "react";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductContainer() {
  const [products, setProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  useEffect(() => {
    async function getProducts(products) {
      const res = await axios.get("https://dummyjson.com/products");
      const data = res["data"];

      setProducts(data["products"]);
    }

    getProducts();
  }, []);

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products]; 
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => requestSort("id")}
          className={`px-3 py-1 rounded ${
            sortConfig.key === "id"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          ID {getSortIndicator("id")}
        </button>
        <button
          onClick={() => requestSort("price")}
          className={`px-3 py-1 rounded ${
            sortConfig.key === "price"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          가격 {getSortIndicator("price")}
        </button>
        <button
          onClick={() => requestSort("rating")}
          className={`px-3 py-1 rounded ${
            sortConfig.key === "rating"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          평점 {getSortIndicator("rating")}
        </button>
      </div>

      <div className="space-y-4">
        {sortedProducts.map((product) => (
          <Product key={product["id"]} product={product} />
        ))}
      </div>
    </div>
  );
}

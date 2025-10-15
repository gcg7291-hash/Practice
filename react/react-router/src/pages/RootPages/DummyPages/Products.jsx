import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";

export default function Products() {
  const LIMIT = 5;
  const LAST = 194;
  const [skip, setSkip] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const sortBy = searchParams.get("sortBy") ?? "id";
    const order = searchParams.get("order") ?? "asc";

    async function getPro() {
      const res = await axios(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&limit=${LIMIT}&skip=${skip}`
      );
      setProduct(res.data.products);
    }
    getPro();
  }, [searchParams, skip]);

  function onPrev() {
    if (skip - LIMIT >= 0) {
      setSkip(skip - LIMIT);
    } else {
      alert("이전 페이지가 없습니다.");
    }
  }
  function onNext() {
    if (skip + LIMIT <= LAST) {
      setSkip(skip + LIMIT);
    } else {
      alert("다음 페이지가 없습니다.");
    }
  }

  return (
    <div>
      <button
        className="border p-1"
        onClick={() => setSearchParams({ sortBy: "price", order: "asc" })}
      >
        상품가격 오름차순
      </button>
      <button
        className="border p-1"
        onClick={() => setSearchParams({ sortBy: "price", order: "desc" })}
      >
        상품가격 내림차순
      </button>
      <button
        className="border p-1"
        onClick={() => setSearchParams({ sortBy: "id", order: "asc" })}
      >
        ID 오름
      </button>
      <button
        className="border p-1"
        onClick={() => setSearchParams({ sortBy: "id", order: "desc" })}
      >
        ID 내림
      </button>

      <li>
        {product.map((products) => {
          return (
            <Link
              key={products.id}
              to={PATHS.ROOT.getProductDetail(products.id)}
            >
              No.{products.id} - {products.title} - {products.price}
            </Link>
          );
        })}
      </li>
      <div>
        <button className="border p-1" onClick={onPrev}>
          이전
        </button>
        <button className="border p-1" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
}

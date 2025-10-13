import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsList from "../../../components/ProductsList";

export default function Products() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get("https://dummyjson.com/products");
      const data = res["data"];
      console.log(data);
      setproducts(data["products"]);
    }
    getProducts();
  }, []);
  return (
    <div>
      <h1
        onClick={() => {
          alert("ProductsList로 이동합니다");
          navigate("/ProductsList");
        }}
      >
        {products.map((product) => {
          return (
            <ProductsList product={product}>{product.products}</ProductsList>
          );
        })}
      </h1>
    </div>
  );
}

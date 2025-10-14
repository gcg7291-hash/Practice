import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const res = await axios(`https://dummyjson.com/products/${productId}`);
      setProduct(res["data"]);
    }
    getProduct();
  }, [productId]);
  return (
    <div>
      <p>{product.title}</p>
      <p>{product.price}</p>
    </div>
  );
}

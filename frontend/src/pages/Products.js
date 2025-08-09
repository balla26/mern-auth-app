import React, { useEffect, useState } from "react";
import { handleError } from "../utils";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const url = "https://mern-auth-app-api-delta.vercel.app/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        {Array.isArray(products) &&
          products.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>
    </div>
  );
}

export default Products;

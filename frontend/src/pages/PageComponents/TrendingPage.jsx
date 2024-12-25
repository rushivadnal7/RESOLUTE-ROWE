import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import { ListProductAPI } from "../../api/productapi";

const TrendingPage = () => {


  const [productList , setProductList] = useState([])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ListProductAPI()
        setProductList(data.products)
      } catch (error) {

      }
    }

    fetchProducts()
  }, [])

  return (
    <section data-scroll data-scroll-section data-scroll-speed='-0.1' className="trending-page">
      <div className="scrolling-container" >
        {productList.reverse().map((val, id) => (
          <>
            <ProductCard key={id} data={val} />
          </>
        ))}
      </div>
    </section>
  );
};

export default TrendingPage;

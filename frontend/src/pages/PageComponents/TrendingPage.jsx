import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../../components/ProductCard";
import { ListProductAPI } from "../../api/productapi";
import { ShopContext } from "../../context/ShopContext";


const TrendingPage = () => {

  const { allProducts } = useContext(ShopContext);

  return (
    <section data-scroll data-scroll-section data-scroll-speed='-0.1' className="trending-page">
      <div className="scrolling-container" >
        {allProducts.reverse().map((val, id) => (
          <>
            <ProductCard key={id} data={val} />
          </>
        ))}
      </div>
    </section>
  );
};

export default TrendingPage;

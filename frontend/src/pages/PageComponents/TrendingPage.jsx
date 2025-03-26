import React, { useContext, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import { ShopContext } from "../../context/ShopContext";
import { TrendingPageWrapper } from "../../wrappers/trendingpage";


const TrendingPage = () => {
  const { allProducts } = useContext(ShopContext);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  let dummy = [1, 2, 3, 4, 5]


  return (
    <TrendingPageWrapper>
      <button className="arrow left-arrow" onClick={scrollLeft}>
        &#8249;
      </button>
      <h2 className="title-trending">TRENDING</h2>
      <div className="scrolling-container" ref={scrollContainerRef}>
        {allProducts.length === 0 ? dummy.map((val) => {
          return (
            <>
              <div className="skeleton-card">
              </div>
            </>
          )
        }) : allProducts.reverse().map((val, id) => (
          <ProductCard key={id} data={val} />
        ))}
      </div>

      <button className="arrow right-arrow" onClick={scrollRight}>
        &#8250;
      </button>
    </TrendingPageWrapper>
  );
};

export default TrendingPage;




import React, { useContext, useRef, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import { ShopContext } from "../../context/ShopContext";
import { TrendingPageWrapper } from "../../wrappers/trendingpage";

const TrendingPage = () => {
  const { allProducts } = useContext(ShopContext);
  const scrollContainerRef = useRef(null);

  // Memoize allProducts to prevent unnecessary recalculations
  const memoizedProducts = useMemo(() => {
    return [...allProducts].reverse(); // Avoid mutating the original array
  }, [allProducts]);

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

  let dummy = [1, 2, 3, 4, 5];

  const memoizedCards = useMemo(() => {
    return memoizedProducts.map((val, id) => <ProductCard key={id} data={val} />);
  }, [memoizedProducts]); // This will only re-run if `memoizedProducts` changes
  

  return (
    <TrendingPageWrapper>
      <button className="arrow left-arrow" onClick={scrollLeft}>
        &#8249;
      </button>
      <h2 className="title-trending">TRENDING</h2>
      <div className="scrolling-container" ref={scrollContainerRef}>
        {allProducts.length === 0
          ? dummy.map((val, index) => (
              <div key={index} className="skeleton-card"></div>
            ))
          : memoizedCards}
      </div>
      <button className="arrow right-arrow" onClick={scrollRight}>
        &#8250;
      </button>
    </TrendingPageWrapper>
  );
};

export default TrendingPage;

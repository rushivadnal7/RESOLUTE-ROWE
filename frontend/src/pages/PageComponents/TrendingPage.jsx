import React, { useContext, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import { ShopContext } from "../../context/ShopContext";

const TrendingPage = () => {
  const { allProducts } = useContext(ShopContext);
  const scrollContainerRef = useRef(null);

  // Scroll to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // Scroll to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // data-scroll data-scroll-section data-scroll-speed="-0.1" 
  return (
    <section className="trending-page">
      {/* <div className="arrow-controls"> */}
        <button className="arrow left-arrow" onClick={scrollLeft}>
          &#8249;
        </button>

        <h2 className="title-trending">TRENDING</h2>
        <div className="scrolling-container" ref={scrollContainerRef}>
          {allProducts.reverse().map((val, id) => (
            <ProductCard key={id} data={val} />
          ))}
        </div>

        <button className="arrow right-arrow" onClick={scrollRight}>
          &#8250; 
        </button>
      {/* </div> */}
    </section>
  );
};

export default TrendingPage;

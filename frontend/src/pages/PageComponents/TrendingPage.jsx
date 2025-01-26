import React, { useContext, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import { ShopContext } from "../../context/ShopContext";

const TrendingPage = () => {
  const { allProducts } = useContext(ShopContext);
  const scrollContainerRef = useRef(null);

  // Scroll to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild.offsetWidth; // Get the width of a single card
      scrollContainerRef.current.scrollBy({
        left: -350, // Scroll by one card's width
        behavior: "smooth",
      });
    }
  };

  // Scroll to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild.offsetWidth; // Get the width of a single card
      scrollContainerRef.current.scrollBy({
        left: 350, // Scroll by one card's width
        behavior: "smooth",
      });
    }
  };

  let dummy = [1, 2, 3, 4, 5]


  return (
    <section className="trending-page">
      <button className="arrow left-arrow" onClick={scrollLeft}>
        &#8249;
      </button>

      <h2 className="title-trending">TRENDING</h2>
      <div className="scrolling-container" ref={scrollContainerRef}>
        {allProducts.length === 0 ? dummy.map((val) => {
          return (
            <>
              <div className="w-[300px] flex-none h-[450px] bg-slate-500">
                {val}
              </div>
            </>
          )
        }) : allProducts.reverse().map((val, id) => (
          <ProductCard key={id} data={val} />
        ))}
        {/* {
          dummy.map((val) => {
            
          })
        } */}
      </div>

      <button className="arrow right-arrow" onClick={scrollRight}>
        &#8250;
      </button>
    </section>
  );
};

export default TrendingPage;




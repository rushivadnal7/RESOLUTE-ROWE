import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AllproductWrapper, StyledProductList } from '../wrappers/allproduct'
// import { allProductsData } from '../Data/allproductsData'
import ProductCard from '../components/ProductCard'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'


const Allproducts = () => {
  const { allProducts, loading } = useContext(ShopContext);
  const [availabilityArrow, setAvailabilityArrow] = useState(false);

  const [InStockCheckbox, setInStockCheckbox] = useState(false);
  const [OutStockCheckbox, setOutStockCheckbox] = useState(false);
  const [priceRange, setPriceRange] = useState(false);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [priceValue, setPriceValue] = useState([250, 600]);



  console.log(allProducts)

  useEffect(() => {
    setProductList(allProducts);
  }, [allProducts]);


  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setPriceValue([250, value]);
    console.log(value)
    setProductList(
      originalProductList.filter((product) => product.price <= value)
    );
  };

  const resetAll = () => {
    setInStockCheckbox(false)
    setOutStockCheckbox(false)
    setPriceValue([250, 600])
    setProductList(originalProductList)
  }
  // console.log(productList)

  return (
    <>
      <Navbar />
      <AllproductWrapper>
        <div className="header">
          <span>filter -</span>
          <div className="availability">
            <div onClick={() => setAvailabilityArrow(!availabilityArrow)} className="availability-filter">
              <span>Availability</span>
              {/* Down arrow when closed */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-3 ${availabilityArrow ? 'hidden' : 'block'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              {/* Up arrow when open */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-3 ${availabilityArrow ? 'block' : 'hidden'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </div>

            {/* Dropdown options */}
            <div
              className={`availability-selection-option ${availabilityArrow ? "open" : "closed"}`}
            >

              <div className="instock-option">
                <input checked={InStockCheckbox} type="checkbox" id="instock" />
                <span className="custom-checkbox"></span>
                <label onClick={() => setInStockCheckbox(!InStockCheckbox)} htmlFor="instock">In Stock</label>
              </div>

              <div className="out-of-stock-option">
                <input checked={OutStockCheckbox} type="checkbox" id="outofstock" />
                <span className="custom-checkbox"></span>
                <label onClick={() => setOutStockCheckbox(!OutStockCheckbox)} htmlFor="outofstock">Out of Stock</label>
              </div>
              <span onClick={() => (setInStockCheckbox(false), setOutStockCheckbox(false))} >reset</span>
            </div>
          </div>

          <div className="price-range">
            <div onClick={() => setPriceRange(!priceRange)} className="price-range-filter">
              <span>price</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-3 ${priceRange ? 'hidden' : 'block'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-3 ${priceRange ? 'block' : 'hidden'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </div>

            {/* Dropdown options */}
            <div
              className={`price-range-dropdown ${priceRange ? "open" : "closed"}`}
            >
              <div className="price-range-slider">
                <label>Price: ₹{priceValue[0]} - ₹{priceValue[1]}</label>
                <input
                  type="range"
                  min="250"
                  max="600"
                  value={priceValue[1]}
                  onChange={handlePriceChange}
                  className="slider"
                />
              </div>
              <span onClick={() => (setPriceValue([250, 600]), setProductList(originalProductList))}>reset</span>
            </div>
          </div>
        </div>

        <div className="product-list">

          {loading ? (
            <div className="skeleton-cards">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="skeleton-card"></div>
              ))}
            </div>
          ) : (
            productList.length === 0 ? (
              <div className="no-products-found ">
                <span>No products found! <br /> Use fewer filters or <a onClick={resetAll}>Reset all</a></span>

              </div>
            ) :
              productList.map((product, index) => (
                <ProductCard key={index} data={product} />
              ))
          )}

        </div>
      </AllproductWrapper >
      <Footer />
    </>
  )
}

export default Allproducts
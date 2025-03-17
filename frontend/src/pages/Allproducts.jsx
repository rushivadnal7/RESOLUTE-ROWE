import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AllproductWrapper, StyledProductList } from '../wrappers/allproduct'
import ProductCard from '../components/ProductCard'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'


const Allproducts = () => {
  const { allProducts, loading } = useContext(ShopContext);
  const [genderArrow, setGenderArrow] = useState(false);

  const [menCheckbox, setMenCheckbox] = useState(false);
  const [womenCheckbox, setWomenCheckbox] = useState(false);
  const [priceRange, setPriceRange] = useState(false);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [priceValue, setPriceValue] = useState([250, 700]);
  const [filterClick, setFilterClick] = useState(false)

  useEffect(() => {
    setProductList(allProducts);
    setOriginalProductList(allProducts)
  }, [allProducts]);

  console.log(allProducts)

  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setPriceValue([250, value]);
    console.log(value)
    setProductList(
      originalProductList.filter((product) => product.price <= value)
    );
  };

  const resetAll = () => {
    setMenCheckbox(false)
    setWomenCheckbox(false)
    setPriceValue([250, 600])
    setProductList(originalProductList)
  }

  useEffect(() => {
    if (filterClick) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [filterClick]);




  return (
    <>
      <Navbar />
      <AllproductWrapper>
        <div className="header">
          <div className="mobile-view-filter-icon">
            <svg onClick={() => setFilterClick(!filterClick)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>

          </div>
          <span className='filter-title'>filter </span>

          <div className="gender">
            <div onClick={() => setGenderArrow(!genderArrow)} className="gender-filter">
              <span>Gender</span>
              {/* Down arrow when closed */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-3 ${genderArrow ? 'hidden' : 'block'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              {/* Up arrow when open */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-3 ${genderArrow ? 'block' : 'hidden'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </div>

            {/* Dropdown options */}
            <div
              className={`gender-selection-option ${genderArrow ? "open" : "closed"}`}
            >

              <div className="men-option">
                <input checked={menCheckbox} type="checkbox" id="men" />
                <span className="custom-checkbox"></span>
                <label onClick={() => setMenCheckbox(!menCheckbox)} htmlFor="men">Men</label>
              </div>

              <div className="women-option">
                <input checked={womenCheckbox} type="checkbox" id="women" />
                <span className="custom-checkbox"></span>
                <label onClick={() => setWomenCheckbox(!womenCheckbox)} htmlFor="women">Women</label>
              </div>
              <span onClick={() => (setMenCheckbox(false), setWomenCheckbox(false))} >reset</span>
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
                  max="700"
                  value={priceValue[1]}
                  onChange={handlePriceChange}
                  className="slider"
                />
              </div>
              <span onClick={() => (setPriceValue([250, 700]), setProductList(originalProductList))}>reset</span>
            </div>
          </div>
        </div>

        {/* mobile view slider */}
        <div className={`filter-slider ${filterClick ? 'open' : 'close'}`}>

          <svg onClick={() => setFilterClick(!filterClick)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>


          <div className="gender">
            <div
              className={`gender-selection-option open `}
            >

              <div className="men-option">
                <input checked={menCheckbox} type="checkbox" id="men" />
                <span className="custom-checkbox"></span>
                <label onClick={() => setMenCheckbox(!menCheckbox)} htmlFor="men">Men</label>
              </div>

              <div className="women-option">
                <input checked={womenCheckbox} type="checkbox" id="women" />
                <span className="custom-checkbox"></span>
                <label onClick={() => setWomenCheckbox(!womenCheckbox)} htmlFor="women">Women</label>
              </div>
              <span className='cursor-pointer ' onClick={() => (setMenCheckbox(false), setWomenCheckbox(false))} >reset</span>
            </div>
          </div>

          <div className="price-range">
            <div
              className={`price-range-dropdown open`}
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
              <span className='cursor-pointer ' onClick={() => (setPriceValue([250, 600]), setProductList(originalProductList))}>reset</span>
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
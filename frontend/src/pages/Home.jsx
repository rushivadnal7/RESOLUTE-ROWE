import React, { useEffect, useRef,useState } from "react";
import { HomeWrapper } from "../wrappers/home";
import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";
import Hero from "./PageComponents/Hero";
import LocomotiveScroll from "locomotive-scroll";
import TrendingPage from "./PageComponents/TrendingPage";
import BestSeller from "./PageComponents/BestSeller";
import Marquee from "./PageComponents/Marquee";
import PlayfullLogo from "./PageComponents/PlayfullLogo";
import Testimonials from "./PageComponents/Testimonials";
import Footer from "../components/Footer";
import { use } from "react";

const Home = () => {
  const locomotiveScroll = new LocomotiveScroll();

  // useEffect(()=> {
  //   const dataString = localStorage.getItem('cart-items')
  //   const cartItems = JSON.parse(dataString);
  //   console.log(cartItems)
  // },[])

  // let scrollRatio ;
  const [scrollRatio, setScrollRatio] = useState(0);
  const handleScroll = (e) => {
    // const [navba, setfirst] = useState(second)
    console.log('')
    const {scrollTop, scrollHeight, clientHeight } = e.target;
    console.log(scrollHeight,scrollTop ,clientHeight)
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    setScrollRatio(scrollRatio)
  }

  // console.log(scrollRatio)


  return (

    <HomeWrapper onScroll={handleScroll}>
      <Navbar scrollRatio={scrollRatio}/>
      <Hero />
      <Marquee/>
      <TrendingPage/>
      <BestSeller/>
      <PlayfullLogo/>
      <Testimonials/>
      <Footer/>
    </HomeWrapper>
  );
};

export default Home;

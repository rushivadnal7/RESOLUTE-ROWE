import React, { useEffect, useRef, useState, useCallback } from "react";
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
import Logo3D from "../components/Logo3D";

const Home = () => {
  const [scrollRatio, setScrollRatio] = useState(0);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    setScrollRatio(scrollRatio);
  }, []);

  return (
    <HomeWrapper onScroll={handleScroll}>
      <Navbar scrollRatio={scrollRatio} />
      <Hero />
      <Marquee />
      <TrendingPage />
      <BestSeller />
      <Testimonials />
      {/* <div className="logo-container">
        <Logo3D />
      </div> */}
      <Footer />
    </HomeWrapper>
  );
};

export default Home;

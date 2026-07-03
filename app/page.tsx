// app/page.tsx
import React from "react";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import BestSellers from "./components/Bestsellers";
// import BestSellers2 from "/components/Bestsellers2";
import Brands from "./components/Brands";

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Hero />
      <Categories />

      <BestSellers />
      {/* <BestSellers2 /> */}
      <Brands />

      {/* Add more sections as needed */}
    </div>
  );
};

export default HomePage;
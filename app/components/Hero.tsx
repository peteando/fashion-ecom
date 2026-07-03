import React from "react";

const Hero = (): JSX.Element => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 pt-44 ps-32 rounded-lg">
            <h2 className="text-9xl text-white font-bold mb-2">Spring</h2>
            <h3 className="text-7xl mb-2">Collections</h3>
            <p className="text-6xl">Available Now</p>

            <button className="bg-black mt-10 rounded shadow h-12 px-6 outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base transition-bg hover:border hover:border-primary">
              SHOP
            </button>
          </div>

          <div>
            <img src="/images/fashion_girl.png" alt="Fashion model" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
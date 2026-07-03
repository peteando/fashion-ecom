import React from "react";

const Categories = (): JSX.Element => {
  return (
    <div className="container mx-auto px-3">
      <div>
        <h2 className="text-4xl lg:text-5xl font-bold mt-20 mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-4 gap-5">
          <div className="bg-orange">
            <h2 className="text-3xl text-white font-bold mt-10 ps-10">
              Mens
            </h2>

            <img
              src="/images/mansuit.png"
              alt="Mens fashion"
            />
          </div>

          <div className="bg-lightblue">
            <h2 className="text-3xl text-white font-bold mt-10 ps-10">
              Womens
            </h2>

            <img
              src="/images/girldress.png"
              alt="Womens fashion"
            />
          </div>

          <div className="bg-pink">
            <h2 className="text-3xl text-white font-bold mt-10 ps-10">
              Kids
            </h2>

            <img
              src="/images/kid.png"
              alt="Kids fashion"
            />
          </div>

          <div className="bg-grey">
            <h2 className="text-3xl text-white font-bold mt-10 ps-10">
              Accessories
            </h2>

            <img
              src="/images/accessories.png"
              alt="Accessories"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
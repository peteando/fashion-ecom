import React from "react";

const Brands = (): JSX.Element => {
  return (
    <div>
      <div className="container mx-auto px-3">
        <h2 className="text-4xl lg:text-5xl font-bold mt-20 mb-10">
          Shop by Brand
        </h2>

        <div className="grid grid-cols-6 gap-5 mb-10">
          <div>
            <img src="/images/polo.png" alt="Polo" />
          </div>

          <div>
            <img src="/images/stussy.png" alt="Stussy" />
          </div>

          <div>
            <img src="/images/rmwilliams.png" alt="RM Williams" />
          </div>

          <div>
            <img src="/images/sheetsociety.png" alt="Sheet Society" />
          </div>

          <div>
            <img src="/images/nike.png" alt="Nike" />
          </div>

          <div>
            <img src="/images/polo.png" alt="Polo" />
          </div>

          <div>
            <img src="/images/aesop.png" alt="Aesop" />
          </div>

          <div>
            <img src="/images/assembly.png" alt="Assembly Label" />
          </div>

          <div>
            <img src="/images/adidas.png" alt="Adidas" />
          </div>

          <div>
            <img src="/images/candm.png" alt="C&M" />
          </div>

          <div>
            <img src="/images/cottonon.png" alt="Cotton On" />
          </div>

          <div>
            <img src="/images/lego.png" alt="Lego" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
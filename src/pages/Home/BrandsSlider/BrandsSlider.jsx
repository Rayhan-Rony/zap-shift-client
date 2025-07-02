import React from "react";

// Sample logo paths or imports
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/casio.png";
import logo3 from "../../../assets/brands/moonstar.png";
import logo4 from "../../../assets/brands/randstad.png";
import logo5 from "../../../assets/brands/start.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/amazon_vector.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
console.log([...logos, ...logos]);

const BrandsSlider = () => {
  return (
    <section className="py-16 ">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          We've helped thousands of sales teams.
        </h2>
      </div>
      <div className="overflow-hidden whitespace-nowrap relative">
        <div className="animate-slide flex gap-24 min-w-max px-4">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt={`brand-${i}`}
              className="h-6 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSlider;

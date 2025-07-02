import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import BrandsSlider from "../BrandsSlider/BrandsSlider";
import Benefits from "../Benifits/Benifits";
import BeMarchent from "../BeMarchent/BeMarchent";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services></Services>
      <BrandsSlider></BrandsSlider>
      <Benefits></Benefits>
      <BeMarchent></BeMarchent>
      <TestimonialCarousel></TestimonialCarousel>
    </div>
  );
};

export default Home;

import React from "react";
import location from "../../../assets/others/location-merchant.png";

const BeMarchent = () => {
  return (
    <div className="  bg-[#03373D] bg-[url('assets/others/be-a-merchant-bg.png')] p-20 rounded-4xl bg-no-repeat">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={location} className=" rounded-lg " />
        <div>
          <h1 className="text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-white">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary rounded-full text-black">
            Become a Merchant
          </button>
          <button className="btn btn-primary btn-outline ms-4 rounded-full">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMarchent;

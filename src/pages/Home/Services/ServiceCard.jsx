import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div
      key={title}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-[#CAEB66]"
    >
      <div className="card-body items-center text-center">
        <div className="mb-4 text-primary">
          <Icon className="text-5xl" />
        </div>
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-base-content">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

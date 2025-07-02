import Aos from "aos";
import React from "react";

const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: "https://i.ibb.co/sJVmQ0gr/1111111111.png ",
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: "https://i.ibb.co/zH71v7FG/222222222222.png",
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: "https://i.ibb.co/cnxq7QK/333.jpg",
  },
];
Aos.init({ duration: 1200 });
const Benefits = () => {
  return (
    <section className="py-16 " id="benefits">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#01257D]">
          Benefits
        </h2>
        <div className="space-y-10" data-aos="fade-in">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center bg-white rounded-xl p-6 shadow-sm"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-48 h-48 object-contain"
              />

              {/* Vertical divider */}
              <div className="hidden lg:block h-32 border-l border-dashed border-gray-400 mx-6"></div>
              {/* <div className="hidden lg:block h-32 mx-6 vertical-dashed-divider"></div> */}

              {/* Text content */}
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-semibold text-[#01257D] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

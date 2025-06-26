import React from "react";
import logo from "../../../../src/assets/others/logo.png";

const LogoIcon = () => {
  return (
    <div className="flex items-end">
      <img src={logo} alt="" />
      <p className="text-3xl -ms-1 font-extrabold">Pro Fast</p>
    </div>
  );
};

export default LogoIcon;

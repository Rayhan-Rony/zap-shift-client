import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/others/authImage.png";
import LogoIcon from "../pages/Shared/LogoIcon/LogoIcon";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 p-12 ">
      <div>
        <LogoIcon></LogoIcon>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pmus from "../images/pmus.jpg";
import white_logo from "../images/white_logo.png";
import ServicesShow from "../components/ServicesShow";
import { companyName } from "../config";
// import right_Purple-Lens-Flare from "../images/right_Purple-Lens-Flare.png";

function Load() {
  let navigate = useNavigate();
  return (
    <div className="fixed bg-[url(./images/pmus.jpg)] bg-contain w-full h-full">
      <div>
        <div className="bg-red-30 w-14 h-10 m-2">
          <img src={white_logo} className="w-full h-full" />
        </div>
        <div className="mt-10">
          <h1 className="text-gray-950 font-black text-4xl font-serif text-center skew-x-12 ">
            {companyName}
          </h1>
          <p className="text-slate-300 font-serif text-center">
            where reality meets expectations
          </p>
        </div>
      </div>
      <div className="absolute w-[70%] left-[15%] bottom-[5vh] bg-red-20 space-y-10">
        
        <div>
          <p className="text-slate-50 text-center text-2xl font-serif">We deal in : </p>
          <ServicesShow />
        </div>

        <button
          onClick={() => navigate("/home")}
          className="group relative w-full bg-gray-950 h-12 rounded-full text-slate-50 text-lg font-semibold active:"
        >
          <div className="absolute bg-red-200 w-full h-full top-0 rounded-full hidden items-center justify-center group-active:flex group-active:bg-gradient-to-r group-active:from-orange-300 group-active:to-orange-600">
            Get Started
          </div>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Load;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CarRentalOutlinedIcon from "@mui/icons-material/CarRentalOutlined";
import CarRepairOutlinedIcon from "@mui/icons-material/CarRepairOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { purple } from "@mui/material/colors";
import "animate.css";
import { companyName } from "../config";
import { ArrowForward, ArrowForwardIos, Forward } from "@mui/icons-material";

export default function QuickFind() {
  const [quickFindState, setQuickFindState] = useState();


  return (
    <div className="w-full bg-gray-50 pt-4 pb-10 rounded-xl mx-auto text-center mb-4 space-y-20 ">
      {/* car sales */}
      <div className=" relative bg-blue-100 w-[80%] h-[20vh py-5 float-right rounded-lg pt-10 px-5 shadow-lg animate__animated fadeIn">
        {/* icon div */}
        <div className="absolute w-[80%] h-[10vh] bg-[rgba(127,59,123,0.3)] -top-10 -left-10 rounded-lg">
          {/* Icon */}
          <div className="relative flex flex-wrap flex-col bg-red-20">
            <div className="relative w-14 mt-6 bg-red-20">
              <DirectionsCarOutlinedIcon
                sx={{ fontSize: 45, color: purple[800] }}
              />
              <div className="absolute -top-5 left-3">
                <PaidOutlinedIcon sx={{ fontSize: 30, color: purple[800] }} />
              </div>
            </div>
            <div className="absolute bg-red-40 left-16 mt-[3vh] text-xl font-bold text-purple-600">
              CAR SALES
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-left">
            Are you ready to experience the thrill of driving in style? Look no
            further than {companyName}, where luxury and performance meet. Our
            curated collection of top-tier vehicles will leave you speechless.
            Whether you're seeking a sleek sedan, a rugged SUV, or a powerful
            sports car, we have the perfect ride to match your desires.
          </p>
          <div className="bg-red-200 w-[60%] mx-auto">
            <NavLink
              to="/services#sales"
              className="flex justify-between text-center text-lg font-roboto bg-violet-500 hover:bg-gray-700 xl:hover:bg-violet-900 active:bg-black text-white font-bold px-5 py-2 rounded md:text-3xl"
            >
              <div className="bg-red-30 w-[70%] flex items-center justify-center">
                <p>SALES</p>
              </div>
              <div className="bg-red-20 w-[20%]">
                <ArrowForwardIos />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      {/* car rentals */}
      <div className=" relative bg-blue-100 w-[80%] h-[20vh py-5 float-left rounded-lg pt-10 px-5 shadow-lg animate__animated fadeIn">
        {/* icon div */}
        <div className="absolute w-[80%] h-[10vh] bg-[rgba(127,59,123,0.3)] -top-10 -right-10 rounded-lg">
          {/* Icon */}
          <div className="relative bg-red-20">
            <div className="relative float-right w-14 mt-6 bg-red-20">
              <DirectionsCarOutlinedIcon
                sx={{ fontSize: 45, color: purple[800] }}
              />
              <div className="absolute -top-5 left-3">
                <KeyOutlinedIcon sx={{ fontSize: 30, color: purple[800] }} />
              </div>
            </div>
            <div className="absolute bg-red-40 right-16 mt-[3vh] text-xl font-bold text-purple-600">
              CAR RENTALS
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-right">
            At {companyName}, we understand that every traveler has unique
            preferences. That's why we offer a wide range of vehicles to suit
            your needs. Whether you're seeking an efficient compact car, a
            spacious SUV for your group, or a luxurious sedan for a business
            trip, we have the ideal ride to make your journey comfortable and
            memorable.
          </p>
          <div className="bg-red-200 w-[60%] mx-auto">
            <NavLink
              to="/services#rentals"
              className="flex justify-between text-center text-lg font-roboto bg-violet-500 hover:bg-gray-700 xl:hover:bg-violet-900 active:bg-black text-white font-bold px-1 py-2 rounded md:text-3xl"
            >
              <div className="bg-red-30 w-[70%] flex items-center justify-center">
                <p>RENTALS</p>
              </div>
              <div className="bg-red-20 w-[20%]">
                <ArrowForwardIos />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      {/* car repairs */}
      <div className=" relative bg-blue-100 w-[80%] h-[20vh py-5 float-right rounded-lg pt-10 px-5 shadow-lg animate__animated fadeIn">
        {/* icon div */}
        <div className="absolute w-[80%] h-[10vh] bg-[rgba(127,59,123,0.3)] -top-10 -left-10 rounded-lg">
          {/* Icon */}
          <div className="relative flex flex-wrap flex-col bg-red-20">
            <div className="relative w-14 mt-6 bg-red-20">
              <DirectionsCarOutlinedIcon
                sx={{ fontSize: 45, color: purple[800] }}
              />
              <div className="absolute -top-5 left-3">
                <HandymanOutlinedIcon
                  sx={{ fontSize: 30, color: purple[800] }}
                />
              </div>
            </div>
            <div className="absolute bg-red-40 left-16 mt-[3vh] text-xl font-bold text-purple-600">
              CAR REPAIRS
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-left">
            At {companyName}, we understand the importance of a well-functioning
            vehicle. Our team of skilled mechanics specializes in diagnosing and
            repairing a wide range of automotive issues. From minor maintenance
            tasks to complex repairs, we have the expertise to keep your car
            running smoothly.
          </p>
          <div className="bg-red-200 w-[60%] mx-auto">
            <NavLink
              to="/services#repairs"
              className="flex justify-between text-center text-lg font-roboto bg-violet-500 hover:bg-gray-700 xl:hover:bg-violet-900 active:bg-black text-white font-bold px-1 py-2 rounded md:text-3xl"
            >
              <div className="bg-red-30 w-[70%] flex items-center justify-center">
                <p>REPAIRS</p>
              </div>
              <div className="bg-red-20 w-[20%]">
                <ArrowForwardIos />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

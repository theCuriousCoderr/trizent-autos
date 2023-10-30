import React from 'react';
import {
    AttachMoneyOutlined,
    HandymanOutlined,
    HexagonOutlined,
    KeyOutlined,
  } from "@mui/icons-material";
  import { orange } from "@mui/material/colors";

function ServicesShow() {
  return (
    <div>
      <div className="flex flex-nowrap gap-10 overflow-scroll justify-between bg-red-30 no-scrollbar">
          <div className="relative min-w-[80%] text-left bg-[rgba(127,59,123,0.3)] p-1 border-r-4 border-slate-100">
            <div className="relative bg-red-20 w-14 ml-1">
              <HexagonOutlined sx={{ fontSize: 60, color: "whitesmoke" }} />
              <div className="absolute bg-red-40 w-6 left-[32%] top-4">
                <AttachMoneyOutlined
                  sx={{ fontSize: 25, color: orange[500] }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-200 text-left ml-2">Car Sales</p>
          </div>
          <div className="relative min-w-[80%] text-left bg-[rgba(127,59,123,0.3)] p-1 border-r-4 border-slate-100">
            <div className="relative bg-red-20 w-14 ml-1">
              <HexagonOutlined sx={{ fontSize: 60, color: "whitesmoke" }} />
              <div className="absolute bg-red-40 w-6 left-[32%] top-4">
                <KeyOutlined
                  sx={{ fontSize: 25, color: orange[500] }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-200 text-left ml-2">Car Rentals</p>
          </div>
          <div className="relative min-w-[80%] text-left bg-[rgba(127,59,123,0.3)] p-1 border-r-4 border-slate-100">
            <div className="relative bg-red-20 w-14 ml-1">
              <HexagonOutlined sx={{ fontSize: 60, color: "whitesmoke" }} />
              <div className="absolute bg-red-40 w-6 left-[32%] top-4">
                <HandymanOutlined
                  sx={{ fontSize: 25, color: orange[500] }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-200 text-left ml-2">Car Repairs</p>
          </div>
        </div>
    </div>
  )
}

export default ServicesShow;

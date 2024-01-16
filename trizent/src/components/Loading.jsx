import React, {useState} from "react";
import { companyName } from "../config";

function Loading() {
    const [id, setId] = useState(0)
    let company = companyName.replace(" ","").toUpperCase()

        setTimeout(() => {
            if (id === company.length) {
                setId(0)
            } else {
                setId(id+1)
            }
        }, 500);

  return (
    <div className="fixed z-20 w-full h-full bg-white top-0 left-0 opacity-80 flex justify-center pt-[40vh]">
      <div>
        <div className="relative">
          <div className="w-20 h-20 border-t-4 rounded-full border-purple-800 animate-spin"></div>
          <div className="absolute top-6 bg-red-20 w-[2%] left-[40%] text-xl text-black font-bold">
            <p>{company[id]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;

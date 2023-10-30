import React, { useEffect, useState } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { purple } from '@mui/material/colors';

function BackToTop() {
  const [btnDir, setBtnDir] = useState("down")
  const [prevPos, setPrevPos] = useState(0)

  document.addEventListener("scroll", () => {
    let currentPos = window.scrollY;
    if (currentPos > prevPos) {
      setBtnDir("down")
    } else {
      setBtnDir("up")
    }
    setPrevPos(currentPos);
  })
  let height = Math.max(window.innerHeight);
  height = height * height;
  let width = Math.min(window.innerWidth);
  return (
    <div className='flex flex-col gap-3 fixed bottom-3 right-2 z-10 md:right-1'>
      {btnDir === "down" ?
        <div>
          <div onClick={() => window.scrollTo(width, height)} className='h-10 w-10 bg-white z-20 rounded-full hover:bg-purple-600 border-2 border-purple-900 box-content md:hidden'>
            <ArrowCircleDownIcon sx={{ fontSize: 40, color: purple[800], "&:hover": { color: 'white' } }} />
          </div>
          <div onClick={() => window.scrollTo(width, height)} className='h-10 w-10 bg-white z-20 rounded-full hover:bg-purple-600 border-2 border-purple-900 box-content hidden md:block md:h-14 md:w-14'>
            <ArrowCircleDownIcon sx={{ fontSize: 55, color: purple[800], "&:hover": { color: 'white' } }} />
          </div>
        </div> :
        <div>
          <div onClick={() => window.scrollTo(0, 0)} className='h-10 w-10 bg-white z-20 rounded-full hover:bg-purple-600 border-2 border-purple-900 box-content md:hidden'>
            <ArrowCircleUpIcon sx={{ fontSize: 40, color: purple[800], "&:hover": { color: 'white' } }} />
          </div>
          <div onClick={() => window.scrollTo(0, 0)} className='h-10 w-10 bg-white z-20 rounded-full hover:bg-purple-600 border-2 border-purple-900 box-content hidden md:block md:h-14 md:w-14'>
            <ArrowCircleUpIcon sx={{ fontSize: 55, color: purple[800], "&:hover": { color: 'white' } }} />
          </div>
        </div>
      }




    </div>
  )
}

export default BackToTop;
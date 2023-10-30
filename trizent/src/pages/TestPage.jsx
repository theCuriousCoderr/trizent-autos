import { ArrowBack, ArrowForwardIos, AvTimerOutlined, CameraAlt, CameraAltOutlined, CameraFrontOutlined, HomeMaxOutlined, HomeOutlined, ListAltOutlined, LogoutOutlined, PersonOffOutlined, PersonOutlineOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react'
import cat from "../images/cat.jpg"

function TestPage() {
  return (
    <div>
        <div className="mt-5">
            <p className="relative bg-red-30 text-center text-gray-900 font-bold text-lg font-mono">
                My Profile
                <div className='absolute left-0 top-0 w-[10%] bg-red-20'>
                    <ArrowBack />
                </div>
            </p>
            <div className='text-center mt-5 space-y-3'>
                <div className='relative w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-pink-600 to-fuchsia-600'>
                    <img src={cat} className='w-full h-full object-cover rounded-full' />
                    <div className='absolute bottom-0 right-0 bg-red-40'>
                        <CameraAlt sx={{fontSize:35, color: 'gray'}} />
                        {/* <CameraAlt */}
                    </div>
                </div>
                <div>
                    <p className='text-gray-900 text-xl font-bold capitalize leading-6'>Sir Meows-a-lot</p>
                    <p className="text-slate-400 font-semibold text-lg">pawsonline@gmail.com</p>
                </div>
               
            </div>
            <div className="w-[90%] mx-auto bg-green-70 space-y-5 my-5">
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='inline-block w-5 h-5 bg-red-200'></div>
                        <p>ydj</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='inline-block w-5 h-5 bg-red-200'></div>
                        <p>ydj</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='inline-block w-5 h-5 bg-red-200'></div>
                        <p>ydj</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='inline-block w-5 h-5 bg-red-200'></div>
                        <p>ydj</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='inline-block w-5 h-5 bg-red-200'></div>
                        <p>ydj</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                
            </div>
            <div className='w-[90%] mx-auto mt-10'>
                <button className="h-10 relative items-center flex gap-5 justify-center bg-gray-900 w-full text-center text-gray-100 font-bold text-lg font-mono rounded-lg">
                    <div className=' w-[10%] bg-red-20'>
                        <LogoutOutlined />
                    </div>
                    <p>Log out</p>
                </button>
            </div>
           
        </div>
         {/* <div className='fixed bg-red-300 bottom-0 right-0 left-0 h-16 rounded-t-xl '>
      <HomeMaxOutlined />
      <HomeOutlined />
      <ListAltOutlined />
      <AvTimerOutlined />
      <VerifiedUserOutlined />
      <PersonOffOutlined />
      <PersonOutlineOutlined />
    </div> */}
    </div>
   
  )
}

export default TestPage;

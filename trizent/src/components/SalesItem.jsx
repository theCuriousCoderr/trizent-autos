import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalesItemInfo from './SalesItemInfo';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { red } from '@mui/material/colors';


function SalesItem({item, image, setSalesInfo}) {
    const [like, setLike] = useState(false);
 
    function handleLikeClick(e){
        e.stopPropagation();
        setLike(like => setLike(!like))
    }
    
    return (
        <div onClick={()=>setSalesInfo(item)} className='relative bg-[rgba(70,52,109,0.05)] hover:bg-[rgba(138,72,119,0.15)] active:bg-green-500 w-[45%] h-60 pb-3 mb-5 rounded-md overflow-hidden no-scrollbar shadow-sm md:w-56'>
            <div className='p-1 w-full h-1/2 overflow-hidden bg-red-40 relative flex items-center justify-center'>
                {item.url ? <img src={item.url} className='w-full relative h-full border-black bottom-0' /> : <img src={image} className='w-full relative h-full border-black bottom-0' /> }
            </div>
            <div className='z-10 relative w-full p-2 h-1/2 overflow-scrol no-scrollbar text-left text-sm leading-4 '>
                <div onClick={handleLikeClick} className='absolute w-[20%] h-8 bg-blac right-[5%] -top-4 rounded-full flex items-center justify-center'>
                    {!like ? 
                        <div onClick={handleLikeClick} className='relative flex justify-center items-center bg-black w-full h-full rounded-full'>
                            <FavoriteBorder sx={{fontSize: 20, color: 'white', fontWeight: 50, "&:hover": {color: red[100]} }}/>
                        </div> : 
                        <div onClick={handleLikeClick} className='relative flex justify-center items-center bg-[rgb(193,149,149)] w-full h-full rounded-full'>
                            <Favorite sx={{fontSize: 20, color: red[500]}}/>
                        </div>
                    }
                </div>
                <div className='mt-3 space-y-1'>
                    <h2 className='font-bold text-fuchsia-700 text-sm bg-red-20 truncate'>{item.Make + " " + item.Model + " " + item.Category}</h2>
                    {item.Year &&  <p className='font-bold text-slate-800'>{item.Year}</p>}
                    {item.Transmission && <p className='font-normal text-slate-800'>{item.Transmission}</p>}
                    {item.Color.toLowerCase() === "white" || item.Color.toLowerCase() === "black" ? 
                        <p className='font-normal text-slate-800 bg-red-20'>Color : {item.Color} <span className={`bg-${item.Color.toLowerCase()} w-3 h-3 inline-block rounded-full float-right`}></span></p> :
                        <p className='font-normal text-slate-800 bg-red-20'>Color : {item.Color} <span className={`bg-${item.Color.toLowerCase()}-400 w-3 h-3 inline-block rounded-full float-right`}></span></p>  
                    }
                    {item.Price && <p className='font-normal text-slate-800'>Price : {item.Price}</p>}
                </div>
               
            </div>
        </div> 
    )
}

export default SalesItem
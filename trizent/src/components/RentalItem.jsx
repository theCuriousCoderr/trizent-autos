import React, { useState } from 'react';
import car1 from '../images/car1.jpg';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import LuggageIcon from '@mui/icons-material/Luggage';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { red } from '@mui/material/colors';

function RentalComp({ item, image, setSalesInfo }) {
    const [like, setLike] = useState(false);

    function handleLikeClick(e) {
        e.stopPropagation();
        setLike(like => setLike(!like))
    }

    return (
        <div onClick={() => setSalesInfo(item)} className='relative bg-[rgba(70,52,109,0.05)] hover:bg-[rgba(138,72,119,0.15)] active:bg-green-500 w-[45%] h-60 pb-3 mb-5 rounded-md overflow-hidden no-scrollbar shadow-sm md:w-56'>
            <div className='p-1 w-full h-1/2 overflow-hidden bg-red-40 relative flex items-center justify-center'>
                {item.url ? <img src={item.url} className='w-full relative h-full border-black bottom-0' /> : <img src={image} className='w-full relative h-full border-black bottom-0' />}
            </div>
            <div className='z-10 relative w-full p-2 h-1/2 overflow-scrol no-scrollbar text-left text-sm leading-4 '>
                <div onClick={handleLikeClick} className='absolute w-[20%] h-8 bg-blac right-[5%] -top-4 rounded-full flex items-center justify-center'>
                    {!like ?
                        <div onClick={handleLikeClick} className='relative flex justify-center items-center bg-black w-full h-full rounded-full'>
                            <FavoriteBorder sx={{ fontSize: 20, color: 'white', fontWeight: 50, "&:hover": { color: red[100] } }} />
                        </div> :
                        <div onClick={handleLikeClick} className='relative flex justify-center items-center bg-[rgb(193,149,149)] w-full h-full rounded-full'>
                            <Favorite sx={{ fontSize: 20, color: red[500] }} />
                        </div>
                    }
                </div>
                <div className='mt-3 space-y-[2px]'>
                    <h2 className='font-bold text-fuchsia-700 text-sm  bg-red-20 truncate'>{item.Make + " " + item.Model + " " + item.Category}</h2>
                    {item.Year && <p className='font-bold text-slate-800'>{item.Year}</p>}
                    {item.Seats && <p className='font-normal text-slate-800'>Seats : {item.Seats}</p>}
                    <div className='w-40 mx-auto '>
                        {item.Bags &&
                            <div className='flex items-center justify-between'>
                                <div className='w-10 inline-block text-left'>
                                    <LuggageIcon />
                                </div>
                                <div className='w-full'>
                                    <p className='font-normal text-slate-800 inline-block font-roboto'>{item.Bags.Large + `${item.Bags.Large > 1 ? " Large Bags" : " Large Bag"}`}</p>
                                </div>

                            </div>
                        }
                        {item.Bags &&
                            <div className='flex items-center justify-between'>
                                <div className='w-10 inline-block text-left'>
                                    <WorkOutlineIcon />
                                </div>
                                <div className='w-full'>
                                    <p className='font-normal text-slate-800 inline-block font-roboto'>{item.Bags.Small + `${item.Bags.Small > 1 ? " Small Bags" : " Small Bag"}`}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentalComp;
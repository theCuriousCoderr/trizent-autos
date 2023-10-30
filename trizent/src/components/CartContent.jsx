import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { grey, orange, purple, green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

function CartContent({cartCount}) {
    let navigate = useNavigate();
    
    return (
        <>
        {/* <p className='text-red-400 absolute top-40'>CC : {(cartCount)}</p> */}
        <div onClick={()=> {window.scrollTo(0, 0); navigate("/cart")}} className='fixed bottom-8 left-5 h-10 w-10  z-20  box-content animate-bounce md:left-7 '>
            <div className='absolute -z-10 bg-red-600 h-6 w-5 pb-9 text-center left-4 bottom-5 text-white font-bold font-roboto'>
                <p className=''>{cartCount}</p>
            </div>
            <div className='flex align-middle justify-center relative'>
                <div>
                     <div className='absolute -z-10 left-[1px] md:hidden'>
                        <ShoppingCartIcon sx={{fontSize:50, color: purple[700] }} />
                    </div>
                    <div className='hidden absolute -z-10 left-[1px] md:block md:-left-1'>
                        <ShoppingCartIcon sx={{fontSize:70, color: purple[700] }} />
                    </div>
                </div>
                <div>
                    <div className='md:hidden'>
                        <ShoppingCartIcon sx={{fontSize:50, color: orange[900], "&:hover": {color: green[700]} }} />
                    </div>
                    <div className='hidden md:block'>
                        <ShoppingCartIcon sx={{fontSize:70, color: orange[900], "&:hover": {color: green[700]} }} />
                    </div>
                </div>
                
            </div>
        </div>
        </>
      )
}

export default CartContent;
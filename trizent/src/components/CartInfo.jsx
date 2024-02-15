// CartInfo is a child component of Cart component

import React, { useEffect, useState } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import RemovePrompt from './RemovePrompt';
import Remove from './Remove';
import car1 from '../images/car1.jpg'
import SalesItemInfo from './SalesItemInfo';


function CartInfo({salesInfo, image, setCartItems, cartItems, setCount, setTotalPrice, priceFormat}) {
    const [ removePrompt, setRemovePrompt ] = useState("hide");
    const [ showInfo, setShowInfo ] = useState(false)
 

    function addToCart(param) {
        let user = localStorage.getItem("user");
        
        user = JSON.parse(user);
        let cartItem;
        let newCartItems;
        for (let items of cartItems) {
            if (items === salesInfo){
                if (param === "add"){
                    items = {...items, "Count":items.Count++};
                    newCartItems = [...cartItems];
                    setTotalPrice(prevPrice => prevPrice);
                    setCartItems(newCartItems);
                }
                if (param === "minus"){
                    if (items.Count === 1) {
                        newCartItems = cartItems.filter(item => item !== items)
                        setTotalPrice(prevPrice => prevPrice);
                        setCartItems(newCartItems);
                        localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
                        return 0;
                    }
                    items = {...items, "Count":items.Count--};
                    if (items.Count === 0) {
                        items = {};
                    }
                    newCartItems = [...cartItems];
                    setTotalPrice(prevPrice => prevPrice);
                    setCartItems(newCartItems);
                }
                localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
            }
        }
    }

    function showPrompt(param) {
        if (param === "show"){
            setRemovePrompt("show");
        }
        if (param === "hide") {
            setRemovePrompt("hide");
        }
    }

    function handleRemoveItem(){
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        for (let items of cartItems) {
            if (items === salesInfo){
                while (salesInfo.Count !== 0 ){
                    addToCart("minus");
                }
            }
        }
        setRemovePrompt("hide");
    }

    function handleShowInfo() {

    }


   

  return (
    <>
    { removePrompt === "show" && <RemovePrompt setRemovePrompt={setRemovePrompt} cartItems={cartItems} setCartItems={setCartItems} salesInfo={salesInfo} /> }
    {/* {setCartTotalPrice(prevPrice => prevPrice + priceFormat(salesInfo.Price))} */}
    { salesInfo.Count > 0 && 
    <div onClick={()=> setShowInfo(true)} className='mx-2 hover:bg-slate-200 mb-5 p-1 rounded-lg md:flex md:flex-wrap md:w-full'>
        { showInfo && 
        <div onClick={(e)=> {e.stopPropagation(); setShowInfo(false)}} className='fixed flex pt-10 justify-center z-50 top-0 left-0 w-full h-full bg-gray-950 bg-opacity-100'>
            <div>
                <SalesItemInfo salesInfo={salesInfo} car1={car1} setCartItems={setCartItems} cartItems={cartItems}  state={false} />
            </div>


            
            {/* salesInfo, car1, setCartItems, cartItems, tag, state=true} */}
        </div>}
        <div className='bg-blue-70  items-center justify-between flex flex-nowrap md:flex md:flex-wrap md:flex-col md:w-1/3 md:mt-24'>
            <div className='w-[30%] bg-red-30 border-2 border-slate-300 overflow-hidden rounded-lg'>
                 {salesInfo.url ? <img src={salesInfo.url} alt={salesInfo.Year + " " + salesInfo.Make + " " + salesInfo.Model + " " + salesInfo.Category} className='w-80 md:w-full' /> : <img src={car1} alt="Display Image Car." className='w-full h-full md:w-full' /> }
            </div>
            
            <div className='w-[65%] bg-red-30 hidde md:block md:text-center '>
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-gray-950 text-md'>{salesInfo.Make + " " + salesInfo.Model}</h2>
                    <div>
                        <Remove showPrompt={showPrompt} />
                    </div>
                </div>
               
                
                <p className='relative bg-gray-900 font-normal text-white rounded px-2 py-1 inline-block text-center mx-aut text-xs'>
                    
                    {/* <div className='absolute bottom-1 right-1 w-1 h-1 rounded-full bg-white'></div>
                    <div className='absolute top-1 left-1 w-1 h-1 rounded-full bg-white'></div> */}
                    {salesInfo.Tag}
                </p>

                <div className='flex items-center'>
                    { salesInfo.Price && <p className='p-1 bg-violet-40 text-lg rounded text-gray-900 font-bold font-mono '> ${salesInfo.Price} </p>}
                    <div className='w-full mx-auto text-center mt-'>
            {
                salesInfo.Count > 0 && 
                <div className='md:flex md:justify-evenly'>
                    {/* <div>
                        <Remove showPrompt={showPrompt} />
                    </div> */}
                    <div className=' flex justify-end mr-2'>
                        <div className='w-8 flex justify-center'>
                            <button onClick={(e)=> { e.stopPropagation(); addToCart("minus")}} className='text-white w-full font-bold bg-red-600 h-8 text-lg rounded-xl active:bg-red-400'>-</button>
                        </div>
                        <div className=' w-10 flex justify-center'>
                            <button className='text-black w-full font-bold p- text-lg rounded-xl'>{salesInfo.Count}</button>
                        </div>
                        <div className=' w-8 flex justify-center'>
                            <button onClick={(e)=> {e.stopPropagation(); addToCart("add")}} className='text-white w-full font-bold bg-green-600 h-8 text-lg rounded-xl active:bg-green-400'>+</button>
                        </div>
                    </div>
                </div>
            }
        </div>
                </div>
             
                
            </div>

           
        </div>
        
        <div className='p-2 text-center space-y-2 md:inline-block md:w-2/3'>
            <div className='hidden md:hidden'>
                <h2 className='font-bold text-purple-800 text-lg'>{salesInfo.Year + " " + salesInfo.Make + " " + salesInfo.Model + " " + salesInfo.Category}</h2>
                <p className='border-4 border-purple-900 rounded-xl font-bold text-black p-2 w-20 text-center mx-auto'>{salesInfo.Tag}</p>
            </div>

            <div className='p-2 text-center space-y-2 hidden' >
                { salesInfo.Transmission && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Transmission: </span>{salesInfo.Transmission}</p>}
                { salesInfo.Color && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Color :</span> {salesInfo.Color}</p>}
                { salesInfo.Mileage && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Mileage :</span> {salesInfo.Mileage} </p>}
                { salesInfo.Price && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Price:</span> {salesInfo.Price} </p>}
                { salesInfo.Seats && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Seats :</span> {salesInfo.Seats} </p>}
                { salesInfo.Bags && <div className='p-1 bg-violet-400 rounded text-white font-bold font-mono '>
                    <p className='text-purple-900'>Luggage Capacity :</p>
                    <div className=''>
                        <p>{salesInfo.Bags.Large + `${salesInfo.Bags.Large > 1 ? " Large Bags" : " Large Bag" }`}</p>
                        <p>{salesInfo.Bags.Small + `${salesInfo.Bags.Small > 1 ? " Small Bags" : " Small Bag" }`}</p>
                    </div>
                </div>}
                {salesInfo.pickUp && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Pick-Up Location :</span> {salesInfo.pickUp} </p> }
                {salesInfo.return ? <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Return Location :</span> {salesInfo.return} </p> : <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Return Location :</span> {salesInfo.pickUp} </p>  }
                {salesInfo.pickUpDate && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Pick-Up Date :</span> {salesInfo.pickUpDate} </p> }
                {salesInfo.returnDate && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Return Date :</span> {salesInfo.returnDate} </p> }
                <div>
                    {salesInfo.Recommendation && <p className='p-1 bg-violet-400 rounded text-red-600 font-bold font-mono '>{salesInfo.Recommendation} </p> }
                </div>
            </div>
           
        </div>
       
    </div> } </>
        
  )
}

export default CartInfo;
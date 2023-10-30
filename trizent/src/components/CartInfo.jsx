// CartInfo is a child component of Cart component

import React, { useEffect, useState } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import RemovePrompt from './RemovePrompt';
import Remove from './Remove';


function CartInfo({salesInfo, image, setCartItems, cartItems, setCount, setTotalPrice, priceFormat}) {
    const [ removePrompt, setRemovePrompt ] = useState("hide");
 

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


   

  return (
    <>
    { removePrompt === "show" && <RemovePrompt setRemovePrompt={setRemovePrompt} cartItems={cartItems} setCartItems={setCartItems} salesInfo={salesInfo} /> }
    {/* {setCartTotalPrice(prevPrice => prevPrice + priceFormat(salesInfo.Price))} */}
    { salesInfo.Count > 0 && 
    <div className=' w-80 mx-auto mb-10 p-1 pb-3 rounded-lg border-4 border-purple-900 md:flex md:flex-wrap md:w-full'>
        <div className='md:flex md:flex-wrap md:flex-col md:w-1/3 md:mt-24'>
            {salesInfo.url ? <img src={salesInfo.url} alt={salesInfo.Year + " " + salesInfo.Make + " " + salesInfo.Model + " " + salesInfo.Category} className='w-80 md:w-full' /> : <img src={image} alt="Display Image Car." className='w-80 md:w-full' /> }
            <div className='hidden md:block md:text-center '>
                <h2 className='font-bold text-purple-800 text-lg'>{salesInfo.Year + " " + salesInfo.Make + " " + salesInfo.Model + " " + salesInfo.Category}</h2>
                <p className='border-4 border-purple-900 rounded-xl font-bold text-black p-2 w-20 text-center mx-auto'>{salesInfo.Tag}</p>
            </div>
        </div>
        
        <div className='p-2 text-center space-y-2 md:inline-block md:w-2/3'>
            <div className='md:hidden'>
                <h2 className='font-bold text-purple-800 text-lg'>{salesInfo.Year + " " + salesInfo.Make + " " + salesInfo.Model + " " + salesInfo.Category}</h2>
                <p className='border-4 border-purple-900 rounded-xl font-bold text-black p-2 w-20 text-center mx-auto'>{salesInfo.Tag}</p>
            </div>

            <div className='p-2 text-center space-y-2' >
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
            {/* { salesInfo.Transmission && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Transmission: </span>{salesInfo.Transmission}</p>}
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
            </div> */}
        </div>
        <div className='w-full mx-auto text-center mt-5'>
            {
                salesInfo.Count > 0 && 
                <div className='md:flex md:justify-evenly'>
                    <div>
                        <Remove showPrompt={showPrompt} />
                    </div>
                    <div className=' flex justify-end mr-2'>
                        <div className=' w-10 flex justify-center'>
                            <button onClick={()=> addToCart("minus")} className='text-white w-full font-bold bg-red-600 p-3 text-lg rounded-xl active:bg-red-400'>-</button>
                        </div>
                        <div className=' w-14 flex justify-center'>
                            <button className='text-black w-full font-bold p-3 text-lg rounded-xl'>{salesInfo.Count}</button>
                        </div>
                        <div className=' w-10 flex justify-center'>
                            <button onClick={()=>addToCart("add")} className='text-white w-full font-bold bg-green-600 p-3 text-lg rounded-xl active:bg-green-400'>+</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div> } </>
        
  )
}

export default CartInfo;
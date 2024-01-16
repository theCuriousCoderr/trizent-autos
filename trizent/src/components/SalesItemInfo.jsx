// SalesItemInfo is a child component of Services component

import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import PopUp from './PopUp';
import RentForm from './RentForm';
import { ArrowForward } from '@mui/icons-material';

function SalesItemInfo({salesInfo, car1, setCartItems, cartItems, tag, state=true}) {
    const [ addedPrompt, setAddedPrompt ] = useState("hidden");
    const [rentForm, setRentForm] = useState("hideRentFormPrompt");
    const [rentFormState, setRentFormState] = useState("");
    const [rentalData, setRentalData] = useState({
        "pickUp" : "",
        "return" : "",
        "pickUpDate" : "",
        "returnDate": ""
      });
    let navigate = useNavigate();
    useEffect(()=> {
        // window.scrollTo(0, 0);
        // window.location.reload();
        // alert("SalesItemInfo");
        setRentFormState("")
    }, [addedPrompt]);

    let user = localStorage.getItem("user");
    user = JSON.parse(user); 

    let flag;
    try {
        if (cartItems.length > 0) {
            flag = "yes";
        }
    } catch (error) {
        flag = "no";
        
    }

    let newCartItems, found, cartItem;
    function addToCart() {
        if (user.loggedIn === "false"){
            navigate("/sign-in");
            return;
        }
        // let cartItem;
        // let newCartItems;
        // let found;
        if (tag === "Sales") {
            if (flag === "yes") {
        
            for (let items of cartItems) {
                if (items.objectId === salesInfo.objectId && items.Tag === "Sales") {
                    items = {...items, "Count":items.Count++}
                    newCartItems = [...cartItems];
                    found = "yes"
                    break;
                }
                found = "no"
            }
            if (found === "no") {
                cartItem = {...salesInfo,"Tag": "Sales", "Count": 1};
                newCartItems = [...cartItems, cartItem];
            }
            } else {
                cartItem = {...salesInfo,"Tag": "Sales", "Count": 1};
                newCartItems = [cartItem];
            }
            localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
            setCartItems(newCartItems);
            setAddedPrompt("show");
        } else {
            setRentFormState("open");
            setRentForm("showRentFormPrompt");
        }
        // window.location.reload();
    }

    if ( rentalData.pickUp.length > 0) {
        // setRentFormState("");
        if (flag === "yes" && rentForm === "hideRentFormPrompt" ) {
            // alert("SII");
            for (let items of cartItems) {
                if (items.objectId === salesInfo.objectId && items.Tag === "Rentals") { 
                    //test-site here 
                    items = {...items,...rentalData, "Count":items.Count++};
                    // items ={...items, ...rentalData}
                    // alert(JSON.stringify(rentalData));
                    newCartItems = [...cartItems];
                    found = "yes";
                    break;
                }
                found = "no";
            }
            if (found === "no") {
                // alert("STT")
                //test-sitee here
                cartItem = {...salesInfo,"Tag": "Rentals", "Count": 1};
                newCartItems = [...cartItems, ...rentalData, cartItem];
            }
            // setAddedPrompt("show");
            localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
            setCartItems(newCartItems);
            setAddedPrompt("show");
            setRentalData({
                "pickUp" : "",
                "return" : "",
                "pickUpDate" : "",
                "returnDate": ""
            });
        } else if (flag === "no" && rentForm === "hideRentFormPrompt" ) {
            //test-site here
            cartItem = {...salesInfo, ...rentalData, "Tag": "Rentals", "Count": 1};
            newCartItems = [cartItem];
            // setAddedPrompt("show");
            localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
            setCartItems(newCartItems);
            setAddedPrompt("show");
            setRentalData({
                "pickUp" : "",
                "return" : "",
                "pickUpDate" : "",
                "returnDate": ""
            });
        }
    }

    
    if (addedPrompt === "show" ){
        setTimeout(() => {
            setAddedPrompt("hidden");
        }, 1000);
    }

    return (
        <>
        {/* <p>{JSON.stringify(rentalData)}</p> */}
        {/* <div> */}
            {rentForm === "showRentFormPrompt" && <RentForm setRentFormState={setRentFormState} newCartItems={newCartItems} rentalData={rentalData} setRentalData={setRentalData} setRentForm={setRentForm} setAddedPrompt={setAddedPrompt} cartItems={cartItems} salesInfo={salesInfo} setCartItems={setCartItems} />}
        {/* </div> */}
        
        {addedPrompt === "show" && <PopUp addedPrompt={addedPrompt} text="Item Added Successfully !"  />}
        <div className='bg-gradient-to-r from-orange-50 to-purple-300 w-80 mx-auto mb-20 pb-3 rounded-lg border- border-purple-900 md:w-[25rem]'>
            <div className='relat'>
            {salesInfo.url ? <img src={salesInfo.url} alt={salesInfo.Year + " " + salesInfo.Make + " " + salesInfo.Model + " " + salesInfo.Category} className='w-80 md:w-full' /> : <img src={car1} alt="Display Car." className='w-80 md:w-full' /> }
            </div>
            
            <div className='relative p-2 text-center space-y-2 md:text-2xl pt-14'>
                <div className='absolute -top-5 left-0 bg-gradient-to-r from-orange-50 to-orange-500 text-left px-4'>
                    <p className='font-bold text-xl'>{salesInfo.Year}  {salesInfo.Make}</p>
                    {/* <p>{salesInfo.Make}</p> */}
                    <p className='font-medium'>{salesInfo.Model}</p>
                    <p className='font-normal'>{salesInfo.Category}</p>
                    
                </div>
                
               
               <div className=''>
                    <p className='text-left font-medium text-slate-00'>Specifications</p>
                    <div className='flex overflow-scroll w-full gap-5'>
                        { salesInfo.Transmission && <p className='p-1 bg-[rgba(74,120,80,0.13)] rounded text-slate-900 font-mono min-w-[10rem] border-2 border-purple-500 flex flex-col text-left px-5'><span className='text-purple-900 font-bold bg-red-20'>Transmission: </span>{salesInfo.Transmission}</p>}
                        {/* { salesInfo.Color && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono min-w-[10rem]'><span className='text-purple-900'>Color :</span> {salesInfo.Color}</p>} */}
                        { salesInfo.Color && <p className='p-1 bg-[rgba(74,120,80,0.13)] rounded text-slate-900 font-mono min-w-[10rem] border-2 border-purple-500 flex flex-col text-left px-5'><span className='text-purple-900 font-bold bg-red-20'>Color: </span>{salesInfo.Color}</p>}
                        { salesInfo.Mileage && <p className='p-1 bg-[rgba(74,120,80,0.13)] rounded text-slate-900 font-mono min-w-[10rem] border-2 border-purple-500 flex flex-col text-left px-5'><span className='text-purple-900 font-bold bg-red-20'>Mileage: </span>{salesInfo.Mileage} km</p>}
                        { salesInfo.Seats && <p className='p-1 bg-[rgba(74,120,80,0.13)] rounded text-slate-900 font-mono min-w-[10rem] border-2 border-purple-500 flex flex-col text-left px-5'><span className='text-purple-900 font-bold bg-red-20'>Seats: </span>{salesInfo.Seats}</p>}
                        
                    </div>
               </div>
               { salesInfo.Bags && <div className='p-1 bg-[rgba(74,120,80,0.13)] rounded text-slate-900 font-mono min-w-[10rem] border-2 border-purple-500 flex flex-col text-left px-5'>
                    <p className='text-purple-900 font-bold'>Luggage Capacity :</p>
                    <div className=''>
                        <p>{salesInfo.Bags.Large + `${salesInfo.Bags.Large > 1 ? " Large Bags" : " Large Bag" }`}</p>
                        <p>{salesInfo.Bags.Small + `${salesInfo.Bags.Small > 1 ? " Small Bags" : " Small Bag" }`}</p>
                    </div>
                </div>}
                <div>
                    {salesInfo.Recommendation && <p className='p-1 bg-violet-400 rounded text-red-600 font-bold font-mono '>{salesInfo.Recommendation} </p> }
                </div>
               <div className='flex items-end justify-end'>
                    <span className='text-2xl font-semibold'>$</span>
                    { salesInfo.Price && <p className='text-4xl font-semibold'>{salesInfo.Price.slice(0)}</p>}
               </div>
                
               
               
            </div>
            { state && <div className='w-full p-5 mx-auto text-center mt-0 md:w-full md:p-3 md:text-2xl'>
                { (tag === "Sales") ? 
                    <button name="sales" onClick={addToCart} className='group w-full bg-gray-900 p-2 rounded-lg hover:bg-white flex justify-between items-center active:bg-green-600 md:w-full'>
                        <p className='text-slate-200 ml-2 text-base hover:text-gray-900 group-hover:text-gray-900'>BUY NOW</p>
                        <div className='bg-slate-50 rounded w-[15%]'>
                            <ArrowForward sx={{color: 'black'}} />
                        </div>
                    </button> : 
                    <button name="sales" onClick={addToCart} className='group w-full bg-gray-900 p-2 rounded-lg hover:bg-white flex justify-between items-center active:bg-green-600 md:w-full'>
                        <p className='text-slate-200 ml-2 text-base hover:text-gray-900 group-hover:text-gray-900'>RENT NOW</p>
                        <div className='bg-slate-50 rounded w-[15%]'>
                            <ArrowForward sx={{color: 'black'}} />
                        </div>
                    </button>
                }
            </div> }
            {/* <p className='my-2 mx-1 p-2 bg-red-300 text-center text-red-800 font-bold md:text-lg'>You can come to the store to check out the car before proceeding to make payment.</p> */}
        </div> 
        </>
    )
}

export default SalesItemInfo;
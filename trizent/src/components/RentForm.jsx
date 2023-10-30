import React, { useEffect, useState} from 'react';
import { Add, Search} from '@mui/icons-material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function RentForm({setRentFormState, newCartItems, rentalData, setRentalData, setRentForm, setAddedPrompt, cartItems, salesInfo, setCartItems}) {
    const [select, setSelect ] = useState("");

    // useEffect(()=> { window.scrollTo(0, 0); }, []);

    let navigate = useNavigate();


    function handleChange(e) {
        setRentalData({...rentalData, [e.target.name] : e.target.value});
    }

    let flag;
    // alert(JSON.stringify(cartItems))
    try {
        if (cartItems.length > 0) {
            flag = "yes";
        } else {
            flag = "no";
        }
    } catch (error) {
        flag = "no";
    }


    // let select = "";
    let count = 0;
    let user = localStorage.getItem("user");
    user = JSON.parse(user); 

    function handleClick() {
        // checks if the necessary input fields were filled and picks out the first field that wasnt filled
        for (let items in rentalData) {
            // alert(items)
            if (items === "return") {
                continue;
            }
            if (rentalData[items].length === 0) {
                setSelect(items);
                break;
            }
            count++;
        }
        if (count !== 3) {
            return;
        }
        // if (rentalData.return.length === 0){
        //     setRentalData({...rentalData, "return": rentalData.pickUp})
        // }

        let cartItem, found;
        if (flag === "yes" && rentalData.pickUp.length > 0) {
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
                // alert("STT");
                //test-sitee here
                cartItem = {...salesInfo,...rentalData,...cartItem, "Tag": "Rentals", "Count": 1};
                cartItems.push(cartItem)
                newCartItems = cartItems
            }
            // setAddedPrompt("show");
        } else if (flag === "no" && rentalData.pickUp.length > 0) {
            // alert("yo")
            //test-site here
            cartItem = {...salesInfo, ...rentalData, "Tag": "Rentals", "Count": 1};
            newCartItems = [cartItem];
            // setAddedPrompt("show");
        }
        // }
        localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
        setCartItems(newCartItems);
        // alert(cartItems.length)
        setAddedPrompt("show");
        setRentForm("hide");
        setRentFormState("close");
    }

    // if (select) {
    //     let el = document.getElementById(select);
    //     el.style.backgroundColor = "red";
    // }
        
    return (
    <>
        <div onClick={()=> setRentForm("hideRentFormPrompt")} className='fixed top-0 bg-slate-900 opacity-50 h-full w-full'></div>
        <h1 className='font-bold text-xl text-center'>Rentals Form</h1>
        <div className='border-2 border-black m-2'></div>
       
       <div className='fixed top-[15%]  h-96 w-full mx-auto px-3'> 
        <div  className='mx-auto bg-white h-[25rem] w-fu rounded-xl p-3 shadow-lg md:w-4/5 md:left-[10%] md:top-1/4 md:h'>
            <p className='p-1 border-b border-orange-600 inline-block font-bold md:text-2xl'>Rent Cars</p>
            { select && 
                <div className={` text-pink-500 font-bold text-center bg-pink-200 p-2 rounded-lg mb-5 mt-3 `} >
                    <p>Fill in the field in red !</p>
                </div> 
            }
            <div className='mt-5'>
                <p className='text-black font-normal md:text-2xl'>Pick-up & return</p>
                <div className='relative'>
                    <div className='absolute left-2 top-2'>
                        <Search sx={{color: purple[800]}} />
                    </div>
                    {select === "pickUp" ? <input id="pickUp" name="pickUp" value={rentalData.pickUp} onChange={handleChange} type="text" placeholder="Airport, city or address" className={`bg-red-300 w-full border-b-2 border-orange-500 px-10 h-10 placeholder:font-bold placeholder:text-gray-600 hover:border-orange-300 focus:bg-white`} />
                    : <input id="pickUp" name="pickUp" autoComplete='off' value={rentalData.pickUp} onChange={handleChange} type="text" placeholder="Airport, city or address" className={`w-full border-b-2 border-orange-500 px-10 h-10 md:text-2xl placeholder:font-bold placeholder:text-gray-600 md:placeholder:text-2xl hover:border-orange-300 focus:bg-white`} /> }
                    
                </div>
            </div>
            <div className='mt-2 '>
                
                <button className='group inline-block ml-1 text-slate-500 font-semibold font-roboto text-sm p-1'>
                    <div className='flex align-middle md:text-xl'>
                        <span className='text-lg mr-1 md:text-2xl'>+</span>
                        <p className='mt-1 md:text-xl md:-mt-0'> Different return location</p>
                    </div>
                    <details open className='text-left border border-orange-400 px-2 hidden group-focus-within:block accent-white'>
                        <summary></summary>
                        <input name="return" autoComplete='off' value={rentalData.return} onChange={handleChange} type="text" className='border focus:border-white h-5 outline-none' />
                    </details>
                </button>
            </div>
            <div className='flex justify-between gap-3 mt-7'>
                <div className=' flex flex-col gap-2'>
                    <p className='text-slate-600 text-sm md:text-2xl'>Pick-up date</p>
                    {select === "pickUpDate" ? <input id="pickUpDate" name="pickUpDate" value={rentalData.pickUpDate} onChange={handleChange} type="date" className={`bg-red-300 p-1 border-b border-slate-700 font-semibold w-36 placeholder:text-[.9rem] focus:bg-white  md:text-2xl`} placeholder='Select pick-up date' />
                    : <input id="pickUpDate" autoComplete='off' name="pickUpDate" value={rentalData.pickUpDate} onChange={handleChange} type="date" className={`p-1 border-b border-slate-700 font-semibold w-36 placeholder:text-[.9rem] md:text-2xl`} placeholder='Select pick-up date' /> }
                    
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-slate-600 text-sm md:text-2xl'>Return Date</p>
                    {select === "returnDate" ?  <input id="returnDate" name="returnDate" value={rentalData.returnDate} onChange={handleChange} type="date" className={`bg-red-300 p-1 border-b border-slate-700 font-semibold w-36 placeholder:text-[.9rem] focus:bg-white  md:text-2xl`} placeholder='Select return date' />
                    :  <input id="returnDate" autoComplete='off' name="returnDate" value={rentalData.returnDate} onChange={handleChange} type="date" className={`p-1 border-b border-slate-700 font-semibold w-36 placeholder:text-[.9rem]  md:text-2xl`} placeholder='Select return date' /> }
                </div>
            </div>
            <div className='text-center relative mt-5 h-12'>
                <button onClick={handleClick} className='w-full h-full bg-orange-600 text-white font-bold font-roboto hover:bg-orange-500 md:text-xl'>RENT CAR</button>
            </div>
        </div>
        </div>
    </>
    )
    }

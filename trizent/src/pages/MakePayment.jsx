import React, { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { purple, orange, green } from '@mui/material/colors';
import DebitCards from '../components/DebitCards';
import { toMoneyString } from '../toMoneyString';
import { useNavigate } from 'react-router-dom';

function MakePayment({ isSignIn ,setIsSignIn, setCartItems, totalPrice}) {
    const [paymentState, setPaymentState] = useState("info");
    const [cardNoCount, setCardNoCount] = useState(0);
    const [success, setSuccess] = useState("no");
    const [paymentDetails, setPaymentDetails] = useState({
        "cardNumber": "",
        "expDate": "",
        "cvv": "",
        "firstName": "",
        "lastName": ""
    })
    useEffect(()=>{
        window.scrollTo(0, 0);
        let user = localStorage.getItem("user");
        let test;
        try {
            user = JSON.parse(user);
            test = user.loggedIn;
        } catch (error) {
            user = { "loggedIn": "false" };
        }
    
        if (user.loggedIn === "true"){
            setIsSignIn(n => true);
            // let user = localStorage.getItem("user");
            let cart = localStorage.getItem(user.email);
            try {
                cart = JSON.parse(cart);
                if (cart.length > 0){
                    setCartItems(n => setCartItems(cart));
                }
            } catch (error) {
                setCartItems(n => setCartItems([]));
            }
        } else {
            navigate("/sign-in");
        }
    },[]);
    let navigate = useNavigate();

    function handlePlaceholder(){
        let exp = document.getElementById("exp");
            exp.setAttribute("placeholder", "MM/YY");
    }
    function handlePaymentDetailsChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        if ((name === "cardNumber")) {
            if (cardNoCount === 4) {
                value = value + "-";
                setCardNoCount(0);
            }else {
                setCardNoCount(cardNoCount+1);
            }
        }
        setPaymentDetails({...paymentDetails, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSuccess("yes");
    }
   

  return (
    <>
    <h1 className='font-bold text-xl text-center md:text-2xl'>MAKE PAYMENT</h1>
    <div className='border-2 border-black m-2'></div>
    { paymentState === "info" ? 
    <div className=' md:w-2/3 md:mx-auto'>
        <div className='px-5 py-1 m-1 relative'>
            <div className='absolute left-16 flex align-middle justify-center'>
                <div className='absolute'>
                    <CircleOutlinedIcon sx={{fontSize: 85, color:purple[500]}}  />
                </div>
                <div className='absolute -top-2'>
                    <CircleOutlinedIcon sx={{fontSize: 100, color:'white'}}  />
                </div>
                <div className='absolute top-5'>
                    <LockOutlinedIcon sx={{fontSize:40, color:purple[500]}}  />
                </div>
            </div>
            <div className='mt-28 px-3 space-y-2 md:space-y-3'>
                <h2 className='font-bold text-2xl font-roboto text-slate-950'>Choose how to pay</h2>
                <p className='text-slate-800 md:text-xl'>Your payment is encrypted and you can change how you pay anytime.</p>
                <div className='font-medium text-slate-950 font-roboto md:text-xl'>
                    <p>Secure for peace of mind.</p>
                    <p>Cancel easily online.</p>
                </div>
            </div>
            <div className='relative mt-6'>
                <div className='flex align-middle justify-end gap-1 mb-1'>
                     <p className='inline-block text-[0.8rem] font-roboto mt-1 font-medium md:text-lg '>End-to-end encrypted</p>
                     <div className='md:hidden'>
                        <LockIcon sx={{fontSize: 15,color:orange[500]}} />
                     </div>
                     <div className='hidden md:block'>
                        <LockIcon sx={{fontSize:20,color:orange[500]}} />
                     </div>
                </div>
                <div className='relative border-2 border-purple-500 rounded px-4 py-4 flex justify-between align-middle '>
                    <div>
                        <p className='md:text-xl'>Credit or Debit Card</p>
                        <DebitCards />
                    </div>
                    <div className=' mt-4 text-center'>
                        <button onClick={() => setPaymentState("paymentForm")} className= 'rounded-full text-center pl-1 py-1 hover:bg-gray-300'>
                             <ArrowForwardIosIcon sx={{color:purple[800]}} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div> :
    <>
        { success === "no" ? 
            <div className=' px-5 py-4 m-1 relative md:w-2/3 md:mx-auto'>
            {/* <h1 className='font-bold text-xl text-center'>MAKE PAYMENT</h1> */}
            <button  onClick={() => setPaymentState("info")} className='text-sm p-3 bg-pink-200 text-pink-600 rounded-md' >
                This is a dummy page, it only renders the UI for the page.  The payment gateway doesn't actually work.
                There is no functionality implemented such as third-party card processing, card validation and the likes 
                and so, it is advised not to waste your time inputing correct/accurate card details. 
                You can just play around with the fields/form to see the different states that was implemented. 
                Clicking <span className='text-green-500 font-bold'>Make Payment</span> displays a "Payment Successful".
            </button>
            <div className='border-2 border-black m-2'></div>
            <h2 className='font-bold text-2xl font-roboto'>Set up your credit or debit card</h2>
            <DebitCards />
    
            <form onSubmit={handleSubmit} className='space-y-2 mt-4 mb-32'>
                <div className='relative'>
                    <input name="cardNumber" type="text" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} placeholder='Card number' className='border border-purple-600 peer px-2 h-12 w-full text-[0.8rem] rounded-sm placeholder:text-slate-500 placeholder:font-normal focus-within:placeholder:text-white focus-within:pt-3 '/>
                    <p className='peer-focus-within:block peer-focus-within:-top-0  px-2 text-[0.8rem] absolute hidden'>Card Number</p>
                </div>
                
                <div className='w-full flex flex-row justify-between gap-2' >
                    <div className='relative'>
                        <input name="expDate" id="exp" onClick={handlePlaceholder} type="text"  value={paymentDetails.expDate} onChange={handlePaymentDetailsChange} placeholder='Expiration Date' className='border border-purple-600 peer px-2 h-12 w-full text-[0.8rem] rounded-sm placeholder:text-slate-500 placeholder:font-normal focus-within:pt-3 '/>
                        <p className='peer-focus-within:block peer-focus-within:-top-0  px-2 text-[0.8rem] absolute hidden'>Expiration Date</p>
                    </div>
                    <div className='relative'>
                        <input name="cvv" type="text"  value={paymentDetails.cvv} onChange={handlePaymentDetailsChange} placeholder='CVV' className='border border-purple-600 peer px-2 h-12 w-full text-[0.8rem] rounded-sm placeholder:text-slate-500 placeholder:font-normal focus-within:placeholder:text-white focus-within:pt-3 '/>
                        <p className='peer-focus-within:block peer-focus-within:-top-0  px-2 text-[0.8rem] absolute hidden'>CVV</p>
                    </div>
                </div>
                <div className='relative'>
                    <input name="firstName" type="text"  value={paymentDetails.firstName} onChange={handlePaymentDetailsChange} placeholder='First name' className='border border-purple-600 peer px-2 h-12 w-full text-[0.8rem] rounded-sm placeholder:text-slate-500 placeholder:font-normal focus-within:placeholder:text-white focus-within:pt-3 '/>
                    <p className='peer-focus-within:block peer-focus-within:-top-0  px-2 text-[0.8rem] absolute hidden'>First name</p>
                </div>
                <div className='relative'>
                    <input name="lastName" type="text"  value={paymentDetails.lastName} onChange={handlePaymentDetailsChange} placeholder='Last name' className='border border-purple-600 peer px-2 h-12 w-full text-[0.8rem] rounded-sm placeholder:text-slate-500 placeholder:font-normal focus-within:placeholder:text-white focus-within:pt-3 '/>
                    <p className='peer-focus-within:block peer-focus-within:-top-0  px-2 text-[0.8rem] absolute hidden'>Last name</p>
                </div>
                <p className='p-2 bg-gray-200 rounded font-semibold opacity-90 text-center text-gray-900'>Amount to be charged : <span className='text-green-500'>${toMoneyString(totalPrice.toString())}</span> </p>
                <div className='relative'>
                    <input type="submit" value="Make Payment" className='w-full h-16 bg-green-500 text-white font-roboto text-xl hover:bg-green-700'/>
                </div>
            </form>
        </div> : 
       <div className='text-center mt-28 space-y-3'>
            <div>
                <CheckCircleIcon sx={{ color:green[500], fontSize:100 }} />
            </div>
            <p className='text-green-600 font-poppins text-xl'>Payment Successful</p>
            <button onClick={()=> navigate("/")} className=' text-blue-600 hover:underline'>Back to Home</button>
        </div>
        }
    </>
    
    }</>
  );
}

export default MakePayment;
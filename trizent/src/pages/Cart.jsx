import React, {useEffect, useState} from 'react';
import CartInfo from '../components/CartInfo';
import Remove from '../components/Remove';
import RemovePrompt from '../components/RemovePrompt';
import BackToTop from '../components/BackToTop';
import { useNavigate } from 'react-router-dom';
import { toMoneyString } from '../toMoneyString';
import ViewCatalogue from '../components/ViewCatalogue';

function Cart({ setCartItems, cartItems, count, setCount, cartCount,totalPrice, setTotalPrice}) {
    const [ removePrompt, setRemovePrompt ] = useState("hide");
    const [repairItem, setRepairItem]= useState({});
    let navigate = useNavigate(); 
   
    useEffect(()=>{
        window.scrollTo(0, 0);
        // window.location.reload();
        // alert("Cart")
        let user = localStorage.getItem("user");
        let test;
        try {
            user = JSON.parse(user);
            test = user.loggedIn;
        } catch (error) {
            user = { "loggedIn": "false" };
        }
    
        if (user.loggedIn === "true"){
            // alert("CCart")
            // setIsSignIn(true);

            let cart = localStorage.getItem(user.email);
            try {
                cart = JSON.parse(cart);
                if (cart.length > 0){
                    setCartItems(n => setCartItems(cart))
                    localStorage.setItem(`${user.email}`, JSON.stringify(cart));
                } else {
                    setCartItems(n => setCartItems([]));
                    localStorage.setItem(`${user.email}`, JSON.stringify(cart));
                }
            } catch (error) {
                setCartItems(n => setCartItems([]));
            }
        } else {
            navigate("/sign-in");
        }
        // window.location.reload();
    },[]);

    
    function showPrompt(param, items) {
        setRepairItem(n => items);
        if (param === "show"){
            setRemovePrompt("show");
        }
        if (param === "hide") {
            setRemovePrompt("hide");
        }
    }

    function priceFormat(param) {
        param = (param.replace("$", "")).replace(",", "");
        return parseInt(param);
    }

    let copyTotalPrice = 0;
    try {
        if (cartItems.length > 0) {
            for(let items of cartItems) {
                if (items.objectId) {
                    copyTotalPrice += priceFormat(items.Price) * parseInt(items.Count);
                } else{
                    if (items.location === "Home Service"){
                        copyTotalPrice += priceFormat(items.Price.home);
                    } else{
                        copyTotalPrice += priceFormat(items.Price.workshop);
                    }
                }
            }
            setTotalPrice(copyTotalPrice);
        } else {
            setTotalPrice(0);
        }
    } catch {
        setTotalPrice(0);
    }
    

    let flag;
    try {
        if (cartItems.length > 0) {
            flag = "yes";
        }
    } catch (error) {
        flag = "no";
        setTotalPrice(0);
    }

    let copyCart;
    try {
        copyCart = cartItems.filter((items) => (items.Count > 0 || items.tag === "Repairs"));
    } catch (error) {
        copyCart = [];
    }
   
    return (
    <div className='page-transition md:mt-32'>
        { removePrompt === "show" && <RemovePrompt setRemovePrompt={setRemovePrompt} cartItems={cartItems} setCartItems={setCartItems} repairItem={repairItem} setRepairItem={setRepairItem} tag="Repairs" /> }
        <BackToTop />
        <div className='md:relative md:top-3'>
            <h1 className='font-bold text-xl text-center md:text-3xl'>CART</h1>
            <div className='border-2 border-black m-2'></div>
        </div>
        
        <ul className='pb-20 md:mt-6'>
            { flag === "yes" && cartItems.length > 0  ? 
                copyCart.map( items => {
                    if (items.objectId) {
                        return (
                            <div key={items.objectId + items.Tag  } className='md:p-2'>
                                <CartInfo salesInfo={items} image={items.url} setCartItems={setCartItems} cartItems={cartItems} setCount={setCount} cartCount={cartCount} totalPrice={totalPrice} setTotalPrice={setTotalPrice} priceFormat={priceFormat} /> 
                            </div>
                            );
                    } else if (items.title) {
                        return (
                                <div key={items.title} className=' w-80 mx-auto mb-10 px-3 py-2 pb-3 rounded-lg border-4 border-purple-900 space-y-2'>
                                    <div className='w-2/3 h-40 mx-auto'>
                                        <img src={items.url} alt={items.title} className='w-full h-full' />
                                    </div>
                                    <p className='text-purple-900 text-md text-center font-roboto font-bold -mb-2'>{items.title}</p>
                                    <div className='border-2 border-violet-700 flex'></div>
                                    <p className='font-bold text-purple-800 text-lg text-center'>{items.year + " " + items.make + " " + items.model + " " + items.category}</p>
                                    <p className='border-4 border-purple-900 rounded-xl font-bold text-black p-2 w-20 text-center mx-auto'>{items.tag}</p>
                                    <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Date: </span>{items.date}<span className='ml-3'>(YYYY-MM-DD)</span></p>
                                    <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Time: </span>{items.time}</p>
                                    <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Client Name:</span> {items.name}</p>
                                    <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Phone:</span> {items.phone}</p>
                                    <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>E-mail:</span> {items.email}</p>
                                    <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Location:</span> {items.location}</p>
                                    {items.address && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Address:</span> {items.address}</p>}
                                    {(items.Price && (items.location === "Home Service")) && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Price</span> {items.Price.home}</p> }
                                    {(items.Price && (items.location === "Workshop Service")) && <p className='p-1 bg-violet-400 rounded text-white font-bold font-mono '><span className='text-purple-900'>Price</span> {items.Price.workshop}</p> }
                                    <div className='text-center flex w-40 mx-auto justify-center'>
                                        <Remove showPrompt={showPrompt} items={items} />
                                    </div>
                                </div>

                        );
                    }
                } )
                 :
                 <div>
                    <h2 className='text-black text-4xl font-bold text-center font-roboto'>No Items Yet</h2>
                    <div className='text-center p-8'>
                        <ViewCatalogue text="slate-700" />
                    </div>
                 </div>
                
            }
            <div className='mt-5 mb-20'>
                {totalPrice > 0 && <p className='w-80 mx-auto bg-green-100 rounded p-1 text-center text-green-600 font-medium text-lg md:text-3xl'>Total: ${toMoneyString(totalPrice.toString())}</p>}
                {totalPrice > 0 && <div className=' text-center w-full p-2' ><button onClick={()=> navigate("/make-payment")} className='w-80 h-12 rounded bg-slate-300 text-purple-900 font-bold font-roboto m-2 hover:bg-purple-500 hover:text-white md:text-2xl md:h-20'>MAKE PAYMENT</button></div>}
            </div>
            
        </ul>
    </div>
    );
}

export default Cart;
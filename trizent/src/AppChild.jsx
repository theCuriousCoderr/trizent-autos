import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import SignIn from './pages/SignIn';
import Reviews from './pages/Reviews';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ChatRoom from './pages/ChatRoom';
import AdminChatRoom from './pages/AdminChatRoom'
import Load from './pages/Load';
import TestPage from './pages/TestPage';
import Cart from './pages/Cart';
import { useEffect, useState } from 'react';
import NoRoute from './pages/NoRoute';
import MakePayment from './pages/MakePayment';
import io from 'socket.io-client';
import { env } from './config';

let baseUrl;
if (env === "development") {
  baseUrl = "http://localhost:4000"
} else {
  baseUrl = "https://trizent-autos-server.vercel.app/"
}

const socket = io.connect(`${baseUrl}`);

export default function AppChild({isSignIn, setIsSignIn}) {
  // const [isSignIn, setIsSignIn] = useState(false);
  const [reviews, setReviews] = useState( [
    { "name": "John Doe", "title": "A Single Dad and a Ford User", "comment": "The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles." },
    { "name": "John Doer", "title": "A Single Dad and a Ford User", "comment": "The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles." },
    { "name": "John Does", "title": "A Single Dad and a Ford User", "comment": "The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles." },
    { "name": "John Do", "title": "A Single Dad and a Ford User", "comment": "The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles." },
    { "name": "John Did", "title": "A Single Dad and a Ford User", "comment": "The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles." },
  ]);
  const [currentTime, setCurrentTime] = useState(0);
  const [view, setView] = useState("")
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState(null)
  const [signInWelcome, setSignInWelcome] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalData, setRentalData] = useState({
    "pickUp" : "",
    "return" : "",
    "pickUpDate" : "",
    "returnDate": ""
  });
  


  
  let user;
  useEffect(()=>{
    window.scrollTo(0, 0);
    // alert("AppChild")
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  
    user = localStorage.getItem("user");
    let test;
    try {
      user = JSON.parse(user);
      test = user.loggedIn;
    } catch (error) {
      user = { "loggedIn": "false" };
      localStorage.setItem("user",JSON.stringify(user))
      setIsSignIn(false);
    }
   
    if (user.loggedIn === "true"){
      setIsSignIn(n => setIsSignIn(true));
      let cart = localStorage.getItem(user.email);
      try {
          cart = JSON.parse(cart);
          if (cart.length > 0){
              setCartItems(n => setCartItems(cart));
          }
          setCartCount(cart.length);
      } catch (error) {
          setCartItems(n => setCartItems([]));
      }
    }
    else{
      setCartCount(0);
    }
  },[isSignIn]);

  // xsm:bg-lime-500
  // sm:bg-red-500 
  // md:bg-fuchsia-500
  // lg:bg-yellow-500
  // xl:bg-orange-600
  // 2xl:bg-blue-500 
  
 

  return (
    <div className='overflow-hidden min-w-[50%] relative selection:bg-violet-400 font-poppins xl:w-2/3 xl:mx-auto 2xl:min-w-[35%] '>
       
      {/* {!(window.location.pathname === "/") &&
      <div className=' md:w-full md:z-10'>
         <Header isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} cartCount={cartCount} setCartCount={setCartCount} />
      </div>
      } */}
     
    

      <Routes>
        <Route path="/home" element={<Home isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} signInWelcome={signInWelcome} setSignInWelcome={setSignInWelcome} cartCount={cartCount} setCartItems={setCartItems} setCartCount={setCartCount} />} />
        <Route path="/services" element={<Services isSignIn={isSignIn} setIsSignIn={setIsSignIn} setCartItems={setCartItems} cartItems={cartItems} setCount={setCount} setCartCount={setCartCount} rentalData={rentalData} setRentalData={setRentalData} />} />
        <Route path="/blog" element={<Blog isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} signInWelcome={signInWelcome} setSignInWelcome={setSignInWelcome} cartCount={cartCount} setCartItems={setCartItems} setCartCount={setCartCount} />} />
        <Route path="/sign-in" element={<SignIn setIsSignIn={setIsSignIn} signInWelcome={signInWelcome} setSignInWelcome={setSignInWelcome} />} />
        <Route path="/reviews" element={<Reviews isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} signInWelcome={signInWelcome} setSignInWelcome={setSignInWelcome} cartCount={cartCount} setCartItems={setCartItems} setCartCount={setCartCount} reviews={reviews} />} />
        <Route path="/about-us" element={<AboutUs isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} signInWelcome={signInWelcome} setSignInWelcome={setSignInWelcome} cartCount={cartCount} setCartItems={setCartItems} setCartCount={setCartCount} />} />
        <Route path="/contact-us" element={<ContactUs isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} socket={socket} reviews={reviews} setReviews={setReviews} />} />
        <Route path="/cart" element={<Cart isSignIn={isSignIn} setIsSignIn={setIsSignIn} setCartItems={setCartItems} cartItems={cartItems} count={count} setCount={setCount} cartCount={cartCount} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
        <Route path="/chat-room" element={<ChatRoom socket={socket}  />} />
        <Route path="/admin-chat-room" element={<AdminChatRoom socket={socket}  />} />
        <Route path="/make-payment" element={<MakePayment isSignIn={isSignIn} setIsSignIn={setIsSignIn} setCartItems={setCartItems} totalPrice={totalPrice} />} />
        <Route path="*" element={<NoRoute />} />
        <Route path="/" element={<Load />} />
        <Route path="/test-page" element={<TestPage />} />
      </Routes>
    </div>
  );
}; 

import React , {useEffect, useState} from 'react';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { purple } from '@mui/material/colors';
import mobilescreen from '../images/mobilescreen.png';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';


function AboutUs({ isSignIn, setIsSignIn}) {
  const [team, setTeam] = useState("sales");
  useEffect(()=> {
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
      setIsSignIn(true);
    }
  },[]);

  function handleClick(param) {
    if (param === "sales") {
      setTeam("sales")
    }
    if (param === "rentals") {
      setTeam("rentals")
    }
    if (param === "repairs") {
      setTeam("repairs")
    }
  }

  return (
   <div className='md:mt-32'>
    <BackToTop />
    <h1 className='font-bold text-xl text-center'>ABOUT US</h1>
    <div className='border-2 border-black  m-2'></div>

    {/* Services Icon */}
    <div className='w-full h-48 absolute -z-10 blur-sm'>
      <img src="https://images.pexels.com/photos/17883975/pexels-photo-17883975/free-photo-of-steering-wheel-in-luxury-car.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Background" className='h-full w-full object-cover' />
    </div>
    
    <div className='flex justify-evenly '>
      <div className='flex flex-wrap flex-col page-transition'>
        <div className="-mb-2 ml-1 p-2">
          <PaidOutlinedIcon sx={{fontSize:35}} className='text-white' />
        </div>
        <div>
          <DirectionsCarOutlinedIcon sx={{fontSize:60}} className='text-white' />
        </div>
      </div>

      <div className='flex flex-wrap flex-col page-transition '>
        <div className="-mb-2 ml-1 p-2">
          <KeyOutlinedIcon sx={{fontSize:35}} className='text-white' />
        </div>
        <div>
          <DirectionsCarOutlinedIcon sx={{fontSize:60}} className='text-white' />
        </div>
      </div>

      <div className='flex flex-wrap flex-col page-transition '>
        <div className="-mb-2 ml-1 p-2">
          <HandymanOutlinedIcon sx={{fontSize:35}} className='text-white' />
        </div>
        <div>
          <DirectionsCarOutlinedIcon sx={{fontSize:60}} className='text-white' />
        </div>
      </div>
    </div>

    <div className='text-center text-gray-200'>
      <h1>Trizent Autos ...</h1>
      <div>
        <p>Transforming the Car Users experience</p>
      {/* <p>Your No 1 All for One partner.</p> */}
      </div>
      
    </div>

    <div className='space-y-4 mt-10'>
      <div className='w-full bg-gray-950 flex'>
        <div className='w-2/3 p-2'>
          <h2 className='text-slate-100 font-bold text-lg'>Our Story</h2>
          <p className='text-slate-200'>Our story is one of visionaries coming together to create something extraordinary. With a deep understanding of the automotive industry and a desire to redefine the car-owner experience, we embarked on a mission to provide more than just services but to provide a lifestyle, a sense of freedom, a circle of trust and a bond between driver and machine.</p>
        </div>
        <div className='w-1/3 md:h-52 '>
          <img src="https://images.pexels.com/photos/11154021/pexels-photo-11154021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Our Story" className='h-full w-full object-cover' />
        </div>
      </div>

      <div className='w-full bg-gray-950 flex'>
        <div className='w-2/3 p-2'>
          <h2 className='text-slate-100 font-bold text-lg'>Our Goal</h2>
          <p className='text-slate-200'>At Trizent Autos, our goal is clear: to redefine how you experience automobiles services. We're not just in the business of selling a particular car service; we're in the business of creating journeys, sparking connections, and delivering excellence at every turn on every and any of your car needs and wants.</p>
        </div>
        <div className='w-1/3 md:h-52  '>
          <img src="https://images.pexels.com/photos/4806437/pexels-photo-4806437.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Our Goal" className='h-full w-full object-cover' />
        </div>

      </div>

      <div className='w-full bg-gray-950 flex'>
        <div className='w-2/3 p-2'>
          <h2 className='text-slate-100 font-bold text-lg'>How We Get Things Done</h2>
          <p className='text-slate-200'>Every journey begins with understanding. When you choose Trizent Autos, we take the time to listen to your preferences, requirements, needs and aspirations. Whether you're buying or seeking a specific make and model, renting or looking for the perfect car for your use, looking for a qualified place to do your repairs or need guidance on the perfect fit for your car lifestyle, our team is here to ensure we're on the same page.</p>
        </div>
        <div className='w-1/3 md:h-52  '>
          <img src="https://images.pexels.com/photos/38271/ipad-map-tablet-internet-38271.jpeg?auto=compress&cs=tinysrgb&w=300" alt="How we operate" className='h-full w-full object-cover' />
        </div>
        
      </div>
    </div>

    <div className='w-full px-5 my-20'>
      <p className='text-gray-950 text-xl font-semibold '>Whether you are shopping for a new car or looking for a place to rent or repair a car, the next step in your journey starts here. Explore the possibilities.</p>
       <div className='h-48 w-24 mx-auto text-center my-10'>
        <img src={mobilescreen} alt="phone" className='h-full shadow-lg' />
      </div>
      <button className='w-full h-10 text-lg bg-purple-900 text-white hover:bg-gray-950'><NavLink to="/services">OUR SERVICES</NavLink></button>
    </div>

    <div className='w-full bg-gray-950  mb-10'>
      <img src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300" alt="team" className='w-full md:h-64 object-cover' />
      <div className='p-2 text-slate-200 text-lg'>
        At Trizent Autos, we work as a team to bring our customers full satisfaction. We have a wide range of teams to attend to your needs be it on sales, repairs or rentals.
        We boast of having an excellent team as one of the perks and reasons of why you should be working with us.
        We are a company that incorporates all thre teams into one. 
        At Trizent Autos, your car troubles will be solved.
      </div>
    </div>

    <div>
      <div className='px-4 py-2 space-y-2 mb-'>
        <h3 className='text-2xl text-gray-950 font-bold'>Our Teams</h3>
        <div className='flex justify-evenly gap-2 text-md'>
          <button onClick={() => handleClick("sales")} className={`${team === "sales" ? "border-purple-800 font-bold text-gray-900" : "border-transparent" } text-gray-800 font-semibold border-b-4 `}>Sales Team</button>
          <button onClick={() => handleClick("rentals")} className={`${team === "rentals" ? "border-purple-800 font-bold text-gray-900" : "border-transparent" } text-gray-800 font-semibold border-b-4 `} >Rentals Team</button>
          <button onClick={() => handleClick("repairs")} className={`${team === "repairs" ? "border-purple-800 font-bold text-gray-900" : "border-transparent" } text-gray-800 font-semibold border-b-4 `}>Repairs Team</button>
        </div>
        <hr />
      </div>

      <div className='absolute w-full bg-red-300 -z-10 blur-sm'>
        {team === "sales" && <img src="https://media.istockphoto.com/id/912785590/photo/couple-is-buying-new-car-and-signing-the-contract.webp?b=1&s=170667a&w=0&k=20&c=-PAP5rQBntE8dnDNuzcdp1P7Af34LFg51ivD575FxxQ=" alt="How we operate" className='h-full w-full object-cover' /> }
        {team === "rentals" && <img src="https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?b=1&s=170667a&w=0&k=20&c=bTulLElNltgY6BlufWi_4kkaAbhl1QVw9I4biujk69w=" alt="How we operate" className='h-full w-full object-cover' /> }
        {team === "repairs" && <img src="https://media.istockphoto.com/id/1165311626/photo/mechanic-using-a-ratchet-wrench.jpg?s=612x612&w=0&k=20&c=D4XCHr8BeR44hdJXS_Tp-9djQ7jWDKKkBWSKaqhuqK8=" alt="How we operate" className='h-full w-full object-cover' /> }
      </div>
      
      <div className='mt-24'>
      {team === "sales" && 
        <div className='p-4'>
        <h3 className='text-2xl text-slate-50 font-bold mb-5  '>Sales Team</h3>
        <div className='space-y-4'>
          {[1,2,3,4,5].map(val => {
            return (
              <div key={val} className='text-center bg-stone-300 rounded-lg py-5 space-y-8'>
                <div className='space-y-1'>
                  <div className='h-24 w-24 bg-red-300 rounded-full mx-auto'></div>
                  <p className='text-gray-950 font-bold text-xl font-roboto'>Name</p>
                  <p className='text-gray-600 font-bold text-lg'>Position Held</p>
                </div>
                <button className='w-60 h-10 rounded font-bold bg-orange-600 text-white'>LEARN MORE</button>
              </div>
            )
          })}
        </div>
      </div>
      }
      {team === "rentals" && 
        <div className='p-4'>
        <h3 className='text-2xl text-slate-50 font-bold mb-5  '>Rentals Team</h3>
        <div className='space-y-4'>
          {[1,2,3,4,5].map(val => {
            return (
              <div key={val} className='text-center bg-stone-300 rounded-lg py-5 space-y-8'>
                <div className='space-y-1'>
                  <div className='h-24 w-24 bg-yellow-300 rounded-full mx-auto'></div>
                  <p className='text-gray-950 font-bold text-xl font-roboto'>Name</p>
                  <p className='text-gray-600 font-bold text-lg'>Position Held</p>
                </div>
                <button className='w-60 h-10 rounded font-bold bg-orange-600 text-white'>LEARN MORE</button>
              </div>
            )
          })}
        </div>
      </div>
      }
      {team === "repairs" && 
        <div className='p-4'>
        <h3 className='text-2xl text-slate-50 font-bold mb-5  '>Repairs Team</h3>
        <div className='space-y-4'>
          {[1,2,3,4,5].map(val => {
            return (
              <div key={val} className='text-center bg-stone-300 rounded-lg py-5 space-y-8'>
                <div className='space-y-1'>
                  <div className='h-24 w-24 bg-blue-300 rounded-full mx-auto'></div>
                  <p className='text-gray-950 font-bold text-xl font-roboto'>Name</p>
                  <p className='text-gray-600 font-bold text-lg'>Position Held</p>
                </div>
                <button className='w-60 h-10 rounded font-bold bg-orange-600 text-white'>LEARN MORE</button>
              </div>
            )
          })}
        </div>
      </div>
      }
      </div>
    </div>

    <div className='text-center mt-12'>
      <button className='bg-slate-200 bg-opacity-50 text-center px-12 py-7 text-xl font-bold text-purple-800 hover:bg-opacity-100 border-2 rounded-md border-purple-800 hover:bg-purple-800 hover:text-white'><NavLink to="/reviews">Customers Feedbacks</NavLink></button>
    </div>

    <div className='mt-14'>
      <Footer />
    </div>
    
   </div>
  );
}

export default AboutUs;
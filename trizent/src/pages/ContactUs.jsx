import React, {useEffect, useState} from 'react';
import BackToTop from '../components/BackToTop';
import contactUs from '../images/contact-us.jpg';
import chat from '../images/chat.png';
import email from '../images/email.png';
import bulb from '../images/bulb.png';
import chat2 from '../images/chat-2.png';
import phone from '../images/phone.png';
import mail from '../images/mail.png';
import Footer from '../components/Footer';
import { faq } from '../components/Car_Database';

import { NavLink, useNavigate } from 'react-router-dom';
import { CallMade, CallMerge, CallReceived, CallSplit, PhoneCallback } from '@mui/icons-material';
import PopUp from '../components/PopUp';



function ContactUs({isSignIn, setIsSignIn, cartItems, socket, reviews, setReviews}) {
  const [faqFilter, setFaqFilter] = useState(faq);
  const [feedback, setFeedback] = useState({
    "name": "",
    "title": "",
    "comment": ""
  })
  let navigate = useNavigate();
  useEffect(()=> {
    // window.scrollTo(0, 0);
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

  function scroll(e){
    let name = e.target.name;
    let scroll = document.getElementById(name);
    if (name === "FAQ") {
      scroll.scrollIntoView({behavior: 'smooth'});
    }
    if (name === "Feedback") {
      scroll.scrollIntoView({behavior: 'smooth'});
    }
  };

  function handleFAQChange(e){
    let value = e.target.value;
    if (value !== "All Categories") {
      // alert(value)
      let filter = faq.filter(items => items.category === value )
      setFaqFilter(filter);
      return ;
    }
    setFaqFilter(faq);
  }

  function handleFeedbackChange(e) {
    setFeedback({...feedback, [e.target.name]: e.target.value});
  }


  function joinRoom() {
    // socket.emit('join_room', {"name": "Ola", "room": "WebSocket"});
    setTimeout(() => {
       navigate("/chat-room");
    }, 1000);
  }

  function handleFeedbackSubmit(e) {
    e.preventDefault();
    setReviews([...reviews, feedback])
    setFeedback({
      "name": "",
      "title": "",
      "comment": ""
    });
    let popup = document.getElementById("popup");
    popup.toggleAttribute('hidden')
    setTimeout(() => {
      popup.toggleAttribute('hidden')
    }, 4000);
  }



  return (
    <div className='page-transition md:mt-32'>
      <BackToTop />
      <div id="popup" hidden>
        <PopUp addedPrompt="show" text="Feedback Submitted Successfully !" />
      </div>
      
      <h1 className='font-bold text-xl text-center'>CONTACT US</h1>
      <div className='border-2 border-black m-2'></div>
      <div className='w-full bg-red-20'>
        <div className='relative'>
          <div className='absolute'>
            <PhoneCallback />
          </div>
          <img src={contactUs} className='w-full' />
        </div>

        <div className='bg-stone-100 pb-28 pt-7'>
          <div className='space-y-4 mb-16 text-center bg-teal-40'>
            <p className='text-center font-bold text-gray-950 text-xl font-roboto'>How can we help you ?</p>
            <button onClick={joinRoom} className='flex justify-center gap-3 align-middle text-center w-28 mx-auto px-1 py-2 rounded-lg active:bg-blue-400'>
              <div className='w-8 h-8'>
                <img src={chat} className='w-full h-full' />
              </div>
              <p className='text-gray-800 text-2xl font-bold -mt-0'>Chat</p>
            </button>
          </div>
          <div className='space-y-1'>
            <button className='flex justify-center gap-3 align-middle w-44 mx-auto px-1 py-2 rounded-lg'>
              <div className='w-8 h-8'>
                <img src={email} className='w-full h-full' />
              </div>  
              <p className='text-gray-800 text-xl font-bold mt-[.1rem]'><NavLink to="/reviews"> Feedbacks </NavLink></p>
            </button>
            <div className='text-center w-2/3 h-16 mx-auto '>
              <button name='Feedback' onClick={(scroll)} className='transition-all w-full h-full border-2 border-purple-800 text-purple-900 font-bold rounded-lg hover:bg-fuchsia-800 hover:text-white focus:bg-blue-400'>Leave Feedback</button>
            </div>
          </div>
        </div>

        <div className='text-center mt-5 px-7'>
          <p className='text-xl font-bold text-gray-900'>Have a question? Let's connect</p>

          <div className='w-2/3 mx-auto space-y-4 mt-10'>
            <div className='w-20 h-20 text-center mx-auto'>
              <img src={bulb} />
            </div>
            <p className='text-2xl font-bold text-gray-900'>Frequently Asked Questions</p>
            <p className='text-xl font-medium text-gray-900'>Check out our most popular questions, or reach out anytime by phone, chat, or feedback.</p>
            <div className='w-2/3 mx-auto h-16'>
              <button name='FAQ' onClick={scroll} className='w-full h-full bg-fuchsia-800 text-white rounded-lg font-bold focus:bg-blue-400'>See FAQs</button>
            </div>
          </div>
          
        </div>

        <div id="ola" className='px-7 mt-12 space-y-8'>
          { [1,2,3,4,5].map(items => { 
            return (
              <div key={items} className='space-y-3'>
                <h3 className='font-bold text-lg text-gray-950'>Contact Customer Service</h3>
                <div className='flex gap-2'>
                  <img src={mail} className='w-6 h-6' />
                  <p className='text-fuchsia-500 text-md font-semibold'>customercare@trizent-autos.com</p>
                </div>
                <div className='flex gap-2'>
                  <img src={phone} className='w-6 h-6' />
                  <p className='font-medium'>123-45678-900</p>
                </div>
              </div>
            )
          }) }
        </div>

        <div id="FAQ" className='px-7 mt-10'>
          <div className='flex gap-2 mb-3 mt-5'>
            <img src={bulb} className='h-7 w-7' />
            <p className='font-bold text-lg text-gray-950'>Frequently Asked Questions</p>
          </div>
          <div className='relative'>
             <p className='absolute left-4 top-1 text-sm font-bold text-slate-700' >Select FAQ</p>
            <select onChange={handleFAQChange} className='w-full h-16 border-2 border-purple-400 rounded px-3 pt-4 font-semibold text-lg text-gray-950'>
              <option value="All Categories" >All Categories</option>
              <option value="Sales">Sales</option>
              <option value="Rentals">Rentals</option>
              <option value="Repairs">Repairs</option>
            </select>
          </div>
        </div>

        <div className='px-3 m-5'>
          {faqFilter.map(item => {
            return (
              <div key={item.faq} >
                <hr />
                <details  className='p-2'>
                  <summary>{item.faq}</summary>
                  <p>{item.answer}</p>
                </details>
                <hr />
              </div>
            )
          })}
        </div>

        <div id="Feedback" className='mb-10'>
          <h2 className='p-3 text-xl text-gray-900 font-bold'>LEAVE FEEDBACK</h2>
          <form onSubmit={handleFeedbackSubmit} className='bg-red-20 w-2/3 ml-6 space-y-5'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-gray-700 font-medium text-sm'>Name</label>
              <input name="name" value={feedback.name} onChange={handleFeedbackChange} id="name" type="text" placeholder='Your name' className='border-2 border-purple-400 p-2' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='description'  className='text-gray-700 font-medium text-sm'>A short description/title of yourself</label>
              <input name="title" value={feedback.title} onChange={handleFeedbackChange} id="description" type="text" placeholder="E.g. A Single dad and a ford user"  className='border-2 border-purple-400 p-2 placeholder:text-sm' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='Feedback'  className='text-gray-700 font-medium text-sm'>Feedback/Review</label>
              <textarea name='comment' value={feedback.comment} onChange={handleFeedbackChange} id="Feedback" placeholder='Feedback'  className='border-2 border-purple-400 p-2' />
            </div>
            <button type='submit' className='bg-purple-700 hover:bg-purple-900 p-2 rounded-sm text-slate-100 font-semibold'>Give Feedback</button>
          </form>
        </div>

        <Footer />

      </div>
        
    </div>
  );
}

export default ContactUs;
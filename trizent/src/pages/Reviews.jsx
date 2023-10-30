import React, { useEffect } from 'react';
import cat from '../images/cat.jpg';
import BackToTop from '../components/BackToTop';

function Reviews({isSignIn, setIsSignIn, reviews}) {
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

    return (
    <div className='page-transition md:mt-32'>
        <BackToTop />
        <h1 className='font-bold text-xl text-center'>REVIEWS</h1>
        <div className='border-2 border-black m-2'></div>
        <div className='p-2 m-2 space-y-10'>
            {reviews.map(review => {
                return (
                    <div key={review.name} className='text-center border-2 border-purple-400 pb-4 mb-4 bg-slate-300 shadow-xl rounded-lg'>
                        <div className='bg-white mb-3 p-2'>
                            <img src={cat} alt="Reviewer." className='h-12 w-12 rounded-full mx-auto' />
                            <h2 className='font-bold text-slate-700'>{review.name}</h2>
                            <p className='text-slate-400 font-bold'>{review.title}</p>
                        </div>
                        <p className='p-2'>
                            <em>{review.comment}</em>
                        </p>
                    </div>
                );
            })}
        </div>
    </div>
    )
}

export default Reviews;
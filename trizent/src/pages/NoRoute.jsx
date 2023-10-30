import React from 'react';
import { useNavigate } from 'react-router-dom';

function NoRoute() {
    let navigate = useNavigate();
    function handleClick() {
        navigate("/");
    }
    return (
    <>
        <h1 className='text-xl font-bold text-black text-center relative mt-40 left-1 '>Oops! This page/path doesn't exist. </h1>
        <button onClick={handleClick} className='block w-40 text-center mx-auto mt-5 text-blue-700 font-bold hover:underline hover:text-orange-500'>Go To Homepage</button>
    </>
    );
}

export default NoRoute;
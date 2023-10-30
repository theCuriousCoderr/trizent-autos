import React from 'react';
import Visa from '../images/visa.png';
import Verve from '../images/verve.svg';
import MasterCard from '../images/mastercard.svg';

function DebitCards() {
    let style= 'w-11 h-10 border border-purple-500 p-1';
    let layerStyle = 'w-12 h-11 border border-purple-800 rounded absolute';

    return (
        <div className='flex flex-row gap-3 mt-2'>
            <div className='relative'>
                <div className={`${layerStyle}`}></div>
                <img src={Visa} className={`${style}`} />
            </div>
            <div className='relative'>
                <div className={`${layerStyle}`}></div>
                <img src={MasterCard} className={`${style}`} />
            </div>
            <div className='relative'>
                <div className={`${layerStyle}`}></div>
                <img src={Verve} className={`${style}`} />
            </div>
        </div>
    )
}

export default DebitCards;
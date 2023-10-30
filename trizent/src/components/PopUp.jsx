import React from 'react';
import DoneIcon from '@mui/icons-material/Done';

function PopUp({addedPrompt, text}) {
  return (
    <div className={`${addedPrompt} fixed top-2 w-full text-center bg-green-500 opacity- p-2 md:z-10`}>
        <div className='float-left'>
            <DoneIcon className='text-white' />
        </div>
        <p className='font-medium text-white font-mono'>{text}</p>
    </div>
  )
}

export default PopUp



import React from 'react';
import { red } from '@mui/material/colors';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function Remove({showPrompt, items}) {
    return (
        <>
            <div onClick={() => showPrompt("show",items=items)} className='float-left align-middle mt-2 pr-1  hover:bg-red-200'>
                <DeleteForeverOutlinedIcon sx={{color: red[500], fontSize: 35 }} />
                <span className='text-red-500 font-bold'>REMOVE</span>
            </div>
        </>
    )
}

export default Remove;
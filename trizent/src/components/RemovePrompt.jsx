import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function RemovePrompt({setRemovePrompt, cartItems, setCartItems, salesInfo, repairItem, setRepairItem, tag}) {

    function addToCart(param) {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let cartItem;
        let newCartItems;
        for (let items of cartItems) {
            if (items.objectId === salesInfo.objectId){
                if (param === "add"){
                    items = {...items, "Count":items.Count++};
                    newCartItems = [...cartItems];
                }
                if (param === "minus"){
                    items = {...items, "Count":items.Count--};
                    newCartItems = [...cartItems];
                }
                localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
            }
        }
        setCartItems(newCartItems)
    }

    function showPrompt(param) {
        if (param === "show"){
            setRemovePrompt("show");
        }
        if (param === "hide") {
            setRemovePrompt("hide")
        }
    }

    function handleRemoveItem(){
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        if (repairItem) {
            let newCartItems, index;
            for (let items of cartItems) {
                if (items === repairItem) {
                    index = cartItems.indexOf(items);
                    newCartItems = cartItems.filter((cnt)=> cnt !== items)
                    localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
                    setRepairItem({})
                    setRemovePrompt("hide");
                    setCartItems(newCartItems);
                    console.log(newCartItems);
                    return;
                }
            }
        }
        for (let items of cartItems) {
            let newCartItems;
            if (items === salesInfo){
                newCartItems = cartItems.filter((cnt)=> cnt !== items);
                localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
                setCartItems(newCartItems);
            }
        }
        setRemovePrompt("hide");
    }

    return (
    <>
    <div className='fixed top-0 bg-slate-900 opacity-50 h-full w-full'></div>
    <div className='fixed w-full top-1/4 rounded-xl shadow-lg md:w-2/3 md:left-36 md:h-48'>
        <div className='bg-slate-100 rounded-xl shadow-lg w-[90%] mx-auto p-4 '>
            <div className='float-right hover:bg-gray-700 rounded-full'>
                <CloseIcon onClick={()=> showPrompt("hide")} sx={{fontSize:30}} />
            </div>
            <p className='font-bold text-xl text-gray-950 md:text-2xl'>Remove from cart</p>
            <p className='text-lg font-medium text-gray-800 mt-3 md:text-xl'>Do you really want to remove this item from cart?</p>
            <div className='flex justify-between py-1 px-2 bg-purple-700 text-center mt-5 shadow-lg hover:bg-red-600  active:bg-red-600 md:h-14'>
                <div className='md:hidden'>
                    <DeleteForeverOutlinedIcon sx={{color:'white', fontSize: 30}} />
                </div>
                <div className='hidden md:block md:mt-1'>
                    <DeleteForeverOutlinedIcon sx={{color:'white', fontSize: 40}} />
                </div>
                <div className='w-full pr-4'>
                    <button onClick={handleRemoveItem} className='text-white text-center font-semibold w-full h-8 md:text-xl md:mt-2'>REMOVE ITEM</button>
                </div>
            </div>
        </div>
    </div></>
    )
}

export default RemovePrompt;
import { AccountBox, ArrowBack, ArrowForwardIos, AvTimerOutlined, CameraAlt, CameraAltOutlined, CameraFrontOutlined, DeliveryDining, History, HomeMaxOutlined, HomeOutlined, Label, ListAltOutlined, LogoutOutlined, PersonOffOutlined, PersonOutlineOutlined, Settings, Tag, TagFacesOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import cat from "../images/cat.jpg"
import { useNavigate } from 'react-router-dom';
let dotEnv = import.meta.env
// import { CLOUDINARY_URL } from '../config';
// import { env } from '../config';


function TestPage() {
    const [imageUrl, setImageUrl] = useState("")
    const [user, setUser] = useState("")
    const [picLoad, setPicLoad] = useState(false)
    const prevImg = useRef()
    let navigate = useNavigate()
    
    useEffect(()=> {
        let data = localStorage.getItem("user")
        data = JSON.parse(data)
        if (data) {
            // setImageUrl(data.photo)
            setUser(data)
        }
        
    
        // data ? setUser(data) : setUser("");
    }, [])
  

    let baseUrl;
    if (dotEnv.MODE === "development") {
      baseUrl = dotEnv.VITE_DEV_URL
    } else {
      baseUrl = dotEnv.VITE_PROD_URL
    }


    async function handleChangeDp(e) {
        let file = document.getElementById("file")
        try {
            setPicLoad(true)
            // alert(JSON.stringify(user))
            prevImg.current = user.photo;
            let changePhoto = new FormData()
            let val = e.target.files[0]
            changePhoto.append("file", val)
            changePhoto.append("upload_preset", dotEnv.VITE_PRESET_NAME)
            changePhoto.append("cloud_name", dotEnv.VITE_CLOUD_NAME)
            let response = await fetch( dotEnv.VITE_CLOUDINARY_URL, {
                method: "POST",
                // headers: { 'Content-Type': 'application/json' },
                body : changePhoto
            })
    
            let data = await response.json()
            // alert(data.url)
            if (data.url) {
            //   setUser({...user, photo: data.url})
              let url = baseUrl + "/api/change-photo"
              response = await fetch(url, {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({id:user._id ,newPhoto: data.url})
              })
              data = await response.json()
                setUser({...user, photo: data.message})
              localStorage.setItem("user", JSON.stringify({...user, photo: data.message}))

            } else {
                setUser({...user, photo: prevImg.current})
              throw new Error("Image Upload Unsuccessful")
            }

           
        } catch (error) {
            setUser({...user, photo: prevImg.current})
        }
        file.value = "";
        setPicLoad(false);
       


    }

    // if (user) {
    //     pic = user.photo
    // } else {
    //     pic = cat
    // }



    
   
  return (
    <div>
        <div className="mt-5">
            <p className="relative bg-red-30 text-center text-gray-900 font-bold text-lg font-mono">
                My Profile
                <div onClick={()=> navigate("/home")} className='absolute left-0 top-0 w-[10%] bg-red-20'>
                    <ArrowBack />
                </div>
            </p>
            <div className='text-center mt-5 space-y-3'>
                <div className='relative w-28 h-28 mx-auto rounded-full border-2 p-1 bg-gradient-to-tr from-pink-600 to-fuchsia-600'>
                    <div className='relative bg-slate-200 w-full h-full rounded-full'>
                         { picLoad && <div className='absolute w-full h-full rounded-full bg-slate-900 opacity-80 flex items-center justify-center'>
                            <div className='w-10 h-10 border-t-2 border-b-2 border-slate-200 rounded-full animate-spin'></div>
                        </div>}
                        { user.photo ? <img src={user.photo} alt="User" className='w-full h-full object-cover rounded-full' /> : <div className='bg-red-50 h-full rounded-full flex items-center justify-center'> <Avatar /> </div> }
                    </div>
                    
                    
                    <div className='absolute bottom-0 right-0 bg-red-40'>
                        <CameraAlt sx={{fontSize:35, color: 'gray'}} />
                        <div className='absolute top-0 bg-red-300 w-10 h-10 opacity-0'>
                            <input id="file" type="file"  accept='image/*' onChange={handleChangeDp}/>
                        </div>
                        
                    </div>
                </div>
                {user.email ? <div>
                    <p className='text-gray-900 text-xl font-bold capitalize leading-6'>{user.lastName + " " + user.firstName}</p>
                    <p className="text-slate-400 font-semibold text-lg">{user.email}</p>
                </div> : <p className='text-gray-900 text-xl font-bold capitalize leading-6'>Jonh Doe</p> }
               
            </div>
            <div className="w-[90%] mx-auto bg-green-70 space-y-5 my-5">
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='flex items-center justify-center w-5 h-5 bg-red-20'>
                            <AccountBox  sx={{fontSize: 20}} />
                        </div>
                        <p>Account Details</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='flex items-center justify-center w-5 h-5 bg-red-20'>
                            <History  sx={{fontSize: 20}} />
                        </div>
                        <p>Transaction History</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='flex items-center justify-center w-5 h-5 bg-red-20'>
                            <DeliveryDining  sx={{fontSize: 20}} />
                        </div>
                        <p>All orders</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className='flex items-center justify-center w-5 h-5 bg-red-20'>
                            <Settings  sx={{fontSize: 20}} />
                        </div>
                        <p>Settings</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between bg-[rgba(150,150,150,0.12)] rounded-lg">
                    <div className="flex w-[80%] gap-3 items-center justify-start px-5 py-2 bg-red-40">
                        <div className=' w-5 h-5 bg-red-20 flex items-center justify-center'>
                            <Tag sx={{fontSize: 20}} />
                        </div>
                        <p>Get coupon</p>
                    </div>
                    <div className="w-[10%]">
                        <ArrowForwardIos sx={{color:'GrayText', fontSize: 20}} />
                    </div>
                </div>
                
            </div>
            <div className='w-[90%] mx-auto mt-10'>
                <button onClick={() => { localStorage.removeItem("user") }} className="h-10 relative items-center flex gap-5 justify-center bg-gray-900 hover:bg-red-500 w-full text-center text-gray-100 font-bold text-lg font-mono rounded-lg">
                    <div className=' w-[10%] bg-red-20'>
                        <LogoutOutlined />
                    </div>
                    <p>Log out</p>
                </button>
            </div>
           
        </div>
    </div>
   
  )
}

export default TestPage;

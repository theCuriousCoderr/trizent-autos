import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../images/car_logo2.png';
import profilePic from '../images/car_logo.jpg';
import black_logo from '../images/black_logo.png'
import white_logo from '../images/white_logo.png'
import CartContent from './CartContent';
import { useEffect, useState } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
import SignIn from '../pages/SignIn';
import { Avatar } from '@mui/material';
import "animate.css"
import { companyName } from '../config';


export default function Header({ isSignIn, setIsSignIn, cartItems, cartCount, setCartCount }) {
    const [logIn, setLogIn] = useState(false);

    let navigate = useNavigate();

    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    useEffect(() => {
        // alert("Header")
        // user = localStorage.getItem("user");
        let test;
        try {
            //   user = JSON.parse(user);
            test = user.loggedIn;
            //   alert(`ghf ${user}`)
        } catch (error) {
            user = { "loggedIn": "false" };
        }

        if (user.loggedIn === "true") {
            // alert("yh")
            setLogIn(true);

        } else {
            setLogIn(false);
        }
    }, [isSignIn]);


    let url = window.location.href;
    let style = "bg-purple-600 text-purple hover:bg-purple-900 text-white pt-3 text-xl mt-3 p-2 md:text-[2rem] md:py-6";
    let active = "border-4 border-purple-400 bg-white text-xl p-2 mt-3 text-purple-500 hover:bg-purple-500 hover:border-purple-900 md:text-[2rem] md:py-6";

    let cart, services, reviews, blog, aboutUs, contactUs;
    if (url.includes("cart")) {
        cart = active;
    } else {
        cart = style;
    }
    if (url.includes("services")) {
        services = active;
    } else {
        services = style;
    }
    if (url.includes("blog")) {
        blog = active;
    } else {
        blog = style;
    }
    if (url.includes("reviews")) {
        reviews = active;
    } else {
        reviews = style;
    }
    if (url.includes("about-us")) {
        aboutUs = active;
    } else {
        aboutUs = style;
    }
    if (url.includes("contact-us")) {
        contactUs = active;
    } else {
        contactUs = style;
    }

    const sideBarNavLinks = [
        { "path": "services", "style": services, "text": "Services" },
        { "path": "blog", "style": blog, "text": "Blog" },
        { "path": "reviews", "style": reviews, "text": "Reviews" },
        { "path": "contact-us", "style": contactUs, "text": "Contact Us" },
    ]

    let sideBarAnimaton;
    function handleMenuClick(show) {
        let sideBar = document.getElementById("sideBar");
        if (show === "open") {
            sideBar.style.display = "block";
            sideBar.classList.remove("animate__animated", "animate__fadeOutRight")
            sideBar.classList.add("animate__animated", "animate__fadeInRight")
        }
        else if (show === "close") {
            sideBar.classList.remove("animate__animated", "animate__fadeInRight")
            sideBar.classList.add("animate__animated", "animate__fadeOutRight")
            setTimeout(() => {
                sideBar.style.display = "none";
            }, 1000);
            
        }
    }

    function handleLogOut() {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let updateDetails = { ...user, "loggedIn": "false" };
        localStorage.setItem("user", JSON.stringify(updateDetails));
        setIsSignIn(false);
        // setCartCount(0);
        setTimeout(() => navigate("/"), 1000);
    }

    return (
        <>
            <header className="relative bg-gray-900 top-0 w-full z-20 p-1 flex align-middle mb-3 md:fixed md:w-full md:h-[7.5rem] md:z-10 xl:left-0 ">
                {logIn && (cartCount > 0 && <CartContent cartCount={cartCount} />)}
                {/* <BackToTop /> */}
                
               
                <div className="relative flex items-center justify-between bg-red-40 w-full py-2 md:flex md:absolute md:w-ful md:z-40">
                    <div className='relative'>
                        <div className='absolute w-6 h-6 rounded-full bg-red-500 top-1 right-3 z-0'></div>
                        <div className='relative z-10'>
                            <NavLink to="/" >
                                <img className="h-12 w-16 bg-red-20" src={white_logo} alt="Logo." />
                            </NavLink>
                        </div>
                    </div>
                    
                    <p className='text-center text-white uppercase font-black text-lg bg-red-20'>
                        {companyName}
                    </p>
                    <div>
                        <div className='p-1 rounded text-center hover:bg-gray-300 md:hidden'>
                            <MenuIcon sx={{ color: 'white', "&:hover": { color: "black" } }} onClick={() => handleMenuClick("open")} />
                        </div>
                        <div className='hidden p-1 float-right rounded text-center hover:bg-gray-300 w-auto md:block md:text-right md:mr-5 lg:hidden '>
                            <MenuIcon sx={{ fontSize: 35, color: 'white', "&:hover": { color: "black" } }} onClick={() => handleMenuClick("open")} />
                        </div>
                    </div>
                    
                </div>
                <div className='absolute right-4 top-8 md:relative md:left-0 md:right-0 md:w-full lg:absolute bg-yellow-30 '>
                    {logIn ?
                        (<ul className='hidden relative lg:flex lg:justify-around lg:-mt-1 lg:w-full bg-red-40' >

                            <li className='bg-red-30 mt-16 mb-4 flex flex-wrap flex-col gap-1 md:absolute md:right-1 md:px-2 md:-mt-5 md:flex-row text-center md:gap-5'>
                                <div className='w-20 h-20 mx-auto rounded-full bg-gray-700 border-4 border-purple-800 hover:border-white overflow-hidden text-center md:h-14 md:w-14'>
                                    <img src={profilePic} alt="User" />
                                </div>
                                <div className='flex mt-3 bg-yellow-20 align-middle justify-center gap-2 md:gap-0 '>
                                    <div className='w-3 h-3 rounded-full bg-green-500 mt-[.15rem] md:mt-2'></div>
                                    {user.email && <p className='bg-green-30 text-[.7rem] text-black font-bold font-serif md:text-white md:font-roboto md:ml-2 md:text-lg  '>{user.lastName + " " + user.firstName}</p>}
                                </div>
                            </li>

                            <div className='relative bg-red-40 md:mt-4'>
                                <li className='relative text-center'>
                                    <NavLink to="/cart" className={`${cart} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 lg:bg-transparent lg:border-none lg:text-xl lg:hover:bg-transparent lg:hover:text-purple-800`}>Cart</NavLink>
                                    {cart === active && <div className='hidden lg:block absolute bottom-0 right-1/3'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                </li>
                                {cartCount > 0 &&
                                    <div className='bg-red-600 text-white font-bold font-roboto border-2 box-content border-black absolute -top-2 -right-1 rounded-full w-6 h-6 flex text-center md:top-2 md:-right-7 md:text-lg'>
                                        <p className='w-full h-full'>{cartCount}</p>
                                    </div>}
                            </div>

                            {sideBarNavLinks.map(links => {
                                return (
                                    <li key={links.path + "KEY"} className='relative text-center bg-yellow-30 md:mt-4'>
                                        <NavLink to={`/${links.path}`} className={`${links.style} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 lg:bg-transparent lg:border-none lg:text-xl lg:hover:bg-transparent lg:hover:text-purple-800 `}>{links.text}PX</NavLink>
                                        {links.style === active && <div className='hidden lg:block absolute bottom-0 right-1/3 '><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                    </li>
                                )
                            })
                            }

                            {user.email === process.env.REACT_APP_ADMIN_EMAIL && <li className='relative text-center '>
                                <NavLink to="/admin-chat-room" className={`bg-orange-600 text-purple hover:bg-purple-900 text-white pt-3 text-xl xl:text-[.7rem] active:bg-green-600 font-bold block rounded-md h-12 p-2 text-center mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-purple-500 md:mt-10 md:text-sm `}>CHAT ROOM</NavLink>

                            </li>}

                            <li ><NavLink to="/" onClick={handleLogOut} className='bg-red-500 hover:bg-red-800 text-white font-bold block rounded-md text-xl pt p-2 text-center mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-red-500 md:mt-11 md:text-sm lg:text-xl'>Log Out</NavLink></li>
                        </ul>)
                        :
                        (
                            <ul className='hidden lg:flex lg:justify-around mt-5' >

                                <li className='bg-red-400 mt-16 flex flex-wrap justify-center md:absolute md:right-3 md:h-2 md:px-2 md:-mt-10 md:flex-row text-center'>
                                    <div className='flex align-middle justify-center pt-4 w-20 h-20 rounded-full bg-[#dddddd] border-4 border-purple-800 hover:border-white overflow-hidden text-center md:h-14 md:w-14 md:pt-1'>
                                        <Avatar />
                                    </div>
                                </li>

                                <li className='relative text-center lg:-mt-2 bg-red-30' >
                                    <NavLink to="/about-us" className={`${aboutUs} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 lg:bg-transparent lg:border-none lg:text-xl lg:hover:bg-transparent lg:hover:text-purple-800`}>About Us</NavLink>
                                    {aboutUs === active && <div className='hidden lg:block absolute bottom-0 right-1/3'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                </li>

                                {sideBarNavLinks.map(links => {
                                    return (
                                        <li key={links.path} className='relative text-center lg:-mt-2'>
                                            <NavLink to={`/${links.path}`} className={`${links.style} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 lg:bg-transparent lg:border-none lg:text-xl lg:hover:bg-transparent lg:hover:text-purple-800`}>{links.text}h</NavLink>
                                            {links.style === active && <div className='transition-all hidden lg:block absolute bottom-0 right-1/3 '><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                        </li>
                                    )
                                })
                                }

                                <li><NavLink to="/sign-in " className='bg-purple-600 hover:bg-green-600 active:bg-green-600 text-white font-bold block rounded-xl p-2 text-center text-sm mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-green-600 md:px-0 md:text-lg lg:text-xl lg:mt-5'>Sign In</NavLink></li>
                            </ul>
                        )
                    }
                   
                </div>


                <div id="sideBar" className='transition-all h-full w-2/3 hidden overflow-scroll bg-slate-900 fixed top-0 right-0  py-2 px-4 z-50 lg:absolute lg:w-full lg:bg-transparent '>
                    {/* handles sidebar div toggle and its contents; when logged in or not */}
                    <div onClick={() => handleMenuClick("close")} className=' h-full w-[8rem] -left-32 top-0 absolute bg-gray-900 opacity-70 blur-sm md:w-full md:hidden '></div>
                    <div className='float-right mt-6 m-1 rounded text-center hover:bg-slate-300 p-1 md:hidden '>
                        <CloseIcon sx={{ color: 'white', "&:hover": { color: "white" } }} onClick={() => handleMenuClick("close")} />
                    </div>
                    <div className='float-right mt-6 mr-2 m-1 rounded text-center hover:bg-slate-300 p-1 hidden md:block '>
                        <CloseIcon sx={{ fontSize: 40, color: 'black', "&:hover": { color: "black" } }} onClick={() => handleMenuClick("close")} />
                    </div>

                    {logIn ?
                        (<>
                            <ul className='hidden lg:flex md:justify-around md:mt-14 md:w-full bg-red-40' >

                                <li className='bg-red-300 mt-16 mb-4 flex flex-wrap flex-col gap-1 md:absolute md:right-1 md:px-2 md:-mt-14 md:flex-row text-center'>
                                    <div className='w-20 h-20 mx-auto rounded-full bg-gray-700 border-4 border-purple-800 hover:border-white overflow-hidden text-center md:h-14 md:w-14'>
                                        <img src={profilePic} alt="User" />
                                    </div>
                                    <div className='flex mt-3 bg-yellow-200 align-middle justify-center gap-2 '>
                                        <div className='w-3 h-3 rounded-full bg-green-500 mt-[.15rem]'></div>
                                        {user.email && <p className='bg-green-30 text-[.7rem] text-gray-50 font-bold font-serif md:text-white md:font-roboto md:ml-2 md:text-lg  '>{user.lastName + " " + user.firstName}</p>}
                                    </div>
                                </li>

                                <div className='relative'>
                                    <li className='relative text-center'>
                                        <NavLink to="/cart" className={`${cart} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3`}>Cart</NavLink>
                                        {cart === active && <div className='hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                    </li>
                                    {cartCount > 0 &&
                                        <div className='bg-red-600 text-white font-bold font-roboto border-2 box-content border-black absolute -top-2 -right-1 rounded-full w-6 h-6 flex text-center md:top-2 md:-right-7 md:text-lg'>
                                            <p className='w-full h-full'>{cartCount}</p>
                                        </div>}
                                </div>

                                {sideBarNavLinks.map(links => {
                                    return (
                                        <li key={links.path + "KEY"} className='relative text-center'>
                                            <NavLink to={`/${links.path}`} className={`${links.style} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 `}>{links.text}ggh</NavLink>
                                            {links.style === active && <div className='hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                        </li>
                                    )
                                })
                                }

                                {user.email === process.env.REACT_APP_ADMIN_EMAIL &&
                                    <li className='relative text-center'>
                                        <NavLink to="/admin-chat-room" className={`bg-orange-600 text-purple hover:bg-purple-900 text-white pt-3 text-xl xl:text-[.7rem] active:bg-green-600 font-bold block rounded-md h-12 p-2 text-center mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-purple-500 md:px-0 md:text-lg `}>CHAT ROOM</NavLink>
                                    </li>}

                                <li ><NavLink to="/" onClick={handleLogOut} className='bg-red-500 hover:bg-red-800 text-white font-bold block rounded-md text-xl pt p-2 text-center mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-red-500 md:px-0 md:text-lg  xl:text-[.7rem]'>Log Out</NavLink></li>
                            </ul>

                            <ul onClick={() => handleMenuClick("close")} className='lg:flex md:justify-around md:mt-14 md:w-full bg-red-40' >

                                <li className='mt-16 mb-4 flex flex-wrap flex-col gap-1 lg:absolute lg:right-1 lg:px-2 lg:-mt-14 lg:flex-row text-center'>
                                    <div className='w-20 h-20 mx-auto rounded-full bg-gray-700 border-4 border-purple-800 hover:border-white overflow-hidden text-center md:h-28 md:w-28'>
                                        <img src={profilePic} alt="User" />
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        <div className='w-3 h-3 md:h-4 md:w-4 rounded-full bg-green-500 mt-[.15rem] md:mt-4'></div>
                                        {user.email && <p className='text-[.9rem] text-white font-bold font-mono lg:text-white md:font-roboto md:mt-3 md:ml-2 md:text-xl  '>{user.lastName + " " + user.firstName}</p>}
                                    </div>
                                </li>

                                <div className='relative'>
                                    <li className='relative text-center'>
                                        <NavLink to="/cart" className={`${cart} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3`}>Cart</NavLink>
                                        {cart === active && <div className='hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                    </li>
                                    {cartCount > 0 &&
                                        <div className='bg-red-600 text-white font-bold font-roboto border-2 box-content border-black absolute -top-2 -right-1 rounded-full w-6 h-6 flex text-center md:top-2 md:-right-7 md:text-lg'>
                                            <p className='w-full h-full'>{cartCount}</p>
                                        </div>}
                                </div>

                                {sideBarNavLinks.map(links => {
                                    return (
                                        <li key={links.path + "KEY"} className='relative text-center'>
                                            <NavLink to={`/${links.path}`} className={`${links.style} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 `}>{links.text}gh</NavLink>
                                            {links.style === active && <div className='hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                        </li>
                                    )
                                })
                                }

                                {user.email === process.env.REACT_APP_ADMIN_EMAIL && <li className='relative text-center'>
                                    <NavLink to="/admin-chat-room" className={`bg-orange-600 text-purple hover:bg-purple-900 text-white pt-3 text-xl md:text-[2rem] md:pt-5 xl:text-[.7rem] active:bg-green-600 font-bold block rounded-md h-12 md:h-16 p-2 text-center mt-3 lg:bg-transparent lg:hover:bg-transparent lg:hover:text-purple-500 lg:px-0 lg:text-lg `}>CHAT ROOM</NavLink>

                                </li>}

                                <li ><NavLink to="/" onClick={handleLogOut} className='bg-red-500 hover:bg-red-800 text-white font-bold block rounded-md text-xl md:text-[2rem]  md:pt-4 pt p-2 md:h-16 text-center mt-3 lg:bg-transparent lg:hover:bg-transparent lg:hover:text-red-500 lg:px-0 lg:text-lg  xl:text-[.7rem]'>Log Out</NavLink></li>
                            </ul>
                        </>)

                        :
                        (<>
                            <ul onClick={() => handleMenuClick("close")} className=' lg:hidden md:justify-around md:mt-20 md:w-full' >

                                <li className='bg-yellow-40 mt-16 flex flex-wrap justify-center text-center'>
                                    <div className='flex align-middle justify-center pt-4 w-20 h-20 rounded-full bg-[#dddddd] border-4 border-purple-800 hover:border-white overflow-hidden text-center md:h-20 md:w-20 md:pt-4'>
                                        <Avatar />
                                    </div>
                                </li>

                                <li className='relative text-center bg-red-30 animate__animated animate__fadeInUp' >
                                    <NavLink to="/about-us" className={`${aboutUs} active:bg-green-600 font-bold block rounded-xl text-center`}>About Uskf</NavLink>
                                    {aboutUs === active && <div className='hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                </li>

                                {sideBarNavLinks.map(links => {
                                    return (
                                        <li key={links.path} className='relative text-center animate__animated animate__fadeInUp'>
                                            <NavLink to={`/${links.path}`} className={`${links.style} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 `}>{links.text}h</NavLink>
                                            {links.style === active && <div className='transition-all hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                        </li>
                                    )
                                })
                                }

                                <li className='animate__animated animate__fadeInUp'><NavLink to="/sign-in " className='text-purple text-white pt-3 text-xl mt-3 md:py-6 bg-green-500 hover:bg-green-700 active:bg-green-600 font-bold block rounded-xl p-2 text-center md:text-[2rem]'>Sign In</NavLink></li>

                            </ul>


                            <ul className='hidden lg:flex md:justify-around md:mt-14 md:w-full' >

                                <li className='bg-yellow-400 mt-16 flex flex-wrap justify-center md:absolute md:right-3 md:h-2 md:px-2 md:-mt-10 md:flex-row text-center'>
                                    <div className='flex align-middle justify-center pt-4 w-20 h-20 rounded-full bg-[#dddddd] border-4 border-purple-800 hover:border-white overflow-hidden text-center md:h-14 md:w-14 md:pt-1'>
                                        <Avatar />
                                    </div>
                                </li>

                                <li className='relative text-center bg-red-30' >
                                    <NavLink to="/about-us" className={`${aboutUs} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-purple-500 md:px-0  md:text-xl`}>About Usgw</NavLink>
                                    {aboutUs === active && <div className='hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                </li>

                                {sideBarNavLinks.map(links => {
                                    return (
                                        <li key={links.path} className='relative text-center'>
                                            <NavLink to={`/${links.path}`} className={`${links.style} active:bg-green-600 font-bold block rounded-xl p-2 text-center text-sm mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-purple-500 md:px-0 md:text-lg `}>{links.text}h</NavLink>
                                            {links.style === active && <div className='transition-all hidden lg:block md:relative md:bottom-6'><ArrowDropUp sx={{ fontSize: 45, color: 'whitesmoke' }} /></div>}
                                        </li>
                                    )
                                })
                                }

                                <li><NavLink to="/sign-in " className='bg-purple-600 hover:bg-green-600 active:bg-green-600 text-white font-bold block rounded-xl p-2 text-center text-sm mt-3 md:bg-transparent md:hover:bg-transparent md:hover:text-green-600 md:px-0 md:text-lg xl:text-[.7rem]'>Sign In</NavLink></li>
                            </ul>
                        </>)

                    }
                </div>
            </header>

        </>
    )
}
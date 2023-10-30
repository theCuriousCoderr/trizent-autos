import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import QuickFind from '../components/QuickFind';
import ViewCatalogue from '../components/ViewCatalogue';
import Gallery from '../components/Gallery';
import BackToTop from '../components/BackToTop';
import car2 from '../images/car2.jpg';
import plambo from "../images/plambo.jpg"
import PopUp from '../components/PopUp';
import BusinessHours from '../components/BusinessHours';
import CartContent from '../components/CartContent';
import ServicesShow from '../components/ServicesShow';
import Header from '../components/Header';
import { companyName } from '../config';




export default function Home({ isSignIn, cartItems, setCartItems, setIsSignIn, signInWelcome, cartCount, setCartCount, setSignInWelcome }) {
    useEffect(() => {
        // window.scrollTo(0, 0);
        let user = localStorage.getItem("user");
        let test;
        try {
            user = JSON.parse(user);
            test = user.loggedIn;
        } catch (error) {
            user = { "loggedIn": "false" };
        }
        if (user.loggedIn === "true") {
            setIsSignIn(n => setIsSignIn(true));
            let cart = localStorage.getItem(user.email);
            try {
                cart = JSON.parse(cart);
                if (cart.length > 0) {
                    setCartItems(n => setCartItems(cart));
                }
            } catch (error) {
                setCartItems(n => setCartItems([]));
            }
        }
    }, []);

    if (signInWelcome === "show") {
        setTimeout(() => {
            setSignInWelcome("hidden");
        }, 5000);
    }

    const secLinks = [
        { "path": "/about-us", "text": "ABOUT US" },
        { "path": "/services", "text": "SERVICES" },
        { "path": "/reviews", "text": "REVIEWS" },
        { "path": "/contact-us", "text": "CONTACT US" }
    ];

    const whyUs = [
        { "reason": "Timeliness", "text": `At ${companyName}, we redefine the meaning of efficiency and punctuality. We understand that time is a valuable asset, and we are committed to delivering results that align with your schedule and expectations. ` },
        { "reason": "Trustworthy", "text": `Trust is earned through consistency, transparency, and integrity. Our track record speaks for itself, as we've diligently fostered trust-based relationships with clients like you. When you choose us, you're not just selecting a service; you're choosing a partner who values honesty and reliability above all else. ` },
        { "reason": "Accuracy and Efficiency", "text": `Behind every successful project is a team that thrives on accuracy and efficiency. Our skilled professionals not only possess the expertise to handle even the most complex tasks but also bring a sense of urgency that drives us to excel in every endeavor. ` },
        { "reason": "Reputable and Reliable", "text": `When it comes to choosing a partner, reputation and reliability are the cornerstones of confidence. At [Your Company Name], we've earned our standing as a trusted name through unwavering commitment to excellence and a track record of reliability that speaks for itself. ` },
        { "reason": "Home Service", "text": ` With ${companyName}, expertise comes to you. Our team of trained professionals arrives fully equipped to provide top-notch services that meet the highest standards. From routine maintenance to intricate projects, we have the skills and tools to deliver results that elevate the quality of your living space.` },
        { "reason": "Mobile Workshop", "text": ` We understand the challenges of balancing a busy schedule with essential vehicle care. Our mobile workshop is designed with your convenience in mind. Say goodbye to long wait times at traditional workshops; we arrive at your preferred location, equipped and ready to address your automotive needs, all while you carry on with your day.` }
    ];

    return (
        <div className='page-transition'>
            {signInWelcome === "show" && <PopUp addedPrompt={signInWelcome} text="Logged In Successfully !" />}
            {/* {cartCount > 0 && <CartContent cartCount={cartCount} />} */}
            <div className="bg-white md:h-full md:overflow-scroll no-scrollbar ">
                <BackToTop />

                <div className='hidden bg-white z-10 fixed mt-24 left-0 pt-5 md:block md:h-20 w-full p-2 text-center'>
                    <ViewCatalogue text="slate-700" />
                </div>

                <div className='overflow-hidden relative mx-auto lg:p-2 lg:portrait:w-[80%] bg-red-4 xl:portrait:w-full '>
                    {/* Side-Bar */}
                    <div className='mt-3 shadow-3xl relative no-scrollbar md:landscape:w-2/3 md:landscape:mx-auto md:portrait:float-left md:portrait:w-[39%] md:h-3/4 md:overflow-scroll md:no-scrollbar md:portrait:fixed md:portrait:top-48 md:space-y-3 md:m-1
                    md:landscape:mt-0
                    lg:portrait:w-[40%] lg:-top-3 lg:portrait:h-[98rem] lg:portrait:relative lg:portrait:space-y-20 lg:portrait:bg-fuchsia-200
                    lg:landscape:w-1/3 lg:landscape:float-left lg:landscape:h-auto lg:landscape:mt-40
                    xl:landscape:block xl:landscape:float-none xl:landscape:w-full xl:landscape:space-y-0 xl:landscape:mb-20'
                    >
                         <Header isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} cartCount={cartCount} setCartCount={setCartCount} />
                        <div className='bg-gray-900 p-2 w-[90%] mx-auto'>
                            <div className='w-[90%] mx-auto'>
                                <ServicesShow />
                            </div>
                        </div>
                       
                        <div className='w-full p-2 bg-yellow-40'>
                            <BusinessHours />
                        </div>

                        <div className='mt-5 relative w-auto mb-4 text-center overflow-hidden md:w-full md:m-0 md:p-0 lg:portrait:h-[30%]
                    xl:landscape:w-full xl:landscape:text-xl
                    '>
                            <div className='bg-red-300 w-full md:w-full'>
                                <img src={plambo} alt="Home Car." className='relative w-full h-full peer md:h-[30rem] md:w-full' />
                            </div>

                            {/* <div className='absolute top-5 flex flex-wrap justify-center space-y-1 md:top-0 lg:portrait:py-3 xl:mt-3 xl:block xl:w-2/3 xl:left-[15%]'>
                                <h2 className=' font-bold text-slate-700'>Your one stop for all your car concerns.</h2>
                                <h2 className=' font-bold text-slate-500'>We Sell, We Rent, We Repair.</h2>
                                <div className='flex gap-5 justify-center'>
                                    {["Sales", "Rentals", "Repairs"].map(services => <p key={services} className='border-2 border-purple-950 px-2 text-purple-900 font-bold '>{services}</p>)}
                                </div>
                            </div> */}
                            <div className=' absolut w-full bottom-7 left-0 mx-auto text-center md:w-full md:bottom-2 md:p-2  '>
                                {/* <h2 className='text-slate-200 text-[1.1rem] font-mono font-bold xl:text-[1.4rem] xl:mb-2'>WE WANT TO BE YOUR ONE FOR ALL !</h2> */}
                                <ViewCatalogue bg="purple-900" text="slate-100" />
                            </div>
                        </div>

                        <div className='hidden my-10 lg:block lg:portrait:h-[30%]
                    xl:hidden
                    '>
                            <Gallery />
                        </div>
                    </div>

                    {/* Main Secton */}
                    <div className='md:landscape:w-2/3 md:landscape:mx-auto md:portrait:float-right md:portrait:w-[59%] md:mt-36
                lg:portrait:-mt-3
                lg:landscape:float-right lg:landscape:w-[66%] lg:landscape:mt-32
                xl:landscape:float-none xl:landscape:w-full xl:portrait:w-full
                '>
                        <div className='relative my-10 bg-green-40 hidde'>
                            <QuickFind />
                        </div>

                        {/* <div className='my-10 lg:hidden xl:block '>
                            <Gallery />
                        </div> */}

                        <div className=' mb-10 bg-red-30 lg:hidden'>
                            <div className='bg-red-5 p-3'>
                                <div className='text-gray-900 text-2xl font-black text-center m-3 border-b-2 border-gray-900 bg-yellow-40'>WHY US</div>
                                <div className='space-y-5 lg:flex lg:flex-wrap lg:justify-evenly lg:space-y-0 gap-1 py-2'>
                                    {whyUs.map(options => {
                                        return (
                                            <div key={options.reason} className='text-left border-l-4 border-gray-900 px-4 space-y-2 bg-red-20 lg:w-[30%] lg:h-40'>
                                                <p className='text-gray-950 text-xl font-bold font-roboto uppercase'>{options.reason}</p>
                                                <div className='w-full no-scrollbar text-base font-poppins lg:h-[80%] text-slate-700 font-medium'>{options.text}</div>
                                                
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className='m-1 w-auto h-42 text-center p-4 space-y-8 mb-4 md:text-2xl lg:absolute lg:right-0 lg:w-[30%]'>
                                {secLinks.map((link => <h2 key={link.path}><NavLink to={link.path} className='block border-2 border-purple-800 px-24 py-2 font-bold text-violet-600 hover:text-white hover:bg-violet-900 lg:portrait:px-2' >{link.text}</NavLink></h2>))}
                            </div>
                        </div>

                        <div className='lg:hidden'>
                            <div className='text-center p-2 mb-5 w-full md:mb-10 '>
                                <ViewCatalogue text="slate-700" />
                            </div>
                            <div>
                                <Footer />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='hidden shadow-xl border-4 lg:flex lg:justify-between lg:portrait:w-[80%] lg:portrait:mx-auto lg:bg-gray-100 lg:border-gray-900 xl:landscape:flex-col xl:landscape:mt-20'>
                    <div className='bg-slate-900 p-3 lg:w-[65%] lg:portrait:pt-5 xl:landscape:w-full '>
                        <h2 className='text-gray-900 font-bold text-center'>Why Us </h2>
                        <div className='space-y-5  lg:flex lg:flex-wrap lg:justify-evenly lg:space-y-0 gap-1 xl:mt-4'>
                            {whyUs.map(options => {
                                return (
                                    <div key={options.reason} className='text-center bg-slate-600 lg:w-[30%] lg:h-40 xl:w-full'>
                                        <div className='w-full h-40 overflow-scroll no-scrollbar bg-blue-400 lg:h-[80%] p-2 text-slate-100'>{options.text}</div>
                                        <p className='text-orange-400 font-roboto p-1'>{options.reason}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className='m-1 w-auto h-42 text-center p-4 space-y-8 mb-4 md:text-2xl lg:w-[33%] lg:space-y-14 xl:landscape:w-full'>
                        {secLinks.map((link => <h2 key={link.path}><NavLink to={link.path} className='block border-2 border-purple-800 px-24 py-2 font-bold text-violet-600 hover:text-white hover:bg-violet-900 lg:portrait:px-2' >f{link.text}</NavLink></h2>))}
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <div className='lg:hidden text-center p-2 mb-5 w-full md:mb-10 '>
                        <ViewCatalogue />
                    </div>
                    <div className='hidden my-10 text-center lg:block lg:px-5 lg:w-3/4 lg:h-40 lg:py-14 lg:mx-auto relative'>
                        <ViewCatalogue />
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}


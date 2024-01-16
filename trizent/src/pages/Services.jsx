import React, { useEffect, useState } from 'react';
import { car_database, repairs_database } from '../components/Car_Database';
import Filter from '../components/Filter';
import car1 from '../images/car1.jpg';
import Search from '@mui/icons-material/Search';
import RentalItem from '../components/RentalItem';
import SalesItem from '../components/SalesItem';
import SalesItemInfo from '../components/SalesItemInfo';
import { purple } from '@mui/material/colors';
import { NavLink, useNavigate } from 'react-router-dom';
import BackToTop from '../components/BackToTop';
import { FlagCircle } from '@mui/icons-material';
import Header from '../components/Header';


function Sales({data, filter, handleFilterChange, handleFilterSubmit, salesInfo, setSalesInfo, setCartItems, cartItems, setCount, rentalData}) {

	
	return (
		<> 
			{
				!salesInfo ? 
					<>
						<div className='p-1'>
							<Filter filter={filter} handleFilterChange={handleFilterChange} handleFilterSubmit={handleFilterSubmit} data={data} />
						</div>
						<div className='flex items-center gap-2 m-3'>
							<FlagCircle sx={{fontSize: 40, color: purple[800] }} />
							<p className='font-bold text-lg'>XXXX cars for sale</p>
						</div>
						<div className='flex flex-wrap text-center justify-center space-y-5 mt-4'>
							<p>sjsjh</p>
							<ul className='bg-slate-50 flex flex-wrap w-full justify-evenly md:flex md:flex-row md:justify-between md:flex-wrap md:w-full md:p-3'>
								{ data === "No Results Found Matching This Filter" ? <h2 className='font-bold text-3xl'>No Results Found Matching This Filter</h2> : 
			
								(data.map((item) => {
									return (
										// <div>
											
											<SalesItem key={item.objectId} item={item} image={car1} setSalesInfo={setSalesInfo}  />
										// </div>
										
									)
								}))
								}
							</ul>
						</div>
					</> : 
					<div className='md:p-2'>
						<SalesItemInfo key={salesInfo.objectId} salesInfo={salesInfo} car1={car1} setCartItems={setCartItems} cartItems={cartItems} tag="Sales" />	
					</div>
					
			}
		</>
	)
}

function Rentals({data, filter, handleFilterChange, handleFilterSubmit, salesInfo, setSalesInfo, setCartItems, cartItems, rentalData, setRentalData}) {
	return (
		<>
			{
				!salesInfo ? 
					<>
						<div className='p-1'>
							<Filter filter={filter} handleFilterChange={handleFilterChange} handleFilterSubmit={handleFilterSubmit} />
						</div>
						<div className='flex items-center gap-2 m-3'>
							<FlagCircle sx={{fontSize: 40, color: purple[800] }} />
							<p className='font-bold text-lg'>XXXX cars for rent</p>
						</div>
						<div className='flex flex-wrap text-center justify-center space-y-5 mt-10'>
							<ul className='bg-slate-50 flex flex-wrap w-full justify-evenly md:flex md:flex-row md:justify-between md:flex-wrap md:w-full md:p-3'>
								{ data === "No Results Found Matching This Filter" ? <h2 className='font-bold text-3xl'>No Results Found Matching This Filter</h2> : (data.map((item) => {
									return (
										<RentalItem key={item.objectId} item={item} image={car1} setSalesInfo={setSalesInfo} />
									)
								}))
								}
							</ul>
						</div>
					</> : <SalesItemInfo key={salesInfo.objectId} salesInfo={salesInfo} car1={car1} setCartItems={setCartItems} cartItems={cartItems} tag="Rentals" rentalData={rentalData} setRentalData={setRentalData} />	
			}
		</>
	)
}

function Repairs({repairs_database, setCartItems, cartItems, repairService, setRepairService}) {
	const [data, setData] = useState({});
	const [checkBox, setCheckBox ] = useState(true);
	const [details, setDetails] = useState({
		"name": "",
		"phone": "",
		"email": "",
		"year": "",
		"make": "",
		"model": "",
		"category": "",
		"date": "",
		"time": "",
		"address": "",
		"tag": "Repairs",
		"location": ""
	});
	const [keyWords, setKeyWords] = useState({
		"search": "",
		"word": ""
});
	const [copyRepairsDatabase, setCopyRepairsDatabase] = useState([...repairs_database]);
	useEffect(()=>{window.scrollTo(0, 0);},[]);
	let navigate = useNavigate();
	function handleShowService(param){
		if (user.loggedIn === "false"){
            navigate("/sign-in");
            return;
        }
		setData(param);
		setKeyWords({...keyWords, "search": ""});
		setRepairService("showService");
	}

	function handleCheckBoxToggle(param) {
		if (param === "home") {
			setCheckBox(true);
		} else {
			setCheckBox(false);
		}
	}


	let user = localStorage.getItem("user");
    user = JSON.parse(user);
	function handleFormSubmit(e){
		e.preventDefault();
		let newCartItems = ( checkBox ? {...data, ...details, "location": "Home Service"} : {...data, ...details, "location": "Workshop Service"} ) ;
		for (let items of cartItems) {
			if (items.title == newCartItems.title ) {
				setRepairService("");
				return 0;
			}
		}
		newCartItems = [...cartItems, newCartItems ]
		localStorage.setItem(`${user.email}`, JSON.stringify(newCartItems));
		setCartItems(newCartItems);
		setRepairService("");
	}

	function handleDetailsChange(e) {
		let name = e.target.name;
		let value = e.target.value; 
		
		setDetails({...details,[name]: value });
	}


	function handleSearchSubmit(e) {
		e.preventDefault();
		setKeyWords({...keyWords, "word": keyWords.search});
		setCopyRepairsDatabase( repairs_database.filter(
				(items) => items.title.toLowerCase().includes(keyWords.search.toLowerCase())
			)
		);
	}

	return (
		<div className=''>
			<form onSubmit={handleSearchSubmit} className='flex justify-center md:text-2xl'>
				<input type="text" value={keyWords.search} onChange={(e)=> setKeyWords({...keyWords, "search": e.target.value})} placeholder='Search for a repair service' className='w-72 border border-purple-700 rounded-lg p-2 m-2 md:w-full md:h-14' />
				<button type="submit" className='pt-1 mr-2 hover:bg-purple-200 hover:rounded-lg active:bg-green-600'>
					<Search sx={{fontSize: 40, color: purple[800]}} />
				</button>
			</form>
		
		{ !(repairService === "showService") ? 
		<div className='p-2 md:text-2xl'>
			{ copyRepairsDatabase.length > 0 ? 
				copyRepairsDatabase.map(items => {
					return (
						<div key={items.title} className='border border-black p-2 mb-5 '>
							<div className='float-right'>
								{ items.url ?  <div className='flex align-middle justify-center h-20 w-20'>
									<img src={items.url} className='h-full w-full' alt={items.title} />
								</div> : <div className='h-20 w-20 bg-red-500'></div>}
							</div>
							<h3 className='font-bold text-black text-xl'>{items.title}</h3>
							<p className='text-gray-800 font-normal'>{items.content}</p>
							<div className='p-1'>
								<button onClick={() => handleShowService(items)} className='bg-blue-900 w-full text-white font-bold text-center py-2 block mt-3'>Schedule Service</button>
							</div>
						</div>
					)
				}) : 
				<h2 className='font-medium text-purple-900 text-center p-2 bg-purple-300 rounded-lg'>No Repairs Service Available Matching "{keyWords.word}"</h2>
			}
		</div> : 
		<>
		<div className='w-80 mx-auto text-center text-sm font-medium mb-3 bg-violet-100 p-2 rounded-xl text-purple-950 md:text-xl md:w-2/3'>
			<p>Please note that the date and time you requested may not be available. We will contact you to confirm your actual appointment details. </p>
		</div>
		<div className='bg-violet-900 w-80 mx-auto mb-28 py-5 px-5 space-y-3 rounded-xl md:w-2/3 md:text-xl md:space-y-5'>
			<h2 className='text-white font-bold text-xl text-center pb-1 border-b-4 border-white md:text-2xl'>{data.title}</h2>
			<div className='flex justify-center gap-7'>
				<div className='flex flex-wrap align-middle gap-1'>
					<input name="location" value="home" id="home" onChange={() => handleCheckBoxToggle("home")} checked={checkBox} type="checkbox" className='h-5 w-5 mt-1 accent-orange-300 md:mt-2' />
					<label htmlFor='location' className={`font-medium text-sm mt-[.2rem] ${checkBox ? "text-orange-300" : "text-white"} md:text-xl`} >Home Service</label>
				</div>
				<div className='flex flex-wrap align-middle gap-1'>
					<input name="location"  value="work" onChange={() => handleCheckBoxToggle("work")} checked={!checkBox} type="checkbox" className='h-5 w-5 mt-1 accent-orange-300 md:mt-2 ' />
					<label htmlFor='location' className={`font-medium text-sm mt-[.2rem] ${!checkBox ? "text-orange-300" : "text-white"} md:text-xl`} >Workshop Service</label>
				</div>
			</div>
			<form onSubmit={handleFormSubmit} className='space-y-3'>
				<div className=''>
					<label htmlFor='name' className='block text-white'>Name</label>
					<input name="name" placeholder='Your Full Name' autoComplete='off' value={details.name} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='phone' className='block text-white'>Phone</label>
					<input name="phone" maxLength={11} placeholder='Phone Number' autoComplete='off' value={details.phone} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='email' className='block text-white'>Email</label>
					<input name="email" placeholder='E-mail' autoComplete='off' value={details.email} onChange={handleDetailsChange} type="email" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='year' className='block text-white'>Year</label>
					<input name="year" maxLength={4} placeholder='Car Year e.g 2020' autoComplete='off' value={details.year} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='make' className='block text-white'>Make </label>
					<input name="make" placeholder='Car Make e.g. Audi' autoComplete='off' value={details.make} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='model' className='block text-white'>Model </label>
					<input name="model" placeholder='Car Model e.g. Q3' autoComplete='off' value={details.model} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='category' className='block text-white'>Category</label>
					<input name="category" placeholder='Car Category e.g. SUV' autoComplete='off' value={details.category} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='date' className='block text-white'>Choose a Date</label>
					<input name="date" autoComplete='off'  value={details.date} onChange={handleDetailsChange} type="date" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				<div className=''>
					<label htmlFor='time' className='block text-white'>Choose a Time</label>
					<input name="time" autoComplete='off' value={details.time} onChange={handleDetailsChange} type="time" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14' />
				</div>
				{ checkBox &&
				<div className=''>
					<label htmlFor='address' className='block text-white'>Address</label>
					<textarea name="address" autoComplete='off' placeholder='Home Address' value={details.address} onChange={handleDetailsChange} type="text" className='w-full bg-transparent border-2 border-white p-1 px-3 font-semibold text-white text-lg md:text-xl md:h-14'></textarea>
				</div> }
				<div className='text-center'>
					<button type="submit" className='text-white font-bold bg-purple-700 w-52 p-3 text-lg md:text-xl md:h-14 rounded-xl hover:bg-orange-500 hover:text-violet-900 active:bg-green-600'>Book Service</button>
				</div>
			</form>
		</div></>
		
		}</div>
	)
}

function Content({stat, data, repairs_database, filter, handleFilterChange, handleFilterSubmit, salesInfo, setSalesInfo, setCartItems, cartItems,  repairService, setRepairService, setCount, rentalData, setRentalData }) {
	useEffect(()=>{window.scrollTo(0, 0);},[]);
	if (stat === "sales") {
		return < Sales 
				 data={data} 
				 filter={filter} 
				 handleFilterChange={handleFilterChange} 
				 handleFilterSubmit={handleFilterSubmit} 
				 salesInfo={salesInfo} 
				 setSalesInfo={setSalesInfo} 
				 setCartItems={setCartItems} 
				 cartItems={cartItems} 
				 setCount={setCount}
				/>
	}
	else if (stat === "rentals") {
		return < Rentals
				data={data} 
				filter={filter} 
				handleFilterChange={handleFilterChange} 
				handleFilterSubmit={handleFilterSubmit} 
				salesInfo={salesInfo} 
				setSalesInfo={setSalesInfo} 
				setCartItems={setCartItems} 
				cartItems={cartItems}
				rentalData={rentalData} 
				setRentalData={setRentalData}
			/>
	}
	else if (stat === "repairs") {
		return < Repairs 
				repairs_database={repairs_database} 
				setCartItems={setCartItems} 
				cartItems={cartItems} 
				repairService={repairService} 
				setRepairService={setRepairService} 
			/>
	}

}
export default function Services({isSignIn, setIsSignIn, setCartItems, cartItems, setCount, cartCount, setCartCount, rentalData, setRentalData}) {
	const [stat, setStat] = useState("sales");
	const [filter, setFilter] = useState({});
	const [data, setData] = useState(car_database);
	const [data1, setData1] = useState(car_database);
	const [change, setChange ] = useState("yes");
	const [salesInfo, setSalesInfo] = useState(null);
	const [repairService, setRepairService] = useState("");
	const [path, setPath] = useState("")
	
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
		setPath("Sales")
	  },[]);


	let url = window.location.href;
	if (url.includes("sales") && change === "yes") {
		setChange(n=> setChange("no"));
		setStat("sales");
	}
	if (url.includes("rentals") && change === "yes") {
		setChange(n=> setChange("no"));
		setStat("rentals");
	}
	if (url.includes("repairs") && change === "yes") {
		setChange(n=> setChange("no"));
		setStat("repairs");
	}

	// let style = "border-4 border-purple-400 bg-gradient-to-tr from-red-300 to-white text-violet-900 hover:bg-purple-500 hover:border-purple-900 rounded-full w-full flex items-center justify-center ";
	let style = "border-4 border-purple-400 text-violet-900 hover:bg-purple-100 hover:border-purple-900 rounded-full w-full flex items-center justify-center font-bold ";
	let secStyle = "bg-violet-900 rounded-full w-full flex items-center justify-center font-normal";
	let sales, rentals, repairs;
	if (stat === "sales") {
		sales =  style;
		rentals = secStyle;
		repairs = secStyle;
	}else if (stat === "rentals") {
		rentals =  style;
		sales = secStyle;
		repairs = secStyle;
	}else {
		repairs = style;
		sales = secStyle;
		rentals = secStyle;
	}

	function handleFilterChange(e) {
		
		let inputName = e.target.name;
		let inputValue = e.target.value;
		let newData;
		setFilter({...filter, [inputName] : inputValue});
	}


	function handleFilterSubmit(e) {
		e.preventDefault();
		let newData = [...car_database];
		let freshData = [];
		alert(JSON.stringify(filter))
	
		
		for (let key in filter) {
			if (filter[key].length > 0) {
				for (let item of newData) {
					if (key === "Price" || key === "Mileage" || key === "Seats" ) {
						let tmp = parseFloat(item[key].replace(",",""))
						if (tmp <= parseFloat(filter[key].replace(",",""))) { 
							freshData.push(item) 
						}
					}
					else if ((item[key].toString().toLowerCase() === filter[key].toLowerCase())) { 
						freshData.push(item) 
					};
				}
				newData = [...freshData];
				freshData = [];
			}
		}
		if(newData.length === 0) {
			setData("No Results Found Matching This Filter");
		} else {
			setData(newData);
		}
		
		
	}
	return (
	<div className='page-transition md:mt-32'>
		<div>
		<Header isSignIn={isSignIn} setIsSignIn={setIsSignIn} cartItems={cartItems} cartCount={cartCount} setCartCount={setCartCount} />
		</div>
		<div className='md:relative md:top-3'>
			<h1 className='text-center text-xl font-bold md:text-3xl'>SERVICES/ <span className='text-fuchsia-700 font-medium  text-md rounded-xl '>{path}</span></h1>
			<div className='border-2 border-black m-2' ></div>
		</div>
		
		<div className='md:mt-8'>
			<div className='flex justify-evenly md:text-xl md:h-14 p-2 text-white mt-5 mb-5'>
				<p className='bg-red-30 w-20 flex justify-center'><NavLink to="#" onClick={() => { setSalesInfo(n => setSalesInfo(null)); setStat("sales"); setPath("Sales")}} className={`${sales} hover:bg-violet-900 p-2`}>Sales</NavLink></p>
				<p className='bg-red-30 w-20 flex justify-center'><NavLink to="#" onClick={() => { setSalesInfo(n => setSalesInfo(null)); setStat("rentals"); setPath("Rentals")}} className={`${rentals} hover:bg-violet-900 p-2`}>Rentals</NavLink></p>
				<p className='bg-red-30 w-20 flex justify-center'><NavLink to="#" onClick={() => { setRepairService(n => setRepairService("")); setStat("repairs"); setPath("Repairs")}} className={`${repairs} hover:bg-violet-900 p-2`}>Repairs</NavLink></p>
			</div>
			<div>
				<Content 
					stat={stat} 
					data={data} 
					repairs_database={repairs_database} 
					filter={filter} 
					handleFilterChange={handleFilterChange} 
					handleFilterSubmit={handleFilterSubmit} 
					salesInfo={salesInfo} 
					setSalesInfo={setSalesInfo} 
					setCartItems={setCartItems} 
					cartItems={cartItems}  
					repairService={repairService} 
					setRepairService={setRepairService} 
					setCount={setCount} 
					rentalData={rentalData} 
					setRentalData={setRentalData}
				/>
			</div>
		</div>
		<BackToTop />
	</div>
	)
}

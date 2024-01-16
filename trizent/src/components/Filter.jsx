import React, { useEffect, useState } from 'react';
import { car_database } from './Car_Database';
import { copyOptions } from './Car_Database';
import { options } from './Car_Database';

function Filter({ newFilter, filter, handleFilterChange, handleFilterSubmit }) {
  const [data, setdata] = useState(options)

  useEffect(()=> {
    let options = {
      year: [],
      make: [],
      model: [],
      category: [],
      color: []

    };
    // for (let cars of car_database ){
    //   if (!(options.year.includes(cars.Year))){
    //     options.year.push(cars.Year)
    //   }
    //   if (!(options.make.includes(cars.Make))){
    //     options.make.push(cars.Make)
    //   }
    //   if (!(options.model.includes(cars.Model))){
    //     options.model.push({[cars.Make]: [cars.Model]})
    //   }
    //   if (!(options.category.includes(cars.Category))){
    //     options.category.push({[cars.Make]: [cars.Category]})
    //     // options.category.push(cars.Category)
    //   }
    //   if (!(options.color.includes(cars.Color))){
    //     options.color.push(cars.Color)
    //   }
    // }
    // alert(options)
    // if (filter.Make){
    //   let opM, opC;
    //   // for (let items in options){
    //     opM = options.model.filter(op => op.Make === filter.Make)
    //     opC = options.category.filter(op => op.Make === filter.Make)
        
    //   // }
    //   alert(JSON.stringify(options))
    //   setdata({...options, model: opM, category: opC})
      
    // } else {
    //   alert(JSON.stringify(options))
    //   setdata(options)
    // }
  }, [])
 

  return (
    <div className='bg-[rgba(67,67,113,0.12)] w-[95%] p-3 mx-auto rounded-lg shadow-xl' >
      <form onSubmit={handleFilterSubmit} className='space-y-3 p-1 relative mt-2 md:flex md:flex-wrap md:justify-between md:space-y-0 md:gap-3'>
        <div className='flex justify-between'>
          <div className='relative w-[17%] md:w-[49%]'>
            <select name="Year" value={filter.Year} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
              <option selected disabled >Year</option>
              {data.year.map(item => {
                return (
                  <option className='text-sm'>{item}</option>
                )
              })}
            </select>
            <p className=' peer-focus/name:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center md:text-lg md:-top-4'>Year</p>
          </div>

          <div className='relative w-[17%] md:w-[49%]'>
             <select name="Make" value={filter.Make} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
              <option disabled >Make</option>
              {/* <option selected={false} >Make</option> */}
              {data.make.map(item => {
                return (
                  <option className='text-sm'>{item}</option>
                )
              })}
            </select>
            <p className='peer-focus/make:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center  md:text-lg md:-top-4'>Make</p>
          </div>

          <div className='relative w-[17%] md:w-[49%]'>
          { filter.Make ? 
             <select name="Model" value={filter.Model} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
             <option disabled  >Model</option>
             {data.model.filter(item => Object.keys(item)[0] === filter.Make).map(item => {
               return (
                 <option className='text-sm'>{item[filter.Make]}</option>
               )
             })}
           </select> : 
            <select name="Model" value={filter.Model} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
            <option selected={false} >Model</option>
            {copyOptions.Model.map(item => {
              return (
                <option className='text-sm'>{item}</option>
              )
            })}
          </select>
          }
         
            <p className='peer-focus/model:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center  md:text-lg md:-top-4'>Model</p>
          </div>

          <div className='relative w-[17%] md:w-[49%]'>
          { filter.Make ? 
             <select name="Category" value={filter.Category} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
             <option selected={false} >Category</option>
             {data.category.filter(item => Object.keys(item)[0] === filter.Make).map(item => {
               return (
                 <option className='text-sm'>{item[filter.Make]}</option>
               )
             })}
           </select> : 
            <select name="Category" value={filter.Category} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
            <option selected={false} >Category</option>
            {copyOptions.Category.map(item => {
              return (
                <option className='text-sm'>{item}</option>
              )
            })}
          </select>
          }
            <p className='peer-focus/option:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center  md:text-lg md:-top-4'>Option</p>
          </div>

          <div className='relative w-[17%] md:w-[49%]'>
          <select name="Color" value={filter.Color} onChange={handleFilterChange} type="text" autoComplete='off' placeholder="Year-" className='peer/name focus:placeholder:invisible border border-violet-950 h-9 w-full rounded placeholder:text-sm'>
              <option selected={false} >Color</option>
              {data.color.map(item => {
                return (
                  <option className='text-sm'>{item}</option>
                )
              })}
            </select>
            <p className='peer-focus/color:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center  md:text-lg md:-top-4'>Color</p>
          </div>
        </div>

        <div className='flex flex-wrap justify-between'>
          <div className='relative w-[48%] md:w-[49%]'>
            <input name="Mileage" value={filter.Mileage} onChange={handleFilterChange} type="text" autoComplete='off' placeholder='-Mileage-' className='peer/mileage placeholder:p-2 focus:placeholder:invisible border border-violet-950 h-9 w-full p-2 pt-3 rounded' />
            <p className='peer-focus/mileage:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center  md:text-lg md:-top-4'>Mileage</p>
          </div>

          <div className='relative w-[48%] md:w-[49%]'>
            <input name="Price" value={filter.Price} onChange={handleFilterChange} type="text" autoComplete='off' placeholder='-Price range-' className='peer/price placeholder:p-2 focus:placeholder:invisible border border-violet-950 h-9 w-full p-2 pt-3 rounded' />
            <p className='peer-focus/price:block hidden absolute -top-2 text-[0.7rem] bg-white ml-2 px-1 font-bold text-center  md:text-lg md:-top-4'>Price</p><br />
          </div>
          
        </div>



        <button type="submit" className='font-bold text-xl bg-purple-800 text-slate-50 hover:bg-purple-50 hover:text-purple-800 active:bg-green-600 p-2 w-full text-center rounded-lg font-mono'>FILTER</button>
        <p className='text-sm'>*Results for any numeric filter apart from year will be results lesser than or equal to the inputed value</p>
      </form>
    </div>
  )
}

export default Filter;
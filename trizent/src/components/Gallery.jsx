import { ArrowBackIos, ArrowForwardIos, ArrowLeft } from '@mui/icons-material';
import { orange, purple } from '@mui/material/colors';
import React, {useState} from 'react';

function Gallery() {

  const [id, setId] = useState(0);

  let GalleryData = [
    {"url": "https://media.istockphoto.com/id/1450095848/photo/closeup-of-car-sale-and-buyer-shaking-hands-car-salesman-gives-keys-to-buyer-close-up-of-car.webp?b=1&s=170667a&w=0&k=20&c=REHcLhiN2I7jgW974RLHl7LoLRRGKKJnifE4vbtfmxE=", "text": "You can always trust us to deliver as promised."},
    {"url": "https://media.istockphoto.com/id/912785590/photo/couple-is-buying-new-car-and-signing-the-contract.webp?b=1&s=170667a&w=0&k=20&c=-PAP5rQBntE8dnDNuzcdp1P7Af34LFg51ivD575FxxQ=", "text": "Family plans and affordable prices to keep you within your budget "},
    {"url": "https://media.istockphoto.com/id/873965064/photo/find-your-new-car-online.jpg?s=612x612&w=0&k=20&c=n4y97ytiTeC1ywY2eT-wd5syCLI7r9hmEdkHN-XzvXI=", "text": "You can always find the solution to your car problems with us "},
    {"url": "https://media.istockphoto.com/id/978525302/photo/blue-car-on-laptop-keypad.webp?b=1&s=170667a&w=0&k=20&c=G71qQaXjRNTQqfi24xNmW9fibHaq0mhdtEYwXNsG1vE=","text": "We are reachable from almost anywhere and offer dynamic services" },
    {"url": "https://media.istockphoto.com/id/1134326407/photo/hand-with-a-car-key.jpg?s=612x612&w=0&k=20&c=FTp8pBrF9pUBbeLTip42Mjr_Xy_W6_r5Xc_VZRLvow0=", "text": "0ur services are available to you from the comfort of your home"},
    {"url": "https://media.istockphoto.com/id/1127285020/photo/young-smiling-couple-holding-hands-and-connecting-with-a-computer-late-at-night-they-are.jpg?s=612x612&w=0&k=20&c=XE3q2E_wSkp2W38XM7DB9NeTqeHjR2O48albbrdQ6VY=", "text": "Prices you and your partner can say YES to."},
    {"url": "https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?b=1&s=170667a&w=0&k=20&c=bTulLElNltgY6BlufWi_4kkaAbhl1QVw9I4biujk69w=", "text": "Your No 1 stop to rent quality and affordable cars"},
    {"url": "https://media.istockphoto.com/id/1412842971/photo/finally-at-the-destination.jpg?s=612x612&w=0&k=20&c=WV60DF-mQ4tRT9Mqn1QlPGXehPb2jTNPghDQ6PPUyDw=", "text": "No va-car-tion trouble ? No worries. We got you covered."},
    {"url": "https://media.istockphoto.com/id/1325588832/photo/pouring-motor-oil-for-motor-vehicles-from-a-gray-bottle-into-the-engine.jpg?s=612x612&w=0&k=20&c=8El-cOoOpGSDz-dOjozJn5ijlFOuE1WGQA1hsZvyyMk=", "text": "Quality over Quantity? Yes! Anytime., Anyday. "},
    {"url": "https://media.istockphoto.com/id/1165311626/photo/mechanic-using-a-ratchet-wrench.jpg?s=612x612&w=0&k=20&c=D4XCHr8BeR44hdJXS_Tp-9djQ7jWDKKkBWSKaqhuqK8=", "text": "Want quality repairs and maintenance ? Look no further."},
    {"url": "https://media.istockphoto.com/id/575132103/photo/mechanic-under-car-in-auto-repair-shop.jpg?s=612x612&w=0&k=20&c=eBsTuTY_oRaL43CM0dd1rFzZ9E1b7kzrUo5g9L-dDoo=", "text": "We triple-check just so you can drive without fear"}
  ];

  

  function handleGallerySlide(param) {
    let gallery = document.getElementById("gallery");
    let index = GalleryData.indexOf(param);
    gallery.scrollLeft = index*336;
    setId(index);
  }

  function handleClick(param) {
    if (param === "Back") {
      if (id === 0){
        setId(GalleryData.length-1);
      } else {
        setId(prevId => prevId - 1);
      }
    }
    if (param === "Forward") {
      if (id === GalleryData.length-1){
        setId(0);
      } else {
        setId(prevId => prevId + 1);
      }
    }
  }


  return (
    <>
      <div className='relative w-full border bg-slate-900 text-center py-3 h-[25rem] md:h-[30rem]
      '>
        <div className='absolute bottom-0 bg-yellow-40 w-full h-44 '></div>
        <div className='relative lg:portrait:-mt-2'>
          <h2 className='text-white text-2xl mb-3'>WHAT WE CAN DO FOR YOU </h2>
          <div>
            <div id="gallery" onClick={(e) => {handleClick('Forward')}} className='relative w-[21rem] h-56 mx-auto md:w-full md:p-2 md:h-80 '>
              <div className='absolute w-full h-20 bg-red-20 top-1/3 flex justify-between pt-5 px-2'>
                <span onClick={(e) => { e.stopPropagation(); handleClick('Back')}}> <ArrowBackIos sx={{fontSize: 40, color:orange[400]}} /> </span>
                <span onClick={(e) => {e.stopPropagation(); handleClick('Forward')}}> <ArrowForwardIos  sx={{fontSize: 40, color:orange[400] }} /> </span>
              </div>
              <img key={GalleryData[id].url} src={GalleryData[id].url} alt={GalleryData[id].text} className='w-[21rem] h-full border-4 bg-purple-500 rounded-xl mx-auto md:w-full' />
            </div>
          </div>
          <div className='my-2'>
            {GalleryData.map((item)=> <div key={item.url} className={`mr-2 h-4 w-4 rounded-full inline-block border border-transparent ${GalleryData[id] === item ? "bg-slate-200" : "bg-transparent"}`} onClick={()=>handleGallerySlide(item)}></div> )}
          </div>
          <div className='flex justify-center align-middle -mt-2'>
            <p className='text-slate-100 text-md font-semibold font-roboto shadow-lg m-2 md:text-xl'>{GalleryData[id].text.toUpperCase()}</p>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default Gallery;
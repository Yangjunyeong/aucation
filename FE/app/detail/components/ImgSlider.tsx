import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { deflate } from 'zlib';

import imageData from './DummyImg';


const renderSlides = imageData.map(image => (
  <div key={image.alt}>
    <img src={image.url} alt={image.alt}/>
  </div>
))

const ImgSlider = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  function handleChange(index:number) {
    setCurrentIndex(index)
  }

  return (
    <div className='flex justify-center items-center py-5 px-3'>
      <Carousel
        showArrows={true}
        centerMode={true}
        infiniteLoop={true}
        showThumbs={false}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className='w-[480px] lg:hidden'
      >
      {renderSlides}
      </Carousel>
    </div>
  )
}

export default ImgSlider
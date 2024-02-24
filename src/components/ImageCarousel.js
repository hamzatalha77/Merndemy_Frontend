import React, { useState } from 'react'

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const hoverHandler = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="container">
      <div className="left">
        <div className="left_1">
          {images.map((image, i) => (
            <div
              className={i === activeIndex ? 'img_wrap active-img' : 'img_wrap'}
              key={i}
              onMouseOver={() => hoverHandler(i)}
            >
              <img src={image} alt="" />
            </div>
          ))}
        </div>
        <div className="left_2">
          <img src={images[activeIndex]} alt="Product" />
        </div>
      </div>
      <div className="right"></div>
    </div>
  )
}

export default ImageCarousel

import React, { useEffect, useState } from 'react'
import style from './Carousel.module.css'
//made by fr


function Carousel() {

  const images = [
    "https://i.ibb.co/LZzKHF2/porsche-zoom2-1.jpg",
    "https://i.ibb.co/HVf1n1K/pexels-hyundai-motor-group-11158760-2-1-1.jpg",
    "https://i.ibb.co/85jswKW/pexels-sourav-mishra-2710043-2.jpg",
    "https://i.ibb.co/cvdLnCv/pexels-brett-sayles-1592261-2-1.jpg",
  ]
  const [img, setImg] = useState(0)

  function next() {
    if (img < images.length - 1) setImg(img + 1)
    else setImg(0)
  }

  function back() {
    if (img > 0) setImg(img - 1)
    else setImg(images.length - 1)
  }

  useEffect(() => {
    const time = setTimeout(next, 6000)
    return () => clearTimeout(time)
  }, [img])

  return (
    <div>
      <div className={style.slideshowContainer}>

        <img key={img} src={images[img]} className={`${style.img} ${style.fade}`} />

        <a className={style.prev} onClick={back}>&#10094;</a>
        <a className={style.next} onClick={next}>&#10095;</a>
        <div className={style.dotContainer}>
          {images.length ?
            images.map((e, k) =>
              <span key={k + 1} className={img !== k ? style.dot : style.activeDot} onClick={() => setImg(k)}></span>
            )
            :
            <p>Image not found</p>
          }
        </div>
      </div>


    </div>
  )
}

export default Carousel
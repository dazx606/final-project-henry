import React, { useEffect, useState } from 'react'
import style from './Carousel.module.css'
<<<<<<< HEAD
// made by Fr
=======
//made by fr
>>>>>>> 19aeb7513ab14c0ed6823239a2a9d91e3e725d88


function Carousel() {

  const images = ["https://i.ibb.co/80ycS4G/911-I.png", "https://i.ibb.co/C15xMBD/MZD6-I.jpg", "https://i.ibb.co/6RnT5HT/M4-I.png", "https://i.ibb.co/fqjMFsf/Fusion-I.jpg"]
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
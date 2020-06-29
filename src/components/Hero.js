/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import Slider from 'react-slick'

const Hero = () => {

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }

  return (
    <section className="hero is-default is-bold">
      <div className="hero-body">
        <div className="container">

          <Slider {...settings}>
            <div className="bg-img">
              {/* <div className="hero-text">
                <h1 className="title is-3 has-text-white">
                TWORK it with us !</h1>
              </div> */}
              <img className="hero-image" alt="" src="https://pbs.twimg.com/media/EaIFFs_UcAE7Gv7.jpg" />
            </div>
            <div className="bg-img">
              {/* <div className="hero-text">
                <h1 className="title is-3 has-text-white">
                TWORK it with us !</h1>
              </div> */}
              <img className="hero-image" alt="" src="https://pbs.twimg.com/media/EaIFFtBUEAQr3rv.jpg" />
            </div>
            <div className="bg-img">
              {/* <div className="hero-text">
                <h1 className="title is-3 has-text-white">
                TWORK it with us !</h1>
              </div> */}
              <img className="hero-image" alt="" src="https://pbs.twimg.com/media/EaIFFtCU0AEGbAm.jpg" />
            </div>
            <div className="bg-img">
              {/* <div className="hero-text">
                <h1 className="title is-3 has-text-white">
                TWORK it with us !</h1>
              </div> */}
              <img className="hero-image" alt="" src="https://pbs.twimg.com/media/EaIFFtRUMAAVFep.jpg" />
            </div>
          </Slider>

        </div>
      </div>
    </section>
  )

}
export default Hero
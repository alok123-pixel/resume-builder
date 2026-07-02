import React from 'react'
import Hero from '../Components/Home/home/Hero'
import Features from '../Components/Home/home/Features'
import Testimonial from '../Components/Home/home/Testimonial'
import CallToAction from '../Components/Home/home/CallToAction'
import Footer from '../Components/Home/home/Footer'
import Banner from '../Components/Home/home/Banner'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Hero/>
      <Features/>
      <Testimonial/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home



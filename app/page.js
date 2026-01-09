
import Navbar from '@/app/components/Navbar'
import React from 'react'
import Main from './components/Main'
import Footer from './components/Footer'


export default function page() {
  return (
    <div className='overflow-x-hidden'>
    <Navbar/>
    <Main/>
    <Footer/>
    </div>
  )
}

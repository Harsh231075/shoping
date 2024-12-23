import React from 'react'
import Banner from '../Home/Banner'
import Cards from '../Home/Cards'
import Clothes from '../Home/Clothes'
import Electronic from '../Home/Electronic'
function Home() {
  return (
    <>
      <Banner></Banner>
      <div className='container m-auto '>
        <Cards></Cards>
        <Clothes></Clothes>
        <Electronic></Electronic>
      </div>
    </>
  )
}

export default Home
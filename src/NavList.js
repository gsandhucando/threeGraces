import React, { useState, useEffect } from 'react'
import gsap, { Power3 } from 'gsap'


export default function NavList({navList}) {
    const [mouseEnter, setMouseEnter] = useState(false);

    // useEffect(() => {
    //     var t5 = gsap.timeline();
    //     t5.to(".line", { opacity: 1, duration: 1, ease: Power3.easeIn });
    //   }, []);


  return (
    <>
        <li onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() =>  setMouseEnter(false)} className='liContainer'>
            {navList}
            {mouseEnter &&
             <div className='titleContainer'>
               <div className='line' style={{height: 4, background: 'white'}} />
             </div>

        }
        </li>
    </>
  )
}

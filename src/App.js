import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, useMemo, useLayoutEffect } from "react"
import { useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper, Environment } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap, Power3 } from 'gsap'
import Model from './ThreeGracesCompSecondDiv'
import NavList from './NavList'
import './App.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsapCore from 'gsap/gsap-core';

gsap.registerPlugin(ScrollTrigger)


function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function ThreeGraces() {
  const { camera, mouse } = useThree()
  const { scene } = useGLTF("threeGracesCompressed.glb")


  return <primitive color="#474747" className='model' style={{ opacity: 0 }} object={scene} position={[-33, -115, -10]} />
}


function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 1, mouse.y * 1, camera.position.z), 0.01)
  }, []
  )
}


function Dodecahedron() {
  const { viewport } = useThree()
  // viewport = canvas in 3d units (meters)

  const ref = useRef()
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width)
    const y = (mouse.y * viewport.height)
    // console.log(ref.current.position)
    ref.current.position.set(-x, -y, 30)
    // ref.current.rotation.set(-y, x, 30)
  }, [])

  const light = useRef()
  //useHelper(light, THREE.SpotLightHelper, 'cyan')

  return (
    <>
      <spotLight ref={ref} intensity={.3} position={[0, 0, 30]} angle={0.15} penumbra={1} decay={2} castShadow />
    </>
  )
}

function App() {
  useEffect(() => {
    var tl = gsap.timeline();
    var t2 = gsap.timeline();
    var t3 = gsap.timeline();
    var t4 = gsap.timeline();
    var t5 = gsap.timeline();
    var t6 = gsap.timeline();
    tl.to(".ulContainer", { opacity: 1, duration: 1, ease: Power3.easeIn });
    // t2.from(".model", { x: 500, duration: 2, ease: Power3.easeIn });
    t2.to(".model", { y: 0, opacity: 1, duration: 3, ease: Power3.easeIn });
    t3.to(".title", { opacity: 1, duration: 4, ease: Power3.easeIn });
    t4.to(".loreTitle", { opacity: 1, duration: 4, ease: Power3.easeIn });
    t5.to(".lore", { opacity: 1, duration: 4, ease: Power3.easeIn });
    t6.to(".graceContiner", { opacity: 1, duration: 4, ease: Power3.easeIn });
  }, []);

  let navList = ['ART', 'ABOUT', 'VISIT', 'SHOP', 'SEARCH']

  function AnimationWrapper({ children }) {
    const ref = useRef()
    const { camera } = useThree()
    useLayoutEffect(() => {
      ref.current.rotation.set(0, 0, 0)
      camera.position.set(2, -20, 5)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.section-three',
            start: '180px 90%',
            // endTrigger: '.section-five',
            // end: 'bottom bottom',
            end: '+=300',
            scrub: 1,
            // snap: {
            //   snapTo: "section", // snap to the closest label in the timeline
            //   duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
            //   ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
            // },
            // markers: true
          }
        })
        .to(ref.current.rotation, { y: -1 })
        .to(camera.position, { x: 14, y: 0 }, 'simultaneously')


        .to(ref.current.rotation, { y: 0 }, 'simultaneously')
        .to(camera.position, { x: -10, z: -5 }, 'simultaneously')

        .to(ref.current.rotation, { y: .5 }, 'simultaneously')
        .to(camera.position, { x: -2, z: -1 })

    }, [])
    return <group ref={ref}>{children}</group>
  }


  return (
    <div className="App">
      <div className='header'>
        <ul className='ulContainer'>
          {
            navList.map((item, i) => {
              return <NavList navList={item} />
            })
          }

        </ul>
      </div>
      <div className="canvasContainer">
        <Canvas className='model' flat style={{ height: '100vh', background: 'black' }} camera={{ fov: 65, position: [0, 0, 10] }} pixelRatio={window.devicePixelRatio} dpr={[1, 2]}>
          <fog attach="fog" args={['#deaa83', 19, 155]} />
          <directionalLight position={[0, 0, -100]} intensity={.6} />
          <Suspense fallback={<Loader />}>
            <ThreeGraces />
          </Suspense>
          <Dodecahedron />
          <Rig />
        </Canvas>
      </div>
      <div className='contentSection' style={{ height: '50vh' }}>
        <h1 className='loreTitle'>The Lore</h1>
        <p className='lore'>
          the group of minor goddesses—part of Aphrodite’s retinue—consists of <br />
          Euphrosyne (joy), Thalia (bloom), and Aglaia (elegance or brightness).  <br />
          Together, they personify grace, beauty, and charm.
        </p>
        <div className='graceContiner'>
          <h1 style={{ margin: "0 10px" }}>Aglaea (left)</h1>
          <h1 style={{ margin: "0 10px" }}>Thalia (middle)</h1>
          <h1 style={{ margin: "0 10px" }}>Euphre (right)</h1>
        </div>
      </div>

      <div className='secondSection' style={{ position: 'relative' }}>
        <Canvas className='model' style={{ width: '100vw', height: '104vh', zIndex: 50, position: 'absolute', background: 'black' }}>
          <fog attach="fog" args={['purple', 1, 155]} />
          <Suspense fallback={<Loader />}>
            <AnimationWrapper>
              <Model />
            </AnimationWrapper>
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.15} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.45} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.5} penumbra={1} decay={2} castShadow />
          </Suspense>
        </Canvas>
        <section className="section-one" >
        </section>
        <section className="section-two">
        </section>
        <section className="section-three">
        </section>
        <section className="section-four" ></section>
        {/* <section className="section-five" > asdsadasdad</section> */}
        <div className='footer'>
          <p className='credit'>Recreated design from Tom Bogner and model from Geoffrey Marchal</p>
        </div>
      </div>


      <div className='title'>
        <h2 style={{ margin: 0 }}>The</h2>
        <h1>Three Graces</h1>
      </div>
    </div>
  )
}

export default App;
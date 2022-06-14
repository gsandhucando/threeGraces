import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, useMemo, useLayoutEffect } from "react"
import { useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper, Environment } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap, Power3 } from 'gsap'
import Model from './ThreeGracesCompSecondDiv'
import NavList from './NavList'
import './App.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

function LightSection2() {
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
  useHelper(light, THREE.SpotLightHelper, 'cyan')

  return (
    <>
      <spotLight ref={ref} color="#4a2dd2" intensity={.1} position={[110, 0, 130]} penumbra={.6} decay={2} castShadow />
      {/* <spotLight ref={light} intensity={100000} position={[0, -10, -100]} penumbra={10} decay={2} /> */}
      {/* <spotLight intensity={100} position={[0, -70, -4000]}  angle={10} penumbra={.6} castShadow /> */}
    </>
  )
}


function App() {
  useEffect(() => {
    var tl = gsap.timeline();
    var t2 = gsap.timeline();
    var t3 = gsap.timeline();
    tl.to(".ulContainer", { opacity: 1, duration: 1, ease: Power3.easeIn });
    // t2.from(".model", { x: 500, duration: 2, ease: Power3.easeIn });
    t2.to(".model", { y: 0, opacity: 1, duration: 3, ease: Power3.easeIn });
    t3.to(".title", { opacity: 1, duration: 4, ease: Power3.easeIn });
  }, []);

  let navList = ['ART', 'ABOUT', 'VISIT', 'SHOP', 'SEARCH']

  const [clickedA, setClickedA] = useState(false)
  const [clickedT, setClickedT] = useState(false)
  const [clickedE, setClickedE] = useState(false)
  const [zoom, setZoom] = useState(false)


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TRYING TO FIGURE OUT ON CLICK CAMERA POSITIONING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  function AnimationWrapper({ children }) {
    const ref = useRef()
    const { camera } = useThree()
    useLayoutEffect(() => {
      ref.current.rotation.set(0, 0, 0)
      camera.position.set(2, 0, 5)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.section-one',
            start: 'center center',
            endTrigger: '.section-five',
            end: 'bottom bottom',
            scrub: 1,
            // snap: {
            //   snapTo: "section", // snap to the closest label in the timeline
            //   duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
            //   ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
            // },
            markers: true
          }
        })
        .to(ref.current.rotation, { y: -1 })


        .to(ref.current.rotation, { y: 0 }, 'simultaneously')
        .to(camera.position, {x: -10,z: -5 }, 'simultaneously')


        .to(ref.current.rotation, { y: .5 })
        .to(camera.position, {x: -2, z:-1 })
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
      <div className='contentSection' style={{height: '50vh'}}>

      </div>

      <div className='secondSection' style={{position: 'relative'}}>
        <Canvas style={{ width: '100vw', height: '100vh', zIndex: 50, position: 'absolute'}}>
          {/* <fog attach="fog" args={['#black', 19,155]} /> */}
          <Suspense fallback={<Loader />}>
            {/* <ScrollControls pages={3}> */}
            {/* <Scroll/> */}
            {/* <Marker /> */}
            <AnimationWrapper>
              <Model />
            </AnimationWrapper>
            {/* <Camera /> */}
            {/* </ScrollControls> */}
            <Environment preset="sunset" background />
            {/* <OrbitControls enableZoom={false} enableRotate={false} /> */}
            {/* enablePan={false} for orbit control when finished */}
            {/* <hemisphereLight intensity={.01}  /> */}
          </Suspense>
          <LightSection2 />


        </Canvas>
        <section className="section-one" > asdsadasdad</section>
        <section className="section-two" > asdsadasdad</section>
        <section className="section-three" > asdsadasdad</section>
        <section className="section-four" > asdsadasdad</section>
        <section className="section-five" > asdsadasdad</section>
        {/* <section className="section-two" />
        <section className="section-three" /> */}
      </div>


      <div className='title'>
        <h2 style={{ margin: 0 }}>The</h2>
        <h1>Three Graces</h1>
      </div>
    </div>
  )
}

export default App;

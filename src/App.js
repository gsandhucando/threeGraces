import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { ScrollControls, useScroll, Environment, useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap, { Power3 } from 'gsap'
import Model from './ThreeGracesCompSecondDiv'
import NavList from './NavList'
import './App.css';

import ScrollTrigger from "gsap/ScrollTrigger";
import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

// ES6:
// import * as dat from 'dat.gui';

// const gui = new dat.GUI();


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
      <spotLight ref={ref} intensity={.1} position={[0, 0, 30]}  penumbra={.6} decay={2} castShadow />
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
  function Marker() {
    useFrame((state, delta) => {
      const dummy = new THREE.Vector3()
      const lookAtPos = new THREE.Vector3()
      const step = 0.01
      // state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
      // 12.79, y: 0.11, z: 12.78
      state.camera.position.lerp(dummy.set(clickedA ? 12.79 : 10, clickedA ? 0.11 : 0, clickedA ? 12.78 : 10), step)

      lookAtPos.x = Math.sin(state.clock.getElapsedTime())

      state.camera.lookAt(lookAtPos)
      state.camera.updateProjectionMatrix()
    })
    useFrame((state, delta) => {
      const dummy1 = new THREE.Vector3()
      const lookAtPos1 = new THREE.Vector3()
      const step = 0.01
      // state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
      // 0.17,0.11,0.24
      state.camera.position.lerp(dummy1.set(clickedT ? -11.7 : 10, clickedT ? 0.11 : 0, clickedT ? -2 : 10), step)

      lookAtPos1.x = Math.sin(state.clock.getElapsedTime())

      state.camera.lookAt(lookAtPos1)
      state.camera.updateProjectionMatrix()
    })
    useFrame((state, delta) => {
      const dummy2 = new THREE.Vector3()
      const lookAtPos2 = new THREE.Vector3()
      const step = 0.01
      // state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
      // 0.17,0.11,0.24
      state.camera.position.lerp(dummy2.set(clickedE ? -21.7 : 10, clickedE ? 0.11 : 0, clickedE ? -2 : 10), step)

      lookAtPos2.x = Math.sin(state.clock.getElapsedTime())

      state.camera.lookAt(lookAtPos2)
      state.camera.updateProjectionMatrix()
    })
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
        <Canvas className='model' flat style={{ height: '100vh', background: 'black' }} camera={{ fov: 65, position: [0, 0, 10] }} pixelRatio={window.devicePixelRatio}>
          <directionalLight position={[0, 0, -100]} intensity={.6} />
          <Suspense fallback={<Loader />}>
            <ThreeGraces />
          </Suspense>
          <Dodecahedron />
          {/* <Zoom /> */}
          {/* <fog attach="fog" args={['white', 0, 0]} /> */}
          <Rig />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>

      <div className='secondSection'>
        <Canvas className='model' frameloop="demand" style={{ height: '100vh', background: 'black' }} camera={{ fov: 55, position: [10, 10, 10] }} pixelRatio={window.devicePixelRatio}>
          <Suspense fallback={<Loader />}>
            {/* <ScrollControls pages={3}> */}
            {/* <Scroll/> */}
            <Marker />
            <Model />
            {/* </ScrollControls> */}
            {/* <Environment preset="sunset" background /> */}
            <OrbitControls enableZoom={false} enableRotate={false} />
            <hemisphereLight intensity={.01}  />
          </Suspense>
          <LightSection2 />


        </Canvas>
        <div>
        </div>
      </div>
      <div className='content'>
        <h1 onClick={(e) => {
          setClickedA(!clickedA)
          setClickedT(false)
          setClickedE(false)
          }}>Aglaea</h1>
        <h1 onClick={(e) => {
          setClickedA(false)
          setClickedE(false)
          setClickedT(!clickedT)}}>Thalia</h1>
        <h1 onClick={(e) => {
          setClickedT(false)
          setClickedA(false)
          setClickedE(!clickedE)}}>Euphre</h1>
      </div>

      <div className='title'>
        <h2 style={{ margin: 0 }}>The</h2>
        <h1>Three Graces</h1>
      </div>
    </div>
  )
}

export default App;

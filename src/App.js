import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Environment, useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap, { Power4 } from 'gsap'
import Model from './Model'
import './App.css';

// ES6:
// import * as dat from 'dat.gui';

// const gui = new dat.GUI();

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function ThreeGraces() {
  const { scene } = useGLTF("threeGraces.glb")
  console.log(scene)

  return <primitive roughness={0.9} metalness={0.5} color="#474747" className='model' style={{ opacity: 0 }} object={scene} position={[-33, -115, -10]} />
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
  useHelper(light, THREE.SpotLightHelper, 'cyan')

  return (
    <>
      <spotLight ref={ref} intensity={0.1} position={[0, 0, 30]} angle={0.15} penumbra={.6} decay={2} castShadow />
      <spotLight ref={light} intensity={1} position={[0, -10, -100]} penumbra={10} decay={2} />
      {/* <spotLight intensity={100} position={[0, -70, -4000]}  angle={10} penumbra={.6} castShadow /> */}
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
      <spotLight ref={ref} intensity={0.1} position={[0, 0, 30]} angle={0.15} penumbra={.6} decay={2} castShadow />
      {/* <spotLight ref={light} intensity={100000} position={[0, -10, -100]} penumbra={10} decay={2} /> */}
      {/* <spotLight intensity={100} position={[0, -70, -4000]}  angle={10} penumbra={.6} castShadow /> */}
    </>
  )
}
function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp({ x: 0, y: 0, z: 12 }, 0.005)
    state.camera.lookAt(0, 0, 0)
  })
}

function App() {

  useEffect(() => {
    var tl = gsap.timeline();
    var t2 = gsap.timeline();
    tl.to(".ulContainer", { opacity: 1, duration: 1, ease: Power4.easeIn });
    t2.to(".model", { opacity: 1, duration: .3, ease: Power4.easeIn });
  }, []);

  return (
    <div className="App">
      <div className='header'>
        <ul className='ulContainer'>
          <li className='liContainer'>
            ART
          </li>
          <li className='liContainer'>
            ABOUT
          </li>
          <li className='liContainer'>
            VISIT
          </li>
          <li className='liContainer'>
            SHOP
          </li>
          <li className='liContainer'>
            SEARCH
          </li>
        </ul>
      </div>
      <div className="canvasContainer">
        <Canvas className='model' style={{ height: '100vh', background: 'black' }} camera={{fov: 55, position: [0, 0, 10] }} pixelRatio={window.devicePixelRatio}>
          <directionalLight position={[0, 0, -100]} intensity={.6} />
          {/* <directionalLight position={[0, -20, -600]} intensity={10} /> */}
          <Suspense fallback={<Loader />}>
            <ThreeGraces />
            {/* <Model position={[0, -6, 0]} rotation={[0, -0.2, 0]} /> */}
            {/* <Environment preset="sunset" background /> */}
          </Suspense>
          <Dodecahedron />
          {/* <Zoom /> */}
          {/* <fog attach="fog" args={['white', 0, 0]} /> */}
          <Rig />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      {/*
      <div>
      <Canvas className='model' style={{ height: '100vh', background: 'black' }} camera={{fov: 55, position: [0, 0, 10] }} pixelRatio={window.devicePixelRatio}>
          <Suspense fallback={<Loader />}>
            <ThreeGraces />
          </Suspense>
          <LightSection2 />
          <Rig />

        </Canvas>
      </div>
    */}
    </div>
  )
}

export default App;

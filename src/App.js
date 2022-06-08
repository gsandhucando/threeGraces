import * as THREE from 'three';
import React, { Suspense, useRef, useEffect } from "react"
import { Environment, useGLTF, Html, useProgress, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from '@react-three/fiber'
import gsap, {Power4} from 'gsap'
import './App.css';

// ES6:
import * as dat from 'dat.gui';

const gui = new dat.GUI();

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function ThreeGraces() {
  const { scene } = useGLTF("scene.gltf")
  // useEffect(() => {            
  //   var t2 = gsap.timeline();
  //   t2.to(".model", {opacity: 1, duration: 13, ease: Power4.easeIn});
  // }, []);
  return <primitive className='model' style={{opacity: 0}} object={scene} position={[-35, -100, -30]} />
}


function App() {

  useEffect(() => {            
    var tl = gsap.timeline();
    var t2 = gsap.timeline();
    tl.to(".ulContainer", {opacity: 1, duration: 1, ease: Power4.easeIn});
    t2.to(".model", {opacity: 1, duration: .3, ease: Power4.easeIn});
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
        <Canvas className='model' style={{ height: '100vh', background: 'black' }} camera={{ position: [0, 0, 10] }}>
        {/* <pointLight position={[0, 0, -10]} intensity={.07} /> */}
        {/* <ambientLight position={[0, 0, 1000]} intensity={.02} /> */}
        <directionalLight position={[-100, 0, -100]} intensity={.07} />
          <Suspense fallback={<Loader />}>
            <ThreeGraces />
            {/* <Environment preset="sunset" background /> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default App;

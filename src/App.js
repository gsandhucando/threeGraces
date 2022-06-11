import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Environment, useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap, { Power3 } from 'gsap'
import Model from './ThreeGracesCompSecondDiv'
import NavList from './NavList'
import './App.css';

// ES6:
// import * as dat from 'dat.gui';

// const gui = new dat.GUI();

function Zoom() {
  useFrame((state) => {
    console.log(state, 'zoom')
    state.camera.position.lerp({ x: 0, y: 0, z: 12 }, 0.005)
    state.camera.lookAt(0, 0, 0)
  }, [])
}


function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function ThreeGraces() {
    const { camera, mouse } = useThree()
  const { scene } = useGLTF("threeGracesCompressed.glb")
  console.log(camera, mouse)
  const vec = new THREE.Vector3()
  // useFrame(() => {
  //   camera.position.lerp(vec.set(mouse.x * 1, mouse.y * 1, camera.position.z), 0.01)
  // }, []
  // )

  return <primitive onClick={(e) => Zoom} color="#474747" className='model' style={{ opacity: 0 }} object={scene} position={[-33, -115, -10]} />
}
function ThreeGracesSecondDiv() {
    const { camera, mouse } = useThree()
  const { scene } = useGLTF("threeGracesCompSecondDiv.glb")
  console.log(camera, mouse)
  // const vec = new THREE.Vector3()
  // useFrame(() => {
  //   camera.position.lerp(vec.set(mouse.x * 1, mouse.y * 1, camera.position.z), 0.01)
  // }, []
  // )

  return <primitive onClick={(e) => Zoom} color="#474747" className='model' style={{ opacity: 0 }} object={scene} position={[-33, -115, -10]} />
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
      <spotLight ref={ref} intensity={0.3} position={[0, 0, 30]} angle={0.15} penumbra={.6} decay={2} castShadow />
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
  let [click, setClick] = useState(false)

  // function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  //   const ref = useRef()
  //   const clicked = useRef()
  //   const [, params] = useRoute('/item/:id')
  //   const [, setLocation] = useLocation()
  //   useEffect(() => {
  //     clicked.current = ref.current.getObjectByName(params?.id)
  //     if (clicked.current) {
  //       clicked.current.parent.updateWorldMatrix(true, true)
  //       clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
  //       clicked.current.parent.getWorldQuaternion(q)
  //     } else {
  //       p.set(0, 0, 5.5)
  //       q.identity()
  //     }
  //   })
  //   useFrame((state, dt) => {
  //     state.camera.position.lerp(p, 0.025)
  //     state.camera.quaternion.slerp(q, 0.025)
  //   })
  //   return (
  //     <group
  //       ref={ref}
  //       onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
  //       onPointerMissed={() => setLocation('/')}>
  //       {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
  //     </group>
  //   )
  // }

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
        <Canvas className='model' flat style={{ height: '100vh', background: 'black' }} camera={{fov: 65, position: [0, 0, 10] }} pixelRatio={window.devicePixelRatio}>
          <directionalLight position={[0, 0, -100]} intensity={.6} />
          <Suspense fallback={<Loader />}>
            <ThreeGraces />
            {/* <Environment preset="sunset" background /> */}
          </Suspense>
          <Dodecahedron />
          {/* <Zoom /> */}
          {/* <fog attach="fog" args={['white', 0, 0]} /> */}
          <Rig />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      
      <div className='secondSection'>
      <Canvas className='model' frameloop="demand" style={{ height: '100vh', background: 'black' }} camera={{fov: 55, position: [10, 10, 10] }} pixelRatio={window.devicePixelRatio}>
          <Suspense fallback={<Loader />}>
            {/* <ThreeGracesSecondDiv /> */}
            <Model />
                        <Environment preset="sunset" background />
          </Suspense>
          <LightSection2 />
          {/* <Rig /> */}
          {/* <Test /> */}

        </Canvas>
          <p className='aglaea' onClick={() => setClick(!click)}>lkdjalkdajkda</p>
        <div>
        </div>
      </div>
   
        <div className='title'>
        <h2 style={{margin: 0}}>The</h2>
        <h1>Three Graces</h1>
      </div>
    </div>
  )
}

export default App;

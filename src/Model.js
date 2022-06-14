import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import lerp from 'lerp'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/scene.gltf')
  useFrame(({ pointer }) => (group.current.rotation.y = lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))
  return (
    <group ref={group} {...props}>
        {/* {console.log(nodes, 'nodes')} */}
      <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry}  dispose={null}>
        {/* <meshStandardMaterial roughness={0.9} metalness={0.5} color="#474747" /> */}
      </mesh>
      {/* <Lights /> */}
    </group>
  )
}

function Lights() {
  const groupL = useRef()
  const groupR = useRef()
  const front = useRef()
  useFrame(({ pointer }) => {
    groupL.current.rotation.y = lerp(groupL.current.rotation.y, -pointer.x * (Math.PI / 2), 0.1)
    groupR.current.rotation.y = lerp(groupR.current.rotation.y, pointer.x * (Math.PI / 2), 0.1)
    front.current.position.x = lerp(front.current.position.x, pointer.x * 12, 0.05)
    front.current.position.y = lerp(front.current.position.y, 7 + pointer.y * 4, 0.05)
  })
  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight castShadow ref={front} penumbra={0.75} angle={Math.PI / 4} position={[0, 0, 8]} distance={10} intensity={15} shadow-mapSize={[2048, 2048]} />
    </>
  )
}

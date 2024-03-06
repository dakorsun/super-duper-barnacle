import React, { useRef } from 'react';
import * as THREE from 'three';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';

function Box() {
  const position: [number, number, number] = [0, 2, 0];
  const [ref, api] = useBox(() => ({ mass: 1, position }), useRef<THREE.Mesh>(null));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={position}
    >
      <boxGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane() {
  const rotation: [number, number, number] = [-Math.PI / 2, 0, 0];
  const [ref] = usePlane(
    () => ({
      rotation,
    }),
    useRef<THREE.Mesh>(null),
  );
  return (
    <mesh ref={ref} rotation={rotation}>
      <planeGeometry attach="geometry" args={[50, 50]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 100 }}>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <directionalLight color="white" position={[10, 15, 10]} />
      <Physics>
        <Box />
        <Plane />
      </Physics>
    </Canvas>
  );
}

export default App;

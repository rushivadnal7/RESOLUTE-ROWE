import React, { useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

// Directly use the relative path to your model in the public folder
const logoModel = "/gltfs/Logo.glb";

// This is the model component where the rotation will be applied
const LogoModel = () => {
  const meshRef = useRef();

  // Load the 3D model using the GLTFLoader
  const { scene } = useLoader(GLTFLoader, logoModel);

  // Apply rotation in every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 // Adjust rotation speed
    }
  });

  return scene ? (
    <primitive
      object={scene}
      ref={meshRef}
      scale={70} // Adjust the scale to ensure visibility
      position={[0, 0, 0]}
    />
  ) : null;
};

// The main component rendering the canvas and controls
const Logo3D = () => {
  return (
    <Canvas style={{ height: "5.5rem", width: "max-content" }}>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[0, -5, 0]} // Light from below (Y axis negative)
        intensity={2} // Adjust light intensity as needed
        // color={"#ffffff"} // Optionally customize light color
      />
      <LogoModel />
      {/* Render the model inside the Canvas */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
};

export default Logo3D;

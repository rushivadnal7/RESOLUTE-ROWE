import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

const logoModel = "/gltfs/Logo.glb";

const LogoModel = () => {
  const meshRef = useRef();
  const { scene } = useGLTF(logoModel);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true; // Enable shadow casting
          child.receiveShadow = true;
        }
      });
      meshRef.current = scene;
    }
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Adjust rotation speed
    }
  });

  return scene ? (
    <primitive object={scene} ref={meshRef} scale={70} position={[0, 0, 0]} />
  ) : null;
};

const Logo3D = () => {
  return (
    <Canvas
      shadows
      style={{ height: "5.5rem", width: "max-content" }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[2, 4, 5]}
        intensity={2}
        castShadow
      />
      
      <LogoModel />

      {/* Shadow Catcher */}
      <ContactShadows 
        position={[0, -0.5, 0]} 
        opacity={0.9} 
        blur={5} 
        width={20} 
        height={20} 
        far={10} 
      />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
};

export default Logo3D;

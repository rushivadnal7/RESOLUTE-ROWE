import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const LogoModel = ({ mouse }) => {
  const modelRef = useRef();
  const { scene } = useGLTF("/gltfs/Logo.glb");

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = (mouse.x * Math.PI) / 2;
      modelRef.current.rotation.x = (mouse.y * Math.PI) / 5;
    }
  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={40}
      position={[0, 0.3, 0]}
    />
  );
};

const PlayfullLogo = () => {
  const mouse = { x: 0, y: 0 };

  const handleMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <>

      <div
        onMouseMove={handleMouseMove}
        className="playfull-page"
        style={{ width: "100vw", height: "100vh", cursor: "pointer", display: 'flex' }}
      >
        <div className="canvas-container">
          <div className="blob-outer-container">
            <div className="blob-inner-container">
              <div className="blob"></div>
            </div>
          </div>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} />

            <spotLight
              position={[0, -2, 0]}
              angle={Math.PI / 4}
              penumbra={1}
              intensity={2}
              castShadow
            />
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0.3, -1, 0]}
              receiveShadow
            >
              <meshStandardMaterial color="black" transparent={true} opacity={0.1} />
            </mesh>

            <LogoModel mouse={mouse} />

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <div className="info-container">
          <h1 className="title">What Resolute & Rowe represent</h1>
          <p>Resolute & Rowe is a premier clothing brand that embraces and celebrates the virtues of classic masculinity/feminity , timeless stoicism, and the strength that comes from within. We offer a refined collection of attire that draws inspiration from historical ideals, combining modern craftsmanship with old-school sensibilities.

          </p>
        </div>
      </div>
    </>

  );
};

export default PlayfullLogo;

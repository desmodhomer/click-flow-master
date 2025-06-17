
import React, { Suspense, useState } from "react";
import { PerspectiveCamera, useDepthBuffer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RubiksCubeModel } from "./RubiksCubeModel";
import { CameraController } from "./CameraController";
import { EnhancedSpotlight } from "./EnhancedSpotlight";

export function SceneContent() {
  const depthBuffer = useDepthBuffer({ 
    size: 2048,
    frames: 1
  });
  
  const [time, setTime] = useState(0);
  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });
  
  return (
    <>
      <EnhancedSpotlight 
        depthBuffer={depthBuffer} 
        color="#aaaace" 
        position={[3, 3, 2]}
        volumetric={true}
        opacity={1}
        penumbra={1}
        distance={17}
        angle={0.8}
        attenuation={30}
        anglePower={6}
        intensity={1}
        shadowMapSize={2048}
        shadowBias={-0.0001}
        shadowAutoUpdate={true}
        castShadow={true}
      />
      
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 7]}
        near={0.1}
        far={1000}
      />

      <CameraController />

      <Suspense fallback={null}>
        <RubiksCubeModel position={[0, 0, 0]} scale={1} />
      </Suspense>
    </>
  );
}

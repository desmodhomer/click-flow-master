
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

export function EnhancedSpotlight() {
  const light = useRef<THREE.SpotLight>(null);
  
  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(0, 0, 0);
      light.current.target.updateMatrixWorld();
    }
  }, []);
  
  return (
    <>
      <spotLight 
        ref={light}
        position={[10, 10, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        castShadow
      />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[5, -5, -5]} intensity={0.6} color="#ffffff" />
    </>
  );
}

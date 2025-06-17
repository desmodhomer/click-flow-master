
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

export function EnhancedSpotlight() {
  const mainLight = useRef<THREE.SpotLight>(null);
  const lampLight = useRef<THREE.SpotLight>(null);
  
  useEffect(() => {
    if (mainLight.current) {
      mainLight.current.target.position.set(0, 0, 0);
      mainLight.current.target.updateMatrixWorld();
    }
    
    if (lampLight.current) {
      lampLight.current.target.position.set(0, 0, 0);
      lampLight.current.target.updateMatrixWorld();
    }
  }, []);
  
  return (
    <>
      {/* Luce principale tipo lampione dall'alto */}
      <spotLight 
        ref={lampLight}
        position={[0, 8, 0]}
        angle={0.6}
        penumbra={0.8}
        intensity={3}
        castShadow
        color="#ffffff"
        distance={15}
        decay={2}
      />
      
      {/* Luce secondaria per dettagli */}
      <spotLight 
        ref={mainLight}
        position={[10, 10, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        color="#f0f0f0"
      />
      
      {/* Luci di riempimento */}
      <pointLight position={[-5, 5, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#ffffff" />
    </>
  );
}

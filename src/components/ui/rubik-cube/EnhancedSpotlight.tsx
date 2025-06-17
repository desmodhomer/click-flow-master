
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

export function EnhancedSpotlight(props: any) {
  const light = useRef<THREE.SpotLight>(null);
  
  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(0, 0, 0);
      light.current.target.updateMatrixWorld();
    }
  }, []);
  
  return (
    <spotLight 
      ref={light}
      position={[10, 10, 5]}
      angle={0.3}
      penumbra={1}
      intensity={1}
      castShadow
      {...props}
    />
  );
}

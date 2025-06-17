
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneContent } from './rubik-cube/SceneContent';

const RubiksCube = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export { RubiksCube };

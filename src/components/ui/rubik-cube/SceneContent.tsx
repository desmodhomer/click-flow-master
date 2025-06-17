
import React, { Suspense } from 'react';
import { RubiksCubeModel } from './RubiksCubeModel';
import { CameraController } from './CameraController';
import { EnhancedSpotlight } from './EnhancedSpotlight';

export function SceneContent() {
  return (
    <Suspense fallback={null}>
      <CameraController />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <EnhancedSpotlight />
      <RubiksCubeModel />
    </Suspense>
  );
}

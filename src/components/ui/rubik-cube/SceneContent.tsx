
import React, { Suspense } from 'react';
import { RubiksCubeModel } from './RubiksCubeModel';
import { CameraController } from './CameraController';
import { EnhancedSpotlight } from './EnhancedSpotlight';

export function SceneContent() {
  return (
    <Suspense fallback={null}>
      <CameraController />
      <ambientLight intensity={0.5} />
      <EnhancedSpotlight />
      <RubiksCubeModel />
    </Suspense>
  );
}

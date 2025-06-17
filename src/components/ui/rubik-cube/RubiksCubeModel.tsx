import React, { useRef, useState, useEffect, forwardRef, useCallback } from "react";
import * as THREE from 'three';
import { RubiksCubeModelProps, RubiksCubeRef, CubeData } from "./types";
import { IndividualCube } from "./IndividualCube";
import { initializeCubes } from "./cubeUtils";
import { useAnimationController } from "./AnimationController";
import { useCubeMovementLogic } from "./CubeMovementLogic";
import { useViewportManager } from "./ViewportManager";

export const RubiksCubeModel = forwardRef<RubiksCubeRef, RubiksCubeModelProps>((props, ref) => {
  const GAP = 0.02;
  const RADIUS = 0.1;
  
  const mainGroupRef = useRef<THREE.Group>(null);
  const lastMoveAxisRef = useRef<string | null>(null);
  const isMountedRef = useRef(true);
  
  const [size, setSize] = useState(1.0);
  const [cubes, setCubes] = useState<CubeData[]>([]);

  const resetCube = useCallback(() => {
    if (!isMountedRef.current) return;
    
    setCubes(initializeCubes());
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.set(0, 0, 0);
    }
    lastMoveAxisRef.current = null;
  }, []);

  const { isVisible, deviceSettings, isResizingRef } = useViewportManager({
    isMountedRef,
    resetCube
  });

  const { isAnimatingRef, setCurrentMove, resetAnimation, animationFrameRef } = useAnimationController({
    isVisible,
    isResizingRef,
    isMountedRef,
    mainGroupRef,
    cubes,
    setCubes,
    resetCube
  });

  useCubeMovementLogic({
    isVisible,
    isMountedRef,
    isResizingRef,
    isAnimatingRef,
    lastMoveAxisRef,
    setCurrentMove
  });

  React.useImperativeHandle(ref, () => ({
    reset: resetCube
  }));

  useEffect(() => {
    setCubes(initializeCubes());
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  const handleReset = useCallback(() => {
    resetCube();
    resetAnimation();
  }, [resetCube, resetAnimation]);

  React.useImperativeHandle(ref, () => ({
    reset: handleReset
  }));

  return (
    <group ref={mainGroupRef}>
      {cubes.map((cube) => (
        <IndividualCube
          key={cube.id}
          cube={cube}
          size={size}
          gap={GAP}
          radius={RADIUS}
          deviceSettings={deviceSettings}
        />
      ))}
    </group>
  );
});

RubiksCubeModel.displayName = "RubiksCubeModel";

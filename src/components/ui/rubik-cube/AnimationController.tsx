
import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { Move, CubeData } from "./types";
import { 
  isInLayer, 
  normalizePositions, 
  checkCubeIntegrity, 
  createRotationMatrix, 
  easeInOutQuad, 
  updateCubes 
} from "./cubeUtils";

interface AnimationControllerProps {
  isVisible: boolean;
  isResizingRef: React.MutableRefObject<boolean>;
  isMountedRef: React.MutableRefObject<boolean>;
  mainGroupRef: React.RefObject<THREE.Group>;
  cubes: CubeData[];
  setCubes: React.Dispatch<React.SetStateAction<CubeData[]>>;
  resetCube: () => void;
}

export const useAnimationController = ({
  isVisible,
  isResizingRef,
  isMountedRef,
  mainGroupRef,
  cubes,
  setCubes,
  resetCube
}: AnimationControllerProps) => {
  const ANIMATION_DURATION = 1.2;
  
  const isAnimatingRef = useRef(false);
  const currentRotationRef = useRef(0);
  const currentMoveRef = useRef<Move | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const setCurrentMove = useCallback((move: Move | null) => {
    currentMoveRef.current = move;
    if (move) {
      isAnimatingRef.current = true;
      currentRotationRef.current = 0;
    }
  }, []);

  const resetAnimation = useCallback(() => {
    isAnimatingRef.current = false;
    currentRotationRef.current = 0;
    currentMoveRef.current = null;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useFrame((state, delta) => {
    if (!isVisible || !isMountedRef.current) return;

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.x += delta * 0.3;
      mainGroupRef.current.rotation.y += delta * 0.5;
      mainGroupRef.current.rotation.z += delta * 0.2;
    }

    if (isResizingRef.current && isAnimatingRef.current) {
      resetCube();
      return;
    }

    if (isAnimatingRef.current && currentMoveRef.current) {
      const move = currentMoveRef.current;
      const targetRotation = move.rotationAngle!;
      const rotation = delta / ANIMATION_DURATION;

      if (currentRotationRef.current < 1) {
        const newRotation = Math.min(currentRotationRef.current + rotation, 1);
        const prevRotation = currentRotationRef.current;
        currentRotationRef.current = newRotation;

        const easedProgress = easeInOutQuad(newRotation);
        const prevEasedProgress = easeInOutQuad(prevRotation);
        const currentAngle = easedProgress * targetRotation;
        const prevAngle = prevEasedProgress * targetRotation;
        const stepRotation = currentAngle - prevAngle;

        const stepRotationMatrix = createRotationMatrix(
          move.axis,
          stepRotation * move.direction
        );

        if (isMountedRef.current && !isResizingRef.current) {
          setCubes((prevCubes) => {
            const updatedCubes = updateCubes(prevCubes, move, stepRotationMatrix, isInLayer);
            
            if (newRotation >= 1) {
              const normalizedCubes = normalizePositions(updatedCubes);
              
              if (!checkCubeIntegrity(normalizedCubes)) {
                console.warn("Found a cube out of bounds");
                if (isMountedRef.current) {
                  setTimeout(() => resetCube(), 0);
                }
              }
              
              isAnimatingRef.current = false;
              currentRotationRef.current = 0;
              currentMoveRef.current = null;
              
              return normalizedCubes;
            }
            
            return updatedCubes;
          });
        }
      }
    }
  });

  return {
    isAnimatingRef,
    setCurrentMove,
    resetAnimation,
    animationFrameRef
  };
};

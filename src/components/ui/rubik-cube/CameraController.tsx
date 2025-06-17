
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";

export function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    if (camera) {
      camera.position.set(5, 5, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);
  
  useFrame(() => {
    if (camera) {
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
}

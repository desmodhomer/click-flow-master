
import { Vector3, Matrix4 } from "three";
import * as THREE from 'three';

// Extend Three.js JSX elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshPhysicalMaterial: any;
    }
  }
}

export interface RubiksCubeModelProps {
  position?: [number, number, number];
  scale?: number;
}

export interface CubeData {
  position: Vector3;
  rotationMatrix: Matrix4;
  id: string;
  originalCoords: { x: number; y: number; z: number };
}

export interface Move {
  axis: string;
  layer: number;
  direction: number;
  rotationAngle?: number;
}

export interface RubiksCubeRef {
  reset: () => void;
}

export interface DeviceSettings {
  smoothness: number;
  castShadow: boolean;
  receiveShadow: boolean;
}

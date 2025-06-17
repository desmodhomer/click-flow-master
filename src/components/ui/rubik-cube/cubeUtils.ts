
import { Vector3, Matrix4, Quaternion } from "three";
import { CubeData, Move } from "./types";

export const initializeCubes = (): CubeData[] => {
  const initial: CubeData[] = [];
  const positions = [-1, 0, 1];
  
  for (let x of positions) {
    for (let y of positions) {
      for (let z of positions) {
        initial.push({
          position: new Vector3(x, y, z),
          rotationMatrix: new Matrix4().identity(),
          id: `cube-${x}-${y}-${z}`,
          originalCoords: { x, y, z }
        });
      }
    }
  }
  return initial;
};

export const isInLayer = (position: Vector3, axis: string, layer: number): boolean => {
  const coord = axis === "x" ? position.x : axis === "y" ? position.y : position.z;
  return Math.abs(coord - layer) < 0.1;
};

export const normalizePositions = (cubes: CubeData[]): CubeData[] => {
  return cubes.map(cube => {
    const x = Math.round(cube.position.x);
    const y = Math.round(cube.position.y);
    const z = Math.round(cube.position.z);
    
    const newPosition = 
      (Math.abs(cube.position.x - x) > 0.001 || 
       Math.abs(cube.position.y - y) > 0.001 || 
       Math.abs(cube.position.z - z) > 0.001) 
        ? new Vector3(x, y, z) 
        : cube.position;
    
    return {
      ...cube,
      position: newPosition
    };
  });
};

export const checkCubeIntegrity = (cubes: CubeData[]): boolean => {
  if (cubes.length !== 27) {
    console.warn("Incorrect number of cubes:", cubes.length);
    return false;
  }

  for (const cube of cubes) {
    const { x, y, z } = cube.position;
    if (Math.abs(x) > 1.1 || Math.abs(y) > 1.1 || Math.abs(z) > 1.1) {
      console.warn("Cube out of range:", cube.id, x, y, z);
      return false;
    }
  }
  
  return true;
};

export const createRotationMatrix = (axis: string, angle: number): Matrix4 => {
  const matrix = new Matrix4();
  const quaternion = new Quaternion();
  const vector = new Vector3();
  
  matrix.identity();
  quaternion.identity();
  vector.set(0, 0, 0);
  (vector as any)[axis] = 1;
  quaternion.setFromAxisAngle(vector, angle);
  return matrix.makeRotationFromQuaternion(quaternion);
};

export const matrixToQuaternion = (matrix: Matrix4): Quaternion => {
  const quaternion = new Quaternion();
  quaternion.setFromRotationMatrix(matrix);
  return quaternion.clone();
};

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

export const updateCubes = (
  prevCubes: CubeData[], 
  move: Move, 
  stepRotationMatrix: Matrix4,
  isInLayerFn: typeof isInLayer
): CubeData[] => {
  return prevCubes.map((cube) => {
    if (isInLayerFn(cube.position, move.axis, move.layer)) {
      const tempVec3 = new Vector3(
        cube.position.x,
        cube.position.y,
        cube.position.z
      );

      tempVec3.applyMatrix4(stepRotationMatrix);

      const newRotationMatrix = new Matrix4().multiplyMatrices(
        stepRotationMatrix,
        cube.rotationMatrix
      );

      return {
        ...cube,
        position: tempVec3,
        rotationMatrix: newRotationMatrix,
      };
    }
    return cube;
  });
};

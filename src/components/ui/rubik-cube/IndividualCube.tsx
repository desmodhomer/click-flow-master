
import React, { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { CubeData, DeviceSettings } from "./types";
import { matrixToQuaternion } from "./cubeUtils";

interface IndividualCubeProps {
  cube: CubeData;
  size: number;
  gap: number;
  radius: number;
  deviceSettings: DeviceSettings;
}

export const IndividualCube: React.FC<IndividualCubeProps> = ({
  cube,
  size,
  gap,
  radius,
  deviceSettings
}) => {
  const chromeMaterial = useMemo(() => ({
    color: '#404040',
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
    iridescence: 0.3,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 400],
    envMapIntensity: 1.5
  }), []);

  return (
    <group
      key={cube.id}
      position={[
        cube.position.x * (size + gap),
        cube.position.y * (size + gap),
        cube.position.z * (size + gap),
      ]}
      quaternion={matrixToQuaternion(cube.rotationMatrix)}
    >
      <RoundedBox
        args={[size, size, size]}
        radius={radius}
        smoothness={deviceSettings.smoothness}
        castShadow={deviceSettings.castShadow}
        receiveShadow={deviceSettings.receiveShadow}
      >
        <meshPhysicalMaterial {...chromeMaterial} />
      </RoundedBox>
    </group>
  );
};

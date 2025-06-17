
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
    color: '#000000',
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 0,
    clearcoatRoughness: 0,
    reflectivity: 0.5,
    iridescence: 0,
    iridescenceIOR: 0,
    iridescenceThicknessRange: [100, 400],
    envMapIntensity: 8
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

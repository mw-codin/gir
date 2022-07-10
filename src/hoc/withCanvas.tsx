import {
  AmbientLightProps,
  DirectionalLightProps,
  OrthographicCameraProps,
} from '@react-three/fiber';
import React from 'react';
import { Canvas as ThreeCanvas } from '@react-three/fiber';

interface CanvasProps {
  cameraProps?: Partial<OrthographicCameraProps> | any;
  directionalLightProps?: Partial<DirectionalLightProps>;
  ambientLightProps?: Partial<AmbientLightProps>;
  children: React.ReactNode | React.ReactNode[];
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const {
    cameraProps = { position: [-2.5, 0, 0] },
    directionalLightProps = { position: [-1, 2, 2], intensity: 0.005 },
    ambientLightProps = { intensity: 0.001 },
    children,
  } = props;

  return (
    <ThreeCanvas camera={{ ...cameraProps }}>
      <directionalLight {...directionalLightProps} />
      <ambientLight {...ambientLightProps} />
      {children}
    </ThreeCanvas>
  );
};

// chose a HOC over a hook here because react-three hooks can
// only be used within a Canvas
export default function <T>(Inner: React.FC<T>, canvasProps?: CanvasProps) {
  const WithCanvas: React.FC<T> = (props) => {
    return (
      <Canvas {...canvasProps}>
        <Inner {...props} />
      </Canvas>
    );
  };
  return WithCanvas;
}

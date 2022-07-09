import React from 'react';
import { Vector3 } from 'three';
import Canvas from './Canvas';
import useDraggableFloatingAnimation from '../hooks/useDraggableFloatingAnimation';

const up = new Vector3(0, 1, 0);

export interface BoxProps {
  speed?: number;
  resistance?: number;
  color?: [number, number, number];
  scale?: number;
  position?: [number, number, number];
  breatheRate?: number;
  breatheAmplitude?: number;
}

export const _Box: React.FC<BoxProps> = (props: any) => {
  const {
    speed = 0.5,
    resistance = 0.5,
    color = [0, 255, 0],
    scale = 1,
    position = [0, 0, 0],
    breatheRate = 1,
    breatheAmplitude = 0.2,
  } = props;

  const [boxRef, onPointerDown, onPointerUp, onPointerOver, onPointerLeave] =
    useDraggableFloatingAnimation(breatheAmplitude, breatheRate);

  return (
    <mesh
      {...props}
      ref={boxRef}
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      castShadow
      receiveShadow
      position={position}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

const Box: React.FC<BoxProps> = (props) => {
  return (
    <Canvas>
      <_Box {...props} />
    </Canvas>
  );
};

export default Box;

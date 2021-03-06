import React from 'react';
import { Vector3 } from 'three';
import useDraggableFloatingAnimation from '../hooks/useDraggableFloatingAnimation';
import withCanvas from '../hoc/withCanvas';

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
    color = [0, 255, 0],
    breatheRate = 1,
    breatheAmplitude = 0.2,
  } = props;

  const [boxRef, eventHandlers] = useDraggableFloatingAnimation(
    breatheAmplitude,
    breatheRate
  );

  return (
    <mesh
      ref={boxRef}
      {...eventHandlers}
      {...props}
    >
      <boxGeometry />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

export default withCanvas<BoxProps>(_Box);

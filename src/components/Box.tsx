import React, { useEffect, useRef, useState } from 'react';
import { RootState, useFrame } from '@react-three/fiber';
import { Mesh, MeshLambertMaterial, Vector3 } from 'three';
import getValueInRange from '../util/getValueInRangeFromNormalizedValue';
import Canvas from './Canvas';

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

  const boxRef = useRef<Mesh>();
  const dragging = useRef<boolean>(false);
  const xVelocity = useRef<number>(Math.random() / 10 - 0.05);
  const yVelocity = useRef<number>(Math.random() / 10 - 0.05);
  const t = useRef<number>(Math.PI / 2);
  const hovered = useRef<boolean>(false);

  // sin wave based breathing
  const breathe = () => {
    if (!boxRef.current) return;

    const currentWorldPosition = new Vector3();
    boxRef.current.getWorldPosition(currentWorldPosition);

    const newYCoordinate =
      currentWorldPosition.y +
      Math.sin(t.current) * getValueInRange(0.001, 0.01, breatheAmplitude);
    boxRef.current.position.y = newYCoordinate;

    t.current += getValueInRange(0.001, 0.01, breatheRate);
  };

  const handleDrag = (state: RootState) => {
    if (!boxRef.current) return;

    // get axis to rotate around (based on camera position to cube)
    let cubeWorldPosition: Vector3 = new Vector3();
    boxRef.current.getWorldPosition(cubeWorldPosition);

    const fromCameraToCube: Vector3 = new Vector3(
      state.camera.position.x - cubeWorldPosition.x,
      state.camera.position.y - cubeWorldPosition.y,
      state.camera.position.z - cubeWorldPosition.z
    ).normalize();

    const fromCameraToCubeCross = new Vector3()
      .copy(fromCameraToCube)
      .cross(up)
      .normalize();

    const fromCameraToCubeDoubleCross = new Vector3()
      .copy(fromCameraToCube)
      .cross(fromCameraToCubeCross)
      .normalize();

    boxRef.current.rotateOnWorldAxis(
      fromCameraToCubeDoubleCross,
      -xVelocity.current
    );
    boxRef.current.rotateOnWorldAxis(fromCameraToCubeCross, -yVelocity.current);
  };

  const airResistance = () => {
    if (Math.abs(xVelocity.current) > 0.002) xVelocity.current *= 0.98;

    if (Math.abs(yVelocity.current) > 0.002) yVelocity.current *= 0.98;
  };

  // animation loop hook
  useFrame((state) => {
    if (!boxRef.current) return;

    breathe();
    handleDrag(state);
    airResistance();
  });

  // event handlers
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      xVelocity.current += e.movementX / 1000;
      yVelocity.current += e.movementY / 1000;
    }
  };
  const handlePointerDown = (e: MouseEvent) => {
    if (e.type === 'pointerdown') {
      document.body.style.cursor = 'grabbing';
      dragging.current = true;
    }
  };
  const handlePointerUp = (e: MouseEvent) => {
    dragging.current = false;
    if (hovered.current) document.body.style.cursor = 'grab';
    else document.body.style.cursor = '';
  };
  const handlePointerOver = (e: MouseEvent) => {
    hovered.current = true;
    document.body.style.cursor = 'grab';
  };
  const handlePointerLeave = (e: MouseEvent) => {
    hovered.current = false;
    if (!dragging.current) document.body.style.cursor = '';
  };

  useEffect(() => {
    document.addEventListener('pointermove', handleMouseMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handleMouseMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
      <mesh
        {...props}
        ref={boxRef}
        scale={scale}
        onClick={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
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
  )
}

export default Box;

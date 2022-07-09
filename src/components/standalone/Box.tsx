import React from 'react';
import { Canvas } from '@react-three/fiber';
import InnerBox from '../three/Box';

export default function Box(props: any) {
  return (
    <>
      <Canvas camera={{ position: [-10, 0, 0] }}>
        <InnerBox {...props} />
      </Canvas>
    </>
  );
}

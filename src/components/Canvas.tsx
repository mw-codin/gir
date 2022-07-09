import { AmbientLightProps, DirectionalLightProps, OrthographicCameraProps } from "@react-three/fiber";
import React from "react";
import { Canvas as ThreeCanvas } from '@react-three/fiber';

interface Props {
    cameraProps?: Partial<OrthographicCameraProps> | any;
    directionalLightProps?: Partial<DirectionalLightProps>;
    ambientLightProps?: Partial<AmbientLightProps>;
    children: React.ReactNode | React.ReactNode[];
};

const Canvas: React.FC<Props> = (props) => {
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
}

export default Canvas;
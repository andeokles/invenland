import React from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Overlay from "../components/Overlay";
import Experience from "../components/Experience";

const MainScene = () => (
  <>
    <Leva hidden />
    <Overlay />
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  </>
);

export default MainScene;
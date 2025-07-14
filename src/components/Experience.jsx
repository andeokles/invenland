import {
  CameraControls,
  Environment,
  MeshDistortMaterial,
  RenderTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { slideAtom } from "./Overlay";
import { Scene } from "./Scene";

export const scenes = [
  {
    path: "models/bruja.glb",
    mainColor: "#f9c0ff",
    name: "Bruja Morgana",
    description:
      "Guardiana de los viejos bosques y del aquelarre antiguo. Sus conjuros brotan de raíces y cada amuleto que porta cambia con las estaciones",
    skybox: "textures/bruja/enchanted_dark_forest.jpg",
  },
  {
    path: "models/hombre_heroe.glb",
    mainColor: "#c0ffe1",
    name: "Henrik el Vivaz",
    description: "Un ex-militar forjado en mil batallas. Su espada atrapa relámpagos, y bajo la tormenta su valor se hace leyenda",
    skybox: "textures/heroe_hombre/mountain_war_camp.jpg",
  },
  {
    path: "models/mujer_heroe.glb",
    mainColor: "#ffdec0",
    name: "Liora, Guardiana del Bosque Silencioso",
    description: "Hija del bosque, aliada de bestias y raíces. Habla con los árboles y combate con espinas. Su compasión es tan profunda como su capacidad de destruir a quien dañe la vida",
    skybox: "textures/heroe_mujer/mystical_forest_claring.jpg",
  },
];

const CameraHandler = ({ slideDistance }) => {
  const viewport = useThree((state) => state.viewport);
  const cameraControls = useRef();
  const [slide] = useAtom(slideAtom);
  const lastSlide = useRef(0);

  const { dollyDistance } = useControls({
    dollyDistance: {
      value: 10,
      min: 0,
      max: 50,
    },
  });

  const moveToSlide = async () => {
    await cameraControls.current.setLookAt(
      lastSlide.current * (viewport.width + slideDistance),
      3,
      dollyDistance,
      lastSlide.current * (viewport.width + slideDistance),
      0,
      0,
      true
    );
    await cameraControls.current.setLookAt(
      (slide + 1) * (viewport.width + slideDistance),
      1,
      dollyDistance,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );

    await cameraControls.current.setLookAt(
      slide * (viewport.width + slideDistance),
      0,
      5,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );
  };

  useEffect(() => {
    // Used to reset the camera position when the viewport changes
    const resetTimeout = setTimeout(() => {
      cameraControls.current.setLookAt(
        slide * (viewport.width + slideDistance),
        0,
        5,
        slide * (viewport.width + slideDistance),
        0,
        0
      );
    }, 200);
    return () => clearTimeout(resetTimeout);
  }, [viewport]);

  useEffect(() => {
    if (lastSlide.current === slide) {
      return;
    }
    moveToSlide();
    lastSlide.current = slide;
  }, [slide]);
  return (
    <CameraControls
      ref={cameraControls}
      touches={{
        one: 0,
        two: 0,
        three: 0,
      }}
      mouseButtons={{
        left: 0,
        middle: 0,
        right: 0,
      }}
    />
  );
};

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {value: 1,min: 0,max: 10,},
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset={"forest"} />
      <CameraHandler slideDistance={slideDistance} />
      {/* MAIN WORLD */}
      <group>
        <mesh position-y={viewport.height / 2 + 1.5}>
          <MeshDistortMaterial color={scenes[0].mainColor} speed={3} />
        </mesh>

        <mesh
          position-x={viewport.width + slideDistance}
          position-y={viewport.height / 2 + 1.5}
        >
          <MeshDistortMaterial color={scenes[1].mainColor} speed={3} />
        </mesh>
      </group>


      {scenes.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Scene {...scene} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
};

export default Experience;
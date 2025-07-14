import { useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useTexture, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export const Scene = ({ path, skybox, ...props }) => {
  // Modelo glTF
  const { scene: model } = useGLTF(path)
  // WebGL renderer y escena de R3F
  const { gl, scene } = useThree()

  // Carga y configura la textura equirectangular como skybox con mipmaps/anisotropía
  const bgTexture = useTexture(skybox, tex => {
    tex.mapping = THREE.EquirectangularReflectionMapping
    tex.encoding = THREE.sRGBEncoding
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = gl.capabilities.getMaxAnisotropy()
    tex.needsUpdate = true
  })

  // Aplicar sombras al modelo
  useEffect(() => {
    model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [model])

  // Generar PMREM para usar como environment map y fondo
  useEffect(() => {
    const pmremGen = new THREE.PMREMGenerator(gl)
    pmremGen.compileEquirectangularShader()
    const envMap = pmremGen.fromEquirectangular(bgTexture).texture
    scene.environment = envMap
    scene.background = envMap
    bgTexture.dispose()
    pmremGen.dispose()
  }, [bgTexture, gl, scene])

  // Escalado responsivo
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920))

  return (
    <>
      {/* Color de fondo mientras carga la textura */}
      <color attach="background" args={["#000000"]} />

      <group {...props} dispose={null}>
        {/* Cámara y controles */}
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls
          autoRotate
          enablePan={false}
          maxPolarAngle={THREE.MathUtils.degToRad(75)}
          minDistance={6}
          maxDistance={10}
          autoRotateSpeed={0.5}
        />

        {/* Modelo glTF */}
        <primitive object={model} scale={ratioScale} />
      </group>
    </>
  )
}

useGLTF.preload('/models/bruja.glb')
useGLTF.preload('/models/hombre_heroe.glb')
useGLTF.preload('/models/mujer_heroe.glb')
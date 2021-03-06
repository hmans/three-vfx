import { useTexture } from "@react-three/drei"
import { CustomShaderMaterialMaster } from "shadenfreude"
import { MeshStandardMaterial, RepeatWrapping } from "three"
import CustomShaderMaterial from "three-custom-shader-material"
import { DustExample } from "./DustExample"
import hexgrid from "./textures/hexgrid.jpeg"
import { useShader } from "./useShader"

export default function Playground() {
  const texture = useTexture(hexgrid)
  texture.wrapT = RepeatWrapping
  texture.wrapS = RepeatWrapping

  const shader = useShader(() => {
    return CustomShaderMaterialMaster({})
  }, [])

  // console.log(shader.vertexShader)
  // console.log(shader.fragmentShader)

  return (
    <group position-y={10}>
      {/* <Fog /> */}
      <DustExample />
      <mesh>
        <icosahedronGeometry args={[10, 3]} />
        <CustomShaderMaterial
          baseMaterial={MeshStandardMaterial}
          {...shader}
          uniforms={{ ...shader.uniforms, u_texture: { value: texture } }}
        />
      </mesh>
    </group>
  )
}

import { useRef } from "react"
import {
  AddNode,
  ColorNode,
  float,
  ShaderMaterialMasterNode,
  ShaderNode,
  vec3
} from "shadenfreude"
import { Color, ShaderMaterial } from "three"
import { useShader } from "./useShader"

export default function Playground() {
  const shaderProps = useShader(() => {
    const colorA = ColorNode({ a: new Color("#f33") })
    const colorB = ColorNode({ a: new Color(0, 1, 0) })

    const node = ShaderNode({
      name: "I'm a dummy",
      inputs: {
        a: float(),
        b: float()
      },
      outputs: {
        value: float()
      }
    })

    const l = AddNode({
      a: vec3(), // eeeh
      b: colorB
    })

    const colorStack = ShaderNode({
      name: "Color Stack",
      inputs: {
        a: vec3(colorA)
      },
      outputs: {
        value: vec3("inputs.a")
      },
      filters: [l]
    })

    return ShaderMaterialMasterNode({
      color: colorStack
    })
  })
  const material = useRef<ShaderMaterial>(null!)

  console.log(shaderProps.vertexShader)
  console.log(shaderProps.fragmentShader)

  return (
    <group position-y={15}>
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />

        <shaderMaterial ref={material} {...shaderProps} />

        {/* <CustomShaderMaterial
          baseMaterial={MeshStandardMaterial}
          {...shaderProps}
          ref={material}
        /> */}
      </mesh>
    </group>
  )
}

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import {
  AddNode,
  BlendNode,
  ColorNode,
  compileShader,
  ComposeNode,
  Factory,
  float,
  Parameter,
  ShaderMaterialMasterNode,
  ShaderNode,
  TimeNode,
  UVNode,
  ValueType,
  vec2,
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
        color: vec3(colorA)
      },
      outputs: {
        value: vec3("inputs.color")
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

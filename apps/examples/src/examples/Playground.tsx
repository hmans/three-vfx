import { useMemo } from "react"
import {
  assignment,
  compileShader,
  Parameter,
  renderValue,
  ShaderNode,
  variable
} from "shadenfreude"
import { Color, MeshStandardMaterial } from "three"
import CustomShaderMaterial from "three-custom-shader-material"

/*



*/

const FloatNode = (value: number): ShaderNode<"float"> => ({
  value: variable("float", value),

  render: () => ({
    name: "Float"
  })
})

const ColorNode = (color: Color): ShaderNode<"vec3"> => ({
  value: variable("vec3", color),

  render: () => ({
    name: "Color"
  })
})

type CSMMasterprops = {
  color: Parameter<"vec3">
}

const CSMMasterNode = ({ color }: CSMMasterprops): ShaderNode<any> => ({
  value: variable("bool"), // eh

  render: () => ({
    name: "CSM Root",
    fragment: {
      body: assignment("csm_DiffuseColor", renderValue(color))
    }
  })
})

export default function Playground() {
  const shader = useMemo(() => {
    const root = CSMMasterNode({
      color: ColorNode(new Color("hotpink")).value
    })

    const shader = compileShader(root)
    return shader
  }, [])

  console.log(shader.vertexShader)
  console.log(shader.fragmentShader)

  return (
    <group position-y={15}>
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />

        <CustomShaderMaterial baseMaterial={MeshStandardMaterial} {...shader} />
      </mesh>
    </group>
  )
}

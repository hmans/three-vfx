import { useMemo } from "react"
import { MeshStandardMaterial } from "three"
import CustomShaderMaterial from "three-custom-shader-material"

/*



*/

type ShaderNode = {
  name: string
}

const CSMMasterNode = (): ShaderNode => ({
  name: "CSM Root"
})

const compileShader = (root: ShaderNode) => {
  const vertexShader = ``

  const fragmentShader = `
  void main() {
    csm_DiffuseColor = vec4(0.8, 0.5, 0.3, 1.0);
  }
  `

  return {
    vertexShader,
    fragmentShader
  }
}

export default function Playground() {
  const shader = useMemo(() => {
    const root = CSMMasterNode()
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

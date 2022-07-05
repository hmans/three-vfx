import { useMemo } from "react"
import { MeshStandardMaterial, Vector4 } from "three"
import CustomShaderMaterial from "three-custom-shader-material"

/*



*/

type Parts = any[]

type Chunk = string | Parts

function concatenate(...parts: Parts): string {
  return parts
    .filter((p) => !!p)
    .map((p) => (Array.isArray(p) ? concatenate(...p) : p))
    .join("\n")
}

function block(...parts: Parts) {
  return ["{", ...parts, "}"]
}

function statement(...parts: Parts) {
  return [...parts, ";"]
}

function assignment(name: string, value: any) {
  return statement(`${name} = ${renderValue(value)}`)
}

function renderValue(value: any) {
  if (typeof value === "string") {
    return value
  } else if (value instanceof Vector4) {
    return `vec4(${value.x}, ${value.y}, ${value.z}, ${value.w})`
  } else {
    return value
  }
}

type Program = {
  header?: Chunk
  body?: Chunk
}

type ShaderNode = {
  name: string
  vertex?: Program
  fragment?: Program
}

const CSMMasterNode = (): ShaderNode => ({
  name: "CSM Root",
  fragment: {
    body: assignment("csm_DiffuseColor", new Vector4(0.8, 0.5, 0.3, 1.0))
  }
})

const compileShader = (root: ShaderNode) => {
  const vertexShader = ``

  const fragmentShader = concatenate("void main()", block(root.fragment?.body))

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

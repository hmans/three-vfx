import { useMemo } from "react"
import {
  Color,
  Matrix3,
  Matrix4,
  MeshStandardMaterial,
  Vector2,
  Vector3,
  Vector4
} from "three"
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

function assignment(name: string, value: string) {
  return statement(`${name} = ${value}`)
}

function renderValue(value: any): string {
  if (typeof value === "string") {
    return value
  } else if (isVariable(value)) {
    return value.name
  } else if (value instanceof Vector4) {
    return `vec4(${value.x}, ${value.y}, ${value.z}, ${value.w})`
  } else {
    throw new Error("Could not render value:", value)
  }
}

type ValueType = "bool" | "float" | "vec2" | "vec3" | "vec4" | "mat3" | "mat4"

type JSTypeMap = {
  bool: boolean
  float: number
  vec2: Vector2
  vec3: Vector3 | Color
  vec4: Vector4
  mat3: Matrix3
  mat4: Matrix4
}

type Variable<T extends ValueType> = {
  _isVariable: true
  name: string
  type: T
  value?: Value<T>
}

function isVariable(v: any): v is Variable<ValueType> {
  return v && v._isVariable
}

type Value<T extends ValueType> = JSTypeMap[T] | Variable<T>

type Parameter<T extends ValueType> = Value<T>

function variable<T extends ValueType>(type: T, value?: Value<T>): Variable<T> {
  return {
    _isVariable: true,
    name: `var_${Math.floor(Math.random() * 1000000)}`,
    type,
    value
  }
}

type Program = {
  header?: Chunk
  body?: Chunk
}

type ShaderNode<T extends ValueType> = {
  [key: string]: any
  value: Variable<T>
  render: () => RenderedShaderNode
}

type RenderedShaderNode = {
  name: string
  vertex?: Program
  fragment?: Program
}

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

const compileShader = (root: ShaderNode<any>) => {
  const rendered = root.render()

  const vertexShader = ``

  const fragmentShader = concatenate(
    "void main()",
    block(rendered.fragment?.body)
  )

  return {
    vertexShader,
    fragmentShader
  }
}

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

import { Vector2, Vector3, Color, Vector4, Matrix3, Matrix4 } from "three"

export type ValueType =
  | "bool"
  | "float"
  | "vec2"
  | "vec3"
  | "vec4"
  | "mat3"
  | "mat4"

type JSTypeMap = {
  bool: boolean
  float: number
  vec2: Vector2
  vec3: Vector3 | Color
  vec4: Vector4
  mat3: Matrix3
  mat4: Matrix4
}

export type Variable<T extends ValueType> = {
  _isVariable: true
  name: string
  type: T
  value?: Value<T>
}

export function isVariable(v: any): v is Variable<ValueType> {
  return v && v._isVariable
}

export type Value<T extends ValueType> = JSTypeMap[T] | Variable<T>

export type Parameter<T extends ValueType> = Value<T>

export function variable<T extends ValueType>(
  type: T,
  value?: Value<T>
): Variable<T> {
  return {
    _isVariable: true,
    name: `var_${Math.floor(Math.random() * 1000000)}`,
    type,
    value
  }
}

export function renderValue(value: any): string {
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

import { Parts } from "./concatenator3000"
import { ValueType, Variable } from "./variables"

export type Chunk = string | Parts

export type Program = {
  header?: Chunk
  body?: Chunk
}

export type ShaderNode<T extends ValueType> = {
  [key: string]: any
  value: Variable<T>
  render: () => RenderedShaderNode
}

export type RenderedShaderNode = {
  name: string
  vertex?: Program
  fragment?: Program
}

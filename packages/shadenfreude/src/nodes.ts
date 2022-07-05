import { Parts } from "./concatenator3000"
import { ValueType, Variable } from "./variables"

export type Chunk = string | Parts

export type Program = {
  header?: Chunk
  body?: Chunk
}

export type ShaderNode<I extends ValueType, O extends ValueType> = {
  name: string

  inputs: {
    a: Variable<I>
  }

  outputs: {
    value: Variable<O>
  }

  vertex?: Program
  fragment?: Program
}

export function ShaderNode() {}

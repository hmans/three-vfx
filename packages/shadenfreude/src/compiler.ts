import { block, concatenate } from "./concatenator3000"
import { ShaderNode } from "./nodes"

export const compileShader = (root: ShaderNode<any, any>) => {
  const vertexShader = ``

  const fragmentShader = concatenate("void main()", block(root.fragment?.body))

  return {
    vertexShader,
    fragmentShader
  }
}

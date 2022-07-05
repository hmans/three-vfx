import { block, concatenate } from "./concatenator3000"
import { ShaderNode } from "./nodes"

export const compileShader = (root: ShaderNode<any>) => {
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

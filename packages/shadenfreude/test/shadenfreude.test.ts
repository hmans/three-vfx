import { float, node, variable, compileShader } from "../src/shadenfreude"

describe("node", () => {
  it("creates a shader node", () => {
    const n = node({ name: "A Blank Shader Node" })
    expect(n).toEqual({ name: "A Blank Shader Node" })
  })

  it("assigns the node to its input and output variables", () => {
    const n = node({ inputs: { a: float() }, outputs: { value: float() } })
    expect(n.inputs.a.node).toBe(n)
    expect(n.outputs.value.node).toBe(n)
  })
})

describe("variable", () => {
  it("creates a variable of the specified type", () => {
    const v = variable("float")
    expect(v.type).toBe("float")
    expect(v.value).toBeUndefined()
  })

  it("assigns the given value", () => {
    const v = variable("float", 123)
    expect(v.value).toBe(123)
  })
})

describe("compileShader", () => {
  it("compiles the given node into a shader", () => {
    const n = node({ name: "A Blank Shader Node" })
    const c = compileShader(n)

    expect(c.vertexShader).toMatchInlineSnapshot(`
      "
      void main() {

      /*** BEGIN: A Blank Shader Node ***/
      {
      }
      /*** END: A Blank Shader Node ***/

      }"
    `)

    expect(c.fragmentShader).toMatchInlineSnapshot(`
      "
      void main() {

      /*** BEGIN: A Blank Shader Node ***/
      {
      }
      /*** END: A Blank Shader Node ***/

      }"
    `)
  })
})
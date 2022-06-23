import { Quaternion, Vector3 } from "three"
import { createShader } from "../lib/shadermaker"

export default function() {
  return createShader({
    attributes: {
      velocity: { type: "vec3", itemSize: 3 },
      acceleration: { type: "vec3", itemSize: 3 }
    },

    configurator: {
      position: new Vector3(),
      quaternion: new Quaternion(),
      velocity: new Vector3(),
      acceleration: new Vector3()
    },

    vertexMain: `
      csm_Position += vec3(v_age * velocity + 0.5 * v_age * v_age * acceleration) * mat3(instanceMatrix);
    `
  })
}

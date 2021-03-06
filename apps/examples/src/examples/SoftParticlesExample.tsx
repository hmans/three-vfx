import { MeshStandardMaterial } from "three"
import { Emitter, MeshParticles, MeshParticlesMaterial } from "three-vfx"
import { useDepthBuffer } from "./lib/useDepthBuffer"

export const SoftParticlesExample = () => {
  const depthBuffer = useDepthBuffer()

  return (
    <MeshParticles>
      <planeGeometry args={[20, 20]} />

      <MeshParticlesMaterial
        baseMaterial={MeshStandardMaterial}
        color="hotpink"
        billboard
        transparent
        softness={5}
        depthWrite={false}
        depthTexture={depthBuffer.depthTexture}
      />

      <Emitter
        count={1}
        setup={(c) => {
          c.lifetime = Infinity
        }}
      />
    </MeshParticles>
  )
}

import {
  createVisualEffect,
  MeshParticlesProps,
  ParticlesMaterial
} from "@hmans/vfx"
import { useMemo } from "react"

export default (props: MeshParticlesProps) => {
  const effect = useMemo(() => createVisualEffect(), [])

  return (
    <effect.Root {...props} scale={0.2}>
      <ParticlesMaterial color="white" />
      <sphereBufferGeometry args={[1, 8, 8]} />

      {/* <Emitter spawnCount={3} burstCount={10} burstDelay={0.025} /> */}
    </effect.Root>
  )
}

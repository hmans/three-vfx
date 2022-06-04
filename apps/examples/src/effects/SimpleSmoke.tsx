import {
  createVisualEffect,
  VisualEffectProps,
  ParticlesMaterial
} from "@hmans/vfx"
import { useMemo } from "react"

export default (props: VisualEffectProps) => {
  const { Root, Emitter } = useMemo(() => createVisualEffect(), [])

  return (
    <Root {...props} scale={0.2}>
      <ParticlesMaterial color="white" />
      <sphereBufferGeometry args={[1, 8, 8]} />

      <Emitter spawnCount={3} burstCount={10} burstDelay={0.025} />
    </Root>
  )
}

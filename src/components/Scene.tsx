import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 4], // moved back
        fov: 45,
        near: 0.01,          // 🔥 critical fix
        far: 100,            // 🔥 critical fix
      }}
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
      }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Suspense fallback={null}>{children}</Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
      />
    </Canvas>
  )
}

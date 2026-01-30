import { useFrame, useLoader } from '@react-three/fiber'
import { OBJLoader, MTLLoader, GLTFLoader } from 'three-stdlib'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function ObjModel({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null!)

  const isGLB = url.endsWith('.glb') || url.endsWith('.gltf')

  // ===== LOADERS =====
  const gltf = isGLB ? useLoader(GLTFLoader, url) : null

  const materials = !isGLB
    ? useLoader(MTLLoader, url.replace('.obj', '.mtl'), (loader) => {
        loader.setMaterialOptions({ side: THREE.DoubleSide })
      })
    : null

  const obj = !isGLB
    ? useLoader(OBJLoader, url, (loader) => {
        materials?.preload()
        if (materials) loader.setMaterials(materials)
      })
    : null

  // ===== PICK SCENE =====
  const scene = useMemo(() => {
    const model = isGLB ? gltf!.scene : obj!

    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3()).length()
    const center = box.getCenter(new THREE.Vector3())

    model.position.sub(center)
    model.scale.setScalar(0.9 / size)

    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        // Fallback color ONLY if no material exists
        if (!child.material) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#d9d9d9',
            roughness: 0.4,
            metalness: 0.05,
          })
        }
      }
    })

    return model
  }, [isGLB, gltf, obj])

  // ===== ROTATION =====
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4
    }
  })

  return <primitive ref={group} object={scene} />
}

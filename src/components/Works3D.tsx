import Scene from './Scene'
import ObjModel from './ObjModel'

export default function Works3D({ model }: { model: string }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Scene>
        <ObjModel url={model} />
      </Scene>
    </div>
  )
}

import { useState } from 'react'
import { useScenes } from './hooks/useScenes'
import type { SceneFormValues } from './lib/validation'
import { ScenePage } from './pages/ScenePage/ScenePage'
import { ScenesPage } from './pages/ScenesPage/ScenesPage'

function App() {
  const { scenes, addScene, addShot, removeShot } = useScenes()
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const selectedScene = scenes.find((scene) => scene.id === selectedSceneId)

  function handleAddScene(values: SceneFormValues) {
    const scene = addScene(values)
    setSelectedSceneId(scene.id)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="mx-auto max-w-2xl p-4">
        {selectedScene ? (
          <ScenePage
            scene={selectedScene}
            onAddShot={(shot) => addShot(selectedScene.id, shot)}
            onRemoveShot={(shotId) => removeShot(selectedScene.id, shotId)}
            onBack={() => setSelectedSceneId(null)}
          />
        ) : (
          <ScenesPage
            scenes={scenes}
            onAddScene={handleAddScene}
            onOpenScene={setSelectedSceneId}
          />
        )}
      </main>
    </div>
  )
}

export default App

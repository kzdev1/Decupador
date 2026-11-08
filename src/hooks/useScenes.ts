import { useEffect, useState } from 'react'
import { loadScenes, saveScenes } from '../lib/storage'
import type { SceneFormValues } from '../lib/validation'
import type { Scene, Shot } from '../types/scene'

/** Gerencia as cenas do usuário e as persiste no navegador. */
export function useScenes() {
  const [scenes, setScenes] = useState<Scene[]>(loadScenes)

  useEffect(() => {
    saveScenes(scenes)
  }, [scenes])

  function addScene(values: SceneFormValues): Scene {
    const scene: Scene = {
      id: crypto.randomUUID(),
      title: values.title,
      film: values.film,
      watchUrl: values.watchUrl || undefined,
      shots: [],
      createdAt: new Date().toISOString(),
    }
    setScenes((current) => [scene, ...current])
    return scene
  }

  function addShot(sceneId: string, shot: Omit<Shot, 'id'>) {
    setScenes((current) =>
      current.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              shots: [...scene.shots, { ...shot, id: crypto.randomUUID() }],
            }
          : scene,
      ),
    )
  }

  function removeShot(sceneId: string, shotId: string) {
    setScenes((current) =>
      current.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              shots: scene.shots.filter((shot) => shot.id !== shotId),
            }
          : scene,
      ),
    )
  }

  return { scenes, addScene, addShot, removeShot }
}

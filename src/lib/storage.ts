import type { Scene } from '../types/scene'

const STORAGE_KEY = 'decupador:scenes:v1'

function isScene(value: unknown): value is Scene {
  if (typeof value !== 'object' || value === null) return false
  const scene = value as Record<string, unknown>
  return (
    typeof scene.id === 'string' &&
    typeof scene.title === 'string' &&
    typeof scene.film === 'string' &&
    typeof scene.createdAt === 'string' &&
    Array.isArray(scene.shots)
  )
}

/** Lê as cenas salvas no navegador. Retorna lista vazia se não houver dados válidos. */
export function loadScenes(): Scene[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data: unknown = JSON.parse(raw)
    return Array.isArray(data) ? data.filter(isScene) : []
  } catch {
    return []
  }
}

/** Grava as cenas no navegador. Ignora falhas (armazenamento cheio ou bloqueado). */
export function saveScenes(scenes: Scene[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenes))
  } catch {
    // O app continua funcionando, só não persiste os dados.
  }
}

import type { Shot } from '../types/scene'

export interface SceneStats {
  shotCount: number
  totalDuration: number
  averageShotLength: number
  cutsPerMinute: number
}

/**
 * Calcula as estatísticas de ritmo de uma cena.
 * Uma cena com N planos tem N - 1 cortes (o primeiro plano não começa com corte).
 */
export function calculateStats(shots: Shot[]): SceneStats {
  const shotCount = shots.length
  const totalDuration = shots.reduce((sum, shot) => sum + shot.duration, 0)

  if (shotCount === 0 || totalDuration <= 0) {
    return {
      shotCount,
      totalDuration: 0,
      averageShotLength: 0,
      cutsPerMinute: 0,
    }
  }

  const cuts = shotCount - 1

  return {
    shotCount,
    totalDuration,
    averageShotLength: totalDuration / shotCount,
    cutsPerMinute: cuts / (totalDuration / 60),
  }
}

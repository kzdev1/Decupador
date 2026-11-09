import { describe, expect, it } from 'vitest'
import type { Shot } from '../types/scene'
import { calculateStats } from './stats'

function makeShot(duration: number): Shot {
  return {
    id: `shot-${duration}`,
    duration,
    type: 'medio',
    movement: 'fixa',
    color: '#808080',
  }
}

describe('calculateStats', () => {
  it('devolve tudo zero para uma cena sem planos', () => {
    expect(calculateStats([])).toEqual({
      shotCount: 0,
      totalDuration: 0,
      averageShotLength: 0,
      cutsPerMinute: 0,
    })
  })

  it('não conta cortes quando há um plano só', () => {
    const stats = calculateStats([makeShot(10)])

    expect(stats.shotCount).toBe(1)
    expect(stats.averageShotLength).toBe(10)
    expect(stats.cutsPerMinute).toBe(0)
  })

  it('calcula média e cortes por minuto de uma cena de 12 segundos', () => {
    const stats = calculateStats([makeShot(2), makeShot(4), makeShot(6)])

    expect(stats.totalDuration).toBe(12)
    expect(stats.averageShotLength).toBe(4)
    // 2 cortes em 12 s = 2 / 0,2 min = 10 cortes por minuto
    expect(stats.cutsPerMinute).toBeCloseTo(10)
  })

  it('aceita durações com decimais', () => {
    const stats = calculateStats([makeShot(2.5), makeShot(2.5)])

    expect(stats.averageShotLength).toBe(2.5)
    expect(stats.cutsPerMinute).toBeCloseTo(12)
  })
})

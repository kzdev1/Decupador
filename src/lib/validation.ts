import type { CameraMovement, ShotType } from '../types/scene'

export interface SceneFormValues {
  title: string
  film: string
  watchUrl: string
}

export type SceneFormErrors = Partial<Record<keyof SceneFormValues, string>>

/** Indica se o texto é um link http ou https válido. */
export function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

/** Valida o formulário de cena. Retorna um objeto vazio quando tudo é válido. */
export function validateScene(values: SceneFormValues): SceneFormErrors {
  const errors: SceneFormErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Dê um título à cena para encontrá-la depois.'
  }

  const url = values.watchUrl.trim()
  if (url && !isHttpUrl(url)) {
    errors.watchUrl = 'Use um link completo, começando com http:// ou https://.'
  }

  return errors
}

export interface ShotFormValues {
  duration: string
  type: ShotType
  movement: CameraMovement
  color: string
}

export type ShotFormErrors = Partial<Record<'duration', string>>

/** Converte o texto digitado ("2,5" ou "2.5") em número. Retorna NaN se inválido. */
export function parseDuration(value: string): number {
  return Number(value.trim().replace(',', '.'))
}

/** Valida o formulário de plano. Retorna um objeto vazio quando tudo é válido. */
export function validateShot(values: ShotFormValues): ShotFormErrors {
  const errors: ShotFormErrors = {}
  const duration = parseDuration(values.duration)

  if (!values.duration.trim() || !Number.isFinite(duration) || duration <= 0) {
    errors.duration = 'Informe a duração em segundos, maior que zero. Ex.: 2,5.'
  }

  return errors
}

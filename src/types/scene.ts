/** Tipos de plano (enquadramento) aceitos pelo app. */
export const SHOT_TYPES = ['geral', 'medio', 'close', 'detalhe'] as const
export type ShotType = (typeof SHOT_TYPES)[number]

/** Movimentos de câmera aceitos pelo app. */
export const CAMERA_MOVEMENTS = [
  'fixa',
  'pan',
  'tilt',
  'travelling',
  'zoom',
  'na-mao',
] as const
export type CameraMovement = (typeof CAMERA_MOVEMENTS)[number]

/** Um plano anotado pelo usuário. */
export interface Shot {
  id: string
  /** Duração em segundos (aceita decimais, ex.: 2.5). */
  duration: number
  type: ShotType
  movement: CameraMovement
  /** Cor dominante em hexadecimal, ex.: "#1a2b3c". */
  color: string
}

/** Uma cena decupada. Guarda só anotações, nunca o vídeo. */
export interface Scene {
  id: string
  title: string
  film: string
  /** Link opcional de onde assistir à cena (http/https). */
  watchUrl?: string
  shots: Shot[]
  /** Data de criação em formato ISO, ex.: "2026-11-07T14:30:00.000Z". */
  createdAt: string
}

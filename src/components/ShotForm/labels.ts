import type { CameraMovement, ShotType } from '../../types/scene'

export const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  geral: 'Plano geral',
  medio: 'Plano médio',
  close: 'Close',
  detalhe: 'Plano detalhe',
}

export const CAMERA_MOVEMENT_LABELS: Record<CameraMovement, string> = {
  fixa: 'Câmera fixa',
  pan: 'Pan (giro horizontal)',
  tilt: 'Tilt (giro vertical)',
  travelling: 'Travelling',
  zoom: 'Zoom',
  'na-mao': 'Câmera na mão',
}

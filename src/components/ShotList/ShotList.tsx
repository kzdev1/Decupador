import type { Shot } from '../../types/scene'
import { CAMERA_MOVEMENT_LABELS, SHOT_TYPE_LABELS } from '../ShotForm/labels'

interface ShotListProps {
  shots: Shot[]
  onRemove: (shotId: string) => void
}

/** Lista os planos de uma cena, com opção de remover cada um. */
export function ShotList({ shots, onRemove }: ShotListProps) {
  if (shots.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-600 p-4 text-zinc-300">
        Nenhum plano anotado ainda. Preencha o formulário acima e toque em
        "Adicionar plano".
      </p>
    )
  }

  return (
    <ol className="flex flex-col gap-2">
      {shots.map((shot, index) => (
        <li
          key={shot.id}
          className="flex items-center gap-3 rounded-lg bg-zinc-800 p-3"
        >
          <span
            aria-hidden="true"
            className="size-6 shrink-0 rounded-full border border-zinc-500"
            style={{ backgroundColor: shot.color }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium">
              Plano {index + 1}: {shot.duration} s
            </p>
            <p className="text-sm text-zinc-300">
              {SHOT_TYPE_LABELS[shot.type]} ·{' '}
              {CAMERA_MOVEMENT_LABELS[shot.movement]} · cor {shot.color}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remover plano ${index + 1}`}
            onClick={() => {
              if (window.confirm(`Remover o plano ${index + 1}?`)) {
                onRemove(shot.id)
              }
            }}
            className="min-h-11 min-w-11 rounded-lg border border-red-400 px-3 text-sm text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            Remover
          </button>
        </li>
      ))}
    </ol>
  )
}

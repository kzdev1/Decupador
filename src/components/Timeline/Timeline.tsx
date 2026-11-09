import type { Shot } from '../../types/scene'

interface TimelineProps {
  shots: Shot[]
}

const BAR_HEIGHT = 48

function formatSeconds(value: number): string {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
}

/** Linha do tempo: cada plano é um bloco colorido com largura proporcional à duração. */
export function Timeline({ shots }: TimelineProps) {
  const total = shots.reduce((sum, shot) => sum + shot.duration, 0)
  if (total <= 0) return null

  const starts = shots.map((_, index) =>
    shots.slice(0, index).reduce((sum, shot) => sum + shot.duration, 0),
  )
  const countText = shots.length === 1 ? '1 plano' : `${shots.length} planos`

  return (
    <div className="flex flex-col gap-1">
      <svg
        viewBox={`0 0 ${total} ${BAR_HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Linha do tempo com ${countText} e duração total de ${formatSeconds(total)} segundos. Os detalhes de cada plano estão na lista abaixo.`}
        className="h-12 w-full overflow-hidden rounded-lg"
      >
        {shots.map((shot, index) => (
          <rect
            key={shot.id}
            x={starts[index]}
            y={0}
            width={shot.duration}
            height={BAR_HEIGHT}
            fill={shot.color}
            className="stroke-zinc-900"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          >
            <title>{`Plano ${index + 1}: ${formatSeconds(shot.duration)} s`}</title>
          </rect>
        ))}
      </svg>
      <div className="flex justify-between text-sm text-zinc-300">
        <span>0 s</span>
        <span>{formatSeconds(total)} s</span>
      </div>
    </div>
  )
}

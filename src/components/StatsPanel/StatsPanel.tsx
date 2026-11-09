import { calculateStats } from '../../lib/stats'
import type { Shot } from '../../types/scene'

interface StatsPanelProps {
  shots: Shot[]
}

function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
}

interface StatProps {
  label: string
  value: string
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-lg bg-zinc-800 p-3">
      <dt className="text-sm text-zinc-300">{label}</dt>
      <dd className="text-xl font-semibold">{value}</dd>
    </div>
  )
}

/** Painel com as estatísticas de ritmo da cena. */
export function StatsPanel({ shots }: StatsPanelProps) {
  const stats = calculateStats(shots)
  const cuts =
    stats.shotCount > 1 ? `${formatNumber(stats.cutsPerMinute)} /min` : '—'

  return (
    <dl className="grid grid-cols-2 gap-3">
      <Stat label="Planos" value={String(stats.shotCount)} />
      <Stat
        label="Duração total"
        value={`${formatNumber(stats.totalDuration)} s`}
      />
      <Stat
        label="Duração média do plano"
        value={`${formatNumber(stats.averageShotLength)} s`}
      />
      <Stat label="Cortes por minuto" value={cuts} />
    </dl>
  )
}

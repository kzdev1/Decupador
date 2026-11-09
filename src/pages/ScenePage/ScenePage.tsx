import { ShotForm } from '../../components/ShotForm/ShotForm'
import { ShotList } from '../../components/ShotList/ShotList'
import { StatsPanel } from '../../components/StatsPanel/StatsPanel'
import { Timeline } from '../../components/Timeline/Timeline'
import { isHttpUrl } from '../../lib/validation'
import type { Scene, Shot } from '../../types/scene'

interface ScenePageProps {
  scene: Scene
  onAddShot: (shot: Omit<Shot, 'id'>) => void
  onRemoveShot: (shotId: string) => void
  onBack: () => void
}

/** Página de uma cena: dados, formulário de plano, linha do tempo, estatísticas e lista de planos. */
export function ScenePage({
  scene,
  onAddShot,
  onRemoveShot,
  onBack,
}: ScenePageProps) {
  const safeUrl =
    scene.watchUrl && isHttpUrl(scene.watchUrl) ? scene.watchUrl : null
  const hasShots = scene.shots.length > 0

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 self-start rounded-lg px-2 text-sky-300 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
      >
        ← Voltar às cenas
      </button>

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{scene.title}</h1>
        {scene.film && <p className="text-zinc-300">{scene.film}</p>}
        {safeUrl && (
          <a
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 self-start py-2 text-sky-300 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            Onde assistir (abre em nova aba)
          </a>
        )}
      </header>

      <section aria-labelledby="add-shot-title" className="flex flex-col gap-4">
        <h2 id="add-shot-title" className="text-xl font-semibold">
          Novo plano
        </h2>
        <ShotForm onSubmit={onAddShot} />
      </section>

      {hasShots && (
        <section
          aria-labelledby="timeline-title"
          className="flex flex-col gap-4"
        >
          <h2 id="timeline-title" className="text-xl font-semibold">
            Linha do tempo
          </h2>
          <Timeline shots={scene.shots} />
        </section>
      )}

      {hasShots && (
        <section aria-labelledby="stats-title" className="flex flex-col gap-4">
          <h2 id="stats-title" className="text-xl font-semibold">
            Estatísticas
          </h2>
          <StatsPanel shots={scene.shots} />
        </section>
      )}

      <section aria-labelledby="shots-title" className="flex flex-col gap-4">
        <h2 id="shots-title" className="text-xl font-semibold">
          Planos ({scene.shots.length})
        </h2>
        <ShotList shots={scene.shots} onRemove={onRemoveShot} />
      </section>
    </div>
  )
}

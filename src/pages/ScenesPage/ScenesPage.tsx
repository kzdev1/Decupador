import { SceneForm } from '../../components/SceneForm/SceneForm'
import type { SceneFormValues } from '../../lib/validation'
import type { Scene } from '../../types/scene'

interface ScenesPageProps {
  scenes: Scene[]
  onAddScene: (values: SceneFormValues) => void
  onOpenScene: (sceneId: string) => void
}

function countLabel(count: number): string {
  return count === 1 ? '1 plano' : `${count} planos`
}

/** Tela inicial: cria cenas novas e lista as cenas salvas. */
export function ScenesPage({
  scenes,
  onAddScene,
  onOpenScene,
}: ScenesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Decupador</h1>

      <section
        aria-labelledby="new-scene-title"
        className="flex flex-col gap-4"
      >
        <h2 id="new-scene-title" className="text-xl font-semibold">
          Nova cena
        </h2>
        <SceneForm onSubmit={onAddScene} />
      </section>

      <section aria-labelledby="scenes-title" className="flex flex-col gap-4">
        <h2 id="scenes-title" className="text-xl font-semibold">
          Minhas cenas
        </h2>
        {scenes.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-600 p-4 text-zinc-300">
            Você ainda não criou nenhuma cena. Preencha o formulário acima para
            começar.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {scenes.map((scene) => (
              <li key={scene.id}>
                <button
                  type="button"
                  onClick={() => onOpenScene(scene.id)}
                  className="flex min-h-11 w-full flex-col rounded-lg bg-zinc-800 p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <span className="font-medium">{scene.title}</span>
                  <span className="text-sm text-zinc-300">
                    {scene.film || 'Filme não informado'} ·{' '}
                    {countLabel(scene.shots.length)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

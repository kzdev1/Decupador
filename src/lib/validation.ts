export interface SceneFormValues {
  title: string
  film: string
  watchUrl: string
}

export type SceneFormErrors = Partial<Record<keyof SceneFormValues, string>>

function isHttpUrl(value: string): boolean {
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
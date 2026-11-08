import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { TextField } from '../TextField/TextField'
import { validateScene } from '../../lib/validation'
import type { SceneFormErrors, SceneFormValues } from '../../lib/validation'

interface SceneFormProps {
  onSubmit: (values: SceneFormValues) => void
}

const EMPTY_VALUES: SceneFormValues = { title: '', film: '', watchUrl: '' }

/** Formulário de criação de cena. Valida os campos antes de chamar onSubmit. */
export function SceneForm({ onSubmit }: SceneFormProps) {
  const [values, setValues] = useState<SceneFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<SceneFormErrors>({})

  function handleChange(field: keyof SceneFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const foundErrors = validateScene(values)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    onSubmit({
      title: values.title.trim(),
      film: values.film.trim(),
      watchUrl: values.watchUrl.trim(),
    })
    setValues(EMPTY_VALUES)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        id="title"
        label="Título da cena"
        value={values.title}
        onChange={handleChange('title')}
        error={errors.title}
        placeholder="Ex.: Cena do corredor"
        required
      />
      <TextField
        id="film"
        label="Filme"
        value={values.film}
        onChange={handleChange('film')}
      />
      <TextField
        id="watchUrl"
        label="Onde assistir (opcional)"
        type="url"
        value={values.watchUrl}
        onChange={handleChange('watchUrl')}
        error={errors.watchUrl}
        placeholder="https://..."
      />
      <button
        type="submit"
        className="min-h-11 rounded-lg bg-sky-400 px-4 font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Criar cena
      </button>
    </form>
  )
}

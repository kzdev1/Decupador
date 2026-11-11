import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { SelectField } from '../SelectField/SelectField'
import { TextField } from '../TextField/TextField'
import { parseDuration, validateShot } from '../../lib/validation'
import type { ShotFormErrors, ShotFormValues } from '../../lib/validation'
import { CAMERA_MOVEMENTS, SHOT_TYPES } from '../../types/scene'
import type { CameraMovement, Shot, ShotType } from '../../types/scene'
import { CAMERA_MOVEMENT_LABELS, SHOT_TYPE_LABELS } from './labels'

interface ShotFormProps {
  onSubmit: (shot: Omit<Shot, 'id'>) => void
  initialShot?: Shot
  onCancel?: () => void
}

const EMPTY_VALUES: ShotFormValues = {
  duration: '',
  type: 'medio',
  movement: 'fixa',
  color: '#808080',
}

const SHOT_TYPE_OPTIONS = SHOT_TYPES.map((value) => ({
  value,
  label: SHOT_TYPE_LABELS[value],
}))

const MOVEMENT_OPTIONS = CAMERA_MOVEMENTS.map((value) => ({
  value,
  label: CAMERA_MOVEMENT_LABELS[value],
}))

/** Converte um plano salvo nos valores de texto que o formulário usa. */
function toFormValues(shot: Shot): ShotFormValues {
  return {
    duration: String(shot.duration).replace('.', ','),
    type: shot.type,
    movement: shot.movement,
    color: shot.color,
  }
}

/**
 * Formulário para anotar ou editar um plano.
 * Com initialShot abre preenchido (modo edição); sem ele, abre vazio (modo novo).
 * Os valores iniciais só valem na primeira vez: para trocar de plano, quem usa
 * o componente deve mudar a prop key.
 */
export function ShotForm({ onSubmit, initialShot, onCancel }: ShotFormProps) {
  const isEditing = initialShot !== undefined
  const [values, setValues] = useState<ShotFormValues>(
    initialShot ? toFormValues(initialShot) : EMPTY_VALUES,
  )
  const [errors, setErrors] = useState<ShotFormErrors>({})

  function handleChange(field: 'duration' | 'color') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const foundErrors = validateShot(values)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    onSubmit({
      duration: parseDuration(values.duration),
      type: values.type,
      movement: values.movement,
      color: values.color,
    })
    if (!isEditing) setValues(EMPTY_VALUES)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        id="duration"
        label="Duração (segundos)"
        inputMode="decimal"
        value={values.duration}
        onChange={handleChange('duration')}
        error={errors.duration}
        placeholder="Ex.: 2,5"
        required
      />
      <SelectField
        id="type"
        label="Tipo de plano"
        value={values.type}
        options={SHOT_TYPE_OPTIONS}
        onChange={(event) =>
          setValues((current) => ({
            ...current,
            type: event.target.value as ShotType,
          }))
        }
      />
      <SelectField
        id="movement"
        label="Movimento de câmera"
        value={values.movement}
        options={MOVEMENT_OPTIONS}
        onChange={(event) =>
          setValues((current) => ({
            ...current,
            movement: event.target.value as CameraMovement,
          }))
        }
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="color" className="text-sm font-medium">
          Cor dominante
        </label>
        <input
          id="color"
          name="color"
          type="color"
          value={values.color}
          onChange={handleChange('color')}
          className="h-11 w-full cursor-pointer rounded-lg border border-zinc-600 bg-zinc-800 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="min-h-11 flex-1 rounded-lg bg-sky-400 px-4 font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isEditing ? 'Salvar alterações' : 'Adicionar plano'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-lg border border-zinc-500 px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
import type { ChangeEvent } from 'react'

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: 'text' | 'url'
  inputMode?: 'text' | 'decimal'
  placeholder?: string
  required?: boolean
}

/** Campo de texto com rótulo e mensagem de erro associados para leitores de tela. */
export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  inputMode,
  placeholder,
  required = false,
}: TextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="min-h-11 w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 text-base text-white placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 aria-[invalid=true]:border-red-400"
      />
      {error && (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

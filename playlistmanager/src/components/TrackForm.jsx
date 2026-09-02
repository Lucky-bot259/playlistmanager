import { useState } from 'react'
import { GENRES, ROLES, BPM_MIN, BPM_MAX, TITLE_MIN_LENGTH } from '../data/constants.js'

const EMPTY_FORM = {
  title: '',
  genre: '',
  artist: '',
  bpm: '',
  label: '',
  role: '',
}

function validate(form) {
  const errors = {}

  if (!form.title.trim()) {
    errors.title = 'Track title is required.'
  } else if (form.title.trim().length < TITLE_MIN_LENGTH) {
    errors.title = `Title needs at least ${TITLE_MIN_LENGTH} characters.`
  }

  if (!form.genre) {
    errors.genre = 'Pick a genre.'
  }

  if (!form.artist.trim()) {
    errors.artist = 'Artist name is required.'
  }

  if (form.bpm === '') {
    errors.bpm = 'Rating/BPM is required.'
  } else {
    const num = Number(form.bpm)
    if (Number.isNaN(num) || !Number.isInteger(num)) {
      errors.bpm = 'Enter a whole number.'
    } else if (num < BPM_MIN || num > BPM_MAX) {
      errors.bpm = `Must be between ${BPM_MIN} and ${BPM_MAX}.`
    }
  }

  if (!form.label.trim()) {
    errors.label = 'Record label name is required.'
  }

  if (!form.role) {
    errors.role = 'Select a user role.'
  }

  return errors
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="font-display text-xs tracking-wide text-paper-dim">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-rose">{error}</p>}
    </label>
  )
}

const inputClasses = (hasError) =>
  [
    'w-full rounded-md bg-ink-soft border px-3 py-2 text-sm text-paper',
    'placeholder:text-paper-dim/50 outline-none transition-colors',
    'focus:border-gold',
    hasError ? 'border-rose' : 'border-white/10',
  ].join(' ')

export default function TrackForm({ onAddTrack }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onAddTrack({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      genre: form.genre,
      artist: form.artist.trim(),
      bpm: Number(form.bpm),
      label: form.label.trim(),
      role: form.role,
    })

    setForm(EMPTY_FORM)
    setErrors({})
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="mb-6">
        <h2 className="font-display text-lg text-paper">Register a track</h2>
        <p className="mt-1 text-sm text-paper-dim">
          Fill in the details below. Every field is required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Field label="Track title" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={update('title')}
              placeholder="Midnight City"
              className={inputClasses(errors.title)}
            />
          </Field>
        </div>

        <Field label="Genre" error={errors.genre}>
          <select
            value={form.genre}
            onChange={update('genre')}
            className={inputClasses(errors.genre)}
          >
            <option value="">Select genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Artist name" error={errors.artist}>
          <input
            type="text"
            value={form.artist}
            onChange={update('artist')}
            placeholder="M83"
            className={inputClasses(errors.artist)}
          />
        </Field>

        <Field label={`Rating / BPM (${BPM_MIN}\u2013${BPM_MAX})`} error={errors.bpm}>
          <input
            type="number"
            value={form.bpm}
            onChange={update('bpm')}
            placeholder="105"
            min={BPM_MIN}
            max={BPM_MAX}
            className={inputClasses(errors.bpm)}
          />
        </Field>

        <Field label="Record label name" error={errors.label}>
          <input
            type="text"
            value={form.label}
            onChange={update('label')}
            placeholder="Because Music"
            className={inputClasses(errors.label)}
          />
        </Field>

        <div className="sm:col-span-2">
          <span className="font-display text-xs tracking-wide text-paper-dim">User role</span>
          <div className="mt-2 flex gap-6">
            {ROLES.map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm text-paper cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={form.role === r}
                  onChange={update('role')}
                  className="accent-gold h-4 w-4"
                />
                {r}
              </label>
            ))}
          </div>
          {errors.role && <p className="mt-1 text-xs text-rose">{errors.role}</p>}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4">
        <button
          type="submit"
          className="rounded-md bg-gold px-5 py-2.5 text-sm font-display text-ink hover:bg-gold-soft transition-colors cursor-pointer"
        >
          Add to registry
        </button>
        {submitted && <span className="text-sm text-teal">Track added.</span>}
      </div>
    </form>
  )
}
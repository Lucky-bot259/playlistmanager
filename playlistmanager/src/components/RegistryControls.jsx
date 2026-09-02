import { ROLES } from '../data/constants.js'

const ROLE_OPTIONS = ['All', ...ROLES]

export default function RegistryControls({
  roleFilter,
  onChangeRoleFilter,
  highlightTop,
  onToggleHighlightTop,
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {ROLE_OPTIONS.map((option) => {
          const active = roleFilter === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChangeRoleFilter(option)}
              className={[
                'rounded-full px-3.5 py-1.5 text-xs font-display border transition-colors cursor-pointer',
                active
                  ? 'bg-gold text-ink border-gold'
                  : 'border-white/15 text-paper-dim hover:border-white/40 hover:text-paper',
              ].join(' ')}
            >
              {option}
            </button>
          )
        })}
      </div>

      <label className="flex items-center gap-2 text-xs font-display text-paper-dim cursor-pointer select-none">
        <input
          type="checkbox"
          checked={highlightTop}
          onChange={(e) => onToggleHighlightTop(e.target.checked)}
          className="accent-teal h-4 w-4"
        />
        Highlight rating 80+
      </label>
    </div>
  )
}
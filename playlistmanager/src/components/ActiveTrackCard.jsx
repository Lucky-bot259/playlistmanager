import { useEffect, useState } from 'react'

const ROLE_BADGE_STYLES = {
  Creator: 'bg-gold/15 text-gold border-gold/30',
  Listener: 'bg-teal/15 text-teal border-teal/30',
}

export default function ActiveTrackCard({ tracks, selectedId }) {
  const [activeTrack, setActiveTrack] = useState(null)

  useEffect(() => {
    if (selectedId == null) {
      setActiveTrack(null)
      return
    }
    const match = tracks.find((t) => t.id === selectedId) ?? null
    setActiveTrack(match)
  }, [selectedId, tracks])

  return (
    <aside className="rounded-md border border-white/10 bg-ink-soft p-5 lg:sticky lg:top-6">
      <h3 className="font-display text-xs tracking-wide text-paper-dim">Active item</h3>

      {!activeTrack ? (
        <p className="mt-3 text-sm text-paper-dim">
          Select a row in the table to see its full profile here.
        </p>
      ) : (
        <div className="mt-3">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-lg text-paper leading-tight">{activeTrack.title}</h4>
            <span
              className={[
                'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-display',
                ROLE_BADGE_STYLES[activeTrack.role] ?? 'border-white/20 text-paper-dim',
              ].join(' ')}
            >
              {activeTrack.role}
            </span>
          </div>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-paper-dim">Artist</dt>
              <dd className="text-paper text-right">{activeTrack.artist}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-paper-dim">Genre</dt>
              <dd className="text-paper text-right">{activeTrack.genre}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-paper-dim">Rating / BPM</dt>
              <dd className="text-paper text-right">{activeTrack.bpm}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-paper-dim">Record label</dt>
              <dd className="text-paper text-right">{activeTrack.label}</dd>
            </div>
          </dl>
        </div>
      )}
    </aside>
  )
}
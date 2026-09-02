export default function Header({ view, onChangeView, trackCount }) {
  const tabs = [
    { id: 'form', label: 'Add track' },
    { id: 'registry', label: `Registry${trackCount ? ` (${trackCount})` : ''}` },
  ]

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <div className="flex items-baseline justify-between gap-6 flex-wrap">
          <h1 className="font-display text-2xl tracking-tight text-paper">
            trackbook<span className="text-gold">.</span>
          </h1>
          <p className="text-sm text-paper-dim font-body max-w-xs text-right">
            A running log of tracks, artists and the people who put them there.
          </p>
        </div>

        <nav className="mt-8 flex gap-8">
          {tabs.map((tab) => {
            const active = view === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeView(tab.id)}
                className={[
                  'font-display text-sm pb-3 border-b-2 transition-colors cursor-pointer',
                  active
                    ? 'text-paper border-gold'
                    : 'text-paper-dim border-transparent hover:text-paper hover:border-white/20',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import TrackForm from './components/TrackForm.jsx'
import TrackTable from './components/TrackTable.jsx'
import ActiveTrackCard from './components/ActiveTrackCard.jsx'
import RegistryControls from './components/RegistryControls.jsx'

export default function App() {
  const [view, setView] = useState('form')
  const [tracks, setTracks] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [roleFilter, setRoleFilter] = useState('All')
  const [highlightTop, setHighlightTop] = useState(false)

  const handleAddTrack = (track) => {
    setTracks((prev) => [...prev, track])
    setView('registry')
  }

  const visibleTracks = useMemo(() => {
    if (roleFilter === 'All') return tracks
    return tracks.filter((t) => t.role === roleFilter)
  }, [tracks, roleFilter])

  return (
    <div className="min-h-screen bg-ink">
      <Header view={view} onChangeView={setView} trackCount={tracks.length} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {view === 'form' ? (
          <TrackForm onAddTrack={handleAddTrack} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div>
              <RegistryControls
                roleFilter={roleFilter}
                onChangeRoleFilter={setRoleFilter}
                highlightTop={highlightTop}
                onToggleHighlightTop={setHighlightTop}
              />
              <TrackTable
                tracks={visibleTracks}
                selectedId={selectedId}
                onSelectRow={setSelectedId}
                highlightTop={highlightTop}
              />
            </div>
            <ActiveTrackCard tracks={tracks} selectedId={selectedId} />
          </div>
        )}
      </main>
    </div>
  )
}
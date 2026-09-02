import { useState } from 'react'
import Header from './components/Header.jsx'
import TrackForm from './components/TrackForm.jsx'
import TrackTable from './components/TrackTable.jsx'

export default function App() {
  const [view, setView] = useState('form')
  const [tracks, setTracks] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  const handleAddTrack = (track) => {
    setTracks((prev) => [...prev, track])
    setView('registry')
  }

  return (
    <div className="min-h-screen bg-ink">
      <Header view={view} onChangeView={setView} trackCount={tracks.length} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {view === 'form' ? (
          <TrackForm onAddTrack={handleAddTrack} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <TrackTable tracks={tracks} selectedId={selectedId} onSelectRow={setSelectedId} />
            <p className="text-paper-dim font-body text-sm">Detail card goes here.</p>
          </div>
        )}
      </main>
    </div>
  )
}
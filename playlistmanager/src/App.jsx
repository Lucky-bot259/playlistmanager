import { useState } from 'react'
import Header from './components/Header.jsx'
import TrackForm from './components/TrackForm.jsx'

export default function App() {
  const [view, setView] = useState('form')
  const [tracks, setTracks] = useState([])

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
          <p className="text-paper-dim font-body text-sm">
            Registry table goes here.
          </p>
        )}
      </main>
    </div>
  )
}
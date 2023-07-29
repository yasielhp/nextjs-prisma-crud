'use client'

import { useEffect } from 'react'
import { useNotes } from './hook/useNotes'
import NoteForm from '@/components/NoteForm'
import NoteCard from '@/components/NoteCard'

export default function HomePage (): React.ReactElement {
  const { notes, loadNotes } = useNotes()

  useEffect(() => {
    void loadNotes()
  }, [loadNotes])

  return (
    <div className='flex items-center justify-center h-screen px-4'>
      <div>
        <NoteForm />
        {notes.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  )
}

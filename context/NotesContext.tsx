'use client'
import { CreateNote, UpdateNote } from '@/interfaces/Note'
import { FC, ReactNode, createContext, useState } from 'react'
import { Note } from '@prisma/client'

interface MyProps {
  children?: ReactNode
}

export const NoteContext = createContext<{
  notes: Note[]
  loadNotes: () => Promise<void>
  createNotes: (note: CreateNote) => Promise<void>
  deleteNote: (id: number) => Promise<void>
  selectedNote: Note | null
  setSelectedNote: (note: Note | null) => void
  updateNote: (id: number, note: UpdateNote) => Promise<void>
}>({
      notes: [],
      loadNotes: async () => {},
      createNotes: async (note: CreateNote) => {},
      deleteNote: async (id: number) => {},
      selectedNote: null,
      setSelectedNote: (note: Note | null) => {},
      updateNote: async (id: number, note: UpdateNote) => {}
    })

export const NotesProvider: FC<MyProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  async function loadNotes (): Promise<void> {
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  async function createNotes (note: CreateNote): Promise<void> {
    const res = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newNote = await res.json()
    setNotes([...notes, newNote])
  }

  async function deleteNote (id: number): Promise<void> {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      await res.json()

      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      console.error('An error occurred while deleting the note', error)
    }
  }

  async function updateNote (id: number, note: UpdateNote): Promise<void> {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    setNotes(notes.map(note => note.id === id ? data : note))
  }

  return (
    <NoteContext.Provider value={{
      notes,
      loadNotes,
      createNotes,
      deleteNote,
      selectedNote,
      setSelectedNote,
      updateNote
    }}
    >
      {children}
    </NoteContext.Provider>
  )
}

import { NoteContext } from '@/context/NotesContext'
import { NoteContextType } from '@/interfaces/Note'
import { useContext } from 'react'

export function useNotes (): NoteContextType {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}

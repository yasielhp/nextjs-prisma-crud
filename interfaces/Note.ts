import { Note } from '@prisma/client'

export interface Params {
  params: { id: string }
}

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateNote = Partial<CreateNote>

export interface NoteContextType {
  loadNotes: () => Promise<void>
  deleteNote: (id: number) => Promise<void>
  notes: Note[]
  createNotes: (note: CreateNote) => Promise<void>
  selectedNote: Note | null
  setSelectedNote: (note: Note | null) => void
  updateNote: (id: number, data: UpdateNote) => Promise<void>
}

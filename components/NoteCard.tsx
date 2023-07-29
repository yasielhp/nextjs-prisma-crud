import { useNotes } from '@/app/hook/useNotes'
import { Note } from '@prisma/client'
import { ReactElement } from 'react'
export default function NoteCard ({ note }: { note: Note }): ReactElement {
  const { deleteNote, setSelectedNote } = useNotes()

  const FormateDate = (date: Date): string => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div key={note.id} className='bg-slate-400 my-2 rounded-md p-2 flex justify-between'>
      <div>
        <h2 className='text-slate-800 font-bold text-xl'>{note.title}</h2>
        <p className='text-slate-700'>{note.content}</p>
        <p className='text-xs text-slate-500'>{FormateDate(note.createdAt)}</p>
      </div>
      <div className='flex gap-x-2'>
        <button
          className='bg-slate-500 text-white px-2 py-1 rounded-md'
          onClick={
             () => {
               if (confirm('Are you sure to delete this note?')) {
                 void deleteNote(Number(note.id))
               }
             }
            }
        >Delete
        </button>
        <button className='bg-slate-500 text-white px-2 py-1 rounded-md' onClick={() => setSelectedNote(note)}>Edit</button>
      </div>
    </div>
  )
}

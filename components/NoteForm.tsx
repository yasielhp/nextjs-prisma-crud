'use client'
import { useNotes } from '@/app/hook/useNotes'
import { useState, useRef, useEffect, ReactElement } from 'react'

export default function NoteForm (): ReactElement {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  const { createNotes, selectedNote, setSelectedNote, updateNote } = useNotes()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const submitFunction = async (): Promise<void> => {
      try {
        if (selectedNote != null) {
          await updateNote(Number(selectedNote.id), { title, content })
          setSelectedNote(null)
        } else {
          await createNotes({
            title, content
          })
        }
        setTitle('')
        setContent('')
        titleRef.current?.focus()
      } catch (err) {
        console.log(err)
      }
    }
    void submitFunction()
  }

  useEffect(() => {
    if (selectedNote != null) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content ?? '')
    }
  }, [selectedNote])

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={title}
        autoFocus
        placeholder='Title'
        className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />
      <textarea
        name='content'
        value={content}
        placeholder='Content'
        className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='flex justify-end gap-x-4'>
        <button
          type='submit'
          className='w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 my-2 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={title === '' || content === ''}
        >{(selectedNote != null) ? 'Update' : 'Create'}
        </button>
        {(selectedNote != null) &&
          <button
            type='button'
            className='w-full px-4 py-2 text-white bg-slate-600 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 my-2'
            onClick={() => {
              setSelectedNote(null)
              setTitle('')
              setContent('')
            }}
          >
            Cancel
          </button>}
      </div>
    </form>
  )
}

import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/libs/prisma'
import { Params } from '@/interfaces/Note'

export async function GET (request: Request, { params }: Params): Promise<NextResponse> {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: Number(params.id)
      }
    })
    if (note == null) {
      return NextResponse.json({
        message: 'Note not found'
      }, {
        status: 404
      })
    }
    return NextResponse.json(note)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    } else {
      // Handle all other errors
      return NextResponse.json({
        message: 'An unexpected error occurred'
      }, {
        status: 500
      })
    }
  }
}

export async function DELETE (request: Request, { params }: Params): Promise<NextResponse> {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: Number(params.id)
      }
    })
    if (deleteNote == null) {
      return NextResponse.json({
        message: 'Note not found'
      }, {
        status: 404
      })
    }
    return NextResponse.json(deleteNote)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          message: 'Note not found'
        }, {
          status: 404
        })
      }
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    } else {
      // Handle all other errors
      return NextResponse.json({
        message: 'An unexpected error occurred'
      }, {
        status: 500
      })
    }
  }
}

export async function PUT (request: Request, { params }: Params): Promise<NextResponse> {
  try {
    const { title, content } = await request.json()
    const updateNote = await prisma.note.update({
      where: {
        id: Number(params.id)
      },
      data: {
        title,
        content
      }
    })

    return NextResponse.json(updateNote)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          message: 'Note not found'
        }, {
          status: 404
        })
      }
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      })
    } else {
      // Handle all other errors
      return NextResponse.json({
        message: 'An unexpected error occurred'
      }, {
        status: 500
      })
    }
  }
}

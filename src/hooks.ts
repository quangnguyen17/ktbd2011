import React from 'react'
import axios from 'axios'
import { dataSource } from './dataSource'

export type Chapter = Record<string, any>
export type Book = { title: string; chapters: Array<Chapter> }

export const getBook = async (filePath: string): Promise<Book> => {
  const key = encodeURIComponent(filePath)
  const book: Book = { title: '', chapters: [] }
  const { data } = await axios.get<Chapter>(
    `https://storage.googleapis.com/bd2011-d9afc.appspot.com/${key}`
  )
  for (let [title, chapters] of Object.entries(data)) {
    book.title = title
    book.chapters = chapters
  }
  return book
}

export type Testament = keyof typeof dataSource

export const getTestament = (testament: Testament) =>
  Promise.all(dataSource[testament].map((filePath) => getBook(filePath)))

export const useNewTestament = (): Book[] => {
  const [books, setBooks] = React.useState<Array<Book>>([])
  React.useEffect(() => {
    getTestament('new-testament').then((data) => setBooks(data))
  }, [])
  return books
}

export const useOldTestament = (): Book[] => {
  const [books, setBooks] = React.useState<Array<Book>>([])
  React.useEffect(() => {
    getTestament('old-testament').then((t) => setBooks(t))
  }, [])
  return books
}

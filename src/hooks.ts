import React from 'react'
import axios from 'axios'

export type Chapter = Record<string, any>
export type Book = { title: string; chapters: Array<Chapter> }

export const getBook = async (filePath: string): Promise<Book> => {
  const key = encodeURIComponent(filePath)
  const cached = sessionStorage.getItem(key)
  if (cached) return JSON.parse(cached) as Book
  const book: Book = { title: '', chapters: [] }
  const { data } = await axios.get<Chapter>(
    `https://storage.googleapis.com/bd2011-d9afc.appspot.com/${key}`
  )
  for (let [title, chapters] of Object.entries(data)) {
    book.title = title
    book.chapters = chapters
  }
  sessionStorage.setItem(key, JSON.stringify(book))
  return book
}

export const useBook = (filePath: string) => {
  const [book, setBook] = React.useState<Book>({ title: '', chapters: [] })
  React.useEffect(() => {
    getBook(filePath).then((b) => setBook(b))
  }, [filePath])
  return book
}

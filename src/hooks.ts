import { useState, useEffect } from 'react'
import axios from 'axios'

export type TestamentName = 'old-testament' | 'new-testament'
export type Chapter = Record<string, any>

export const getBook = async (filePath: string) => {
  let title: string = ''
  let chapters: Array<Chapter> = []
  const { data } = await axios.get<Chapter>(
    `https://storage.googleapis.com/bd2011-d9afc.appspot.com/${encodeURIComponent(filePath)}`
  )
  for (let [bTitle, bChapters] of Object.entries(data)) {
    title = bTitle
    chapters = bChapters
  }
  return { title, chapters }
}

export const useBook = (filePath: string) => {
  const [title, setTitle] = useState('')
  const [chapters, setChapters] = useState<Array<Chapter>>([])
  useEffect(() => {
    getBook(filePath).then((data) => {
      setTitle(data.title)
      setChapters(data.chapters)
    })
  }, [filePath])
  return { title, chapters }
}

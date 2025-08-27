import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { dataSource } from './dataSource'

const STORAGE_BASE_URL = `https://storage.googleapis.com/bd2011-d9afc.appspot.com/:filePath`

export type Chapter = Record<string, any>
export type Book = { title: string; chapters: Array<Chapter> }

// Query keys for type-safety and reusability
export const QueryKeys = {
  book: (filePath: string) => ['book', filePath] as const,
  testament: (testament: Testament) => ['testament', testament] as const,
} as const

const fetchBook = async (filePath: string): Promise<Book> => {
  const { data } = await axios.get<Chapter>(
    STORAGE_BASE_URL.replace(':filePath', encodeURIComponent(filePath))
  )
  const [title, chapters] = Object.entries(data)[0]
  return { title, chapters }
}

const fetchTestament = async (testament: Testament): Promise<Book[]> => {
  return Promise.all(dataSource[testament].map((filePath) => fetchBook(filePath)))
}

export type Testament = keyof typeof dataSource

export const useBook = (filePath: string) => {
  return useQuery({
    queryKey: QueryKeys.book(filePath),
    queryFn: () => fetchBook(filePath),
  })
}

export const useNewTestament = () => {
  return useQuery({
    queryKey: QueryKeys.testament('new-testament'),
    queryFn: () => fetchTestament('new-testament'),
  })
}

export const useOldTestament = () => {
  return useQuery({
    queryKey: QueryKeys.testament('old-testament'),
    queryFn: () => fetchTestament('old-testament'),
  })
}

// Prefetching utilities
export const usePrefetch = () => {
  const queryClient = useQueryClient()

  return {
    prefetchBook: (filePath: string) => {
      return queryClient.prefetchQuery({
        queryKey: QueryKeys.book(filePath),
        queryFn: () => fetchBook(filePath),
      })
    },
    prefetchTestament: (testament: Testament) => {
      return queryClient.prefetchQuery({
        queryKey: QueryKeys.testament(testament),
        queryFn: () => fetchTestament(testament),
      })
    },
  }
}

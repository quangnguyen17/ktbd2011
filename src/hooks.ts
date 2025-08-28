import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { dataSource } from './dataSource'

const STORAGE_BASE_URL = `https://storage.googleapis.com/bd2011-d9afc.appspot.com`

export type Chapter = Record<string, any>
export type BookContent = { title: string; chapters: Array<Chapter> }

const fetchBookContent = async (testamentId: string, filename: string): Promise<BookContent> => {
  const { data } = await axios.get<Chapter>(
    `${STORAGE_BASE_URL}/${testamentId}/${filename}`,
    { timeout: 5000 } // 5 second timeout
  )
  const [title, chapters] = Object.entries(data)[0]
  return { title, chapters }
}

export const useBook = (testamentId: string, filename: string) => {
  return useQuery({
    queryKey: ['book', testamentId, filename],
    queryFn: () => fetchBookContent(testamentId, filename),
  })
}

export const useOldTestament = () => dataSource[0]
export const useNewTestament = () => dataSource[1]

// Hook to monitor online/offline status
export const useOnlineStatus = () => {
  return useQuery({
    queryKey: ['online'],
    queryFn: () => navigator.onLine,
    refetchInterval: 10000, // Check every 10 seconds
  })
}

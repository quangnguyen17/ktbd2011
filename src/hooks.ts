import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { dataSource } from './dataSource'
import { LocalStorage } from './storage'

const STORAGE_BASE_URL = `https://storage.googleapis.com/bd2011-d9afc.appspot.com`
const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes in milliseconds

export type Chapter = Record<string, any>
export type BookContent = { title: string; chapters: Array<Chapter> }

const fetchBookContent = async (testamentId: string, filename: string): Promise<BookContent> => {
  // Always check local storage first
  const cachedEntry = LocalStorage.getBook(testamentId, filename)
  const hasValidCache = cachedEntry && LocalStorage.isCacheValid(cachedEntry.timestamp)

  try {
    if (!navigator.onLine) {
      if (cachedEntry) {
        return cachedEntry.content
      }
      throw new Error('Offline and no cached data available')
    }

    // If online, fetch fresh data from network
    const { data } = await axios.get<Chapter>(
      `${STORAGE_BASE_URL}/${testamentId}/${filename}`,
      { timeout: 5000 } // 5 second timeout
    )
    const [title, chapters] = Object.entries(data)[0]
    const content = { title, chapters }

    // Store in local storage for offline use
    LocalStorage.setBook(testamentId, filename, content)

    return content
  } catch (error) {
    // If network request fails but we have cached data, use it
    if (cachedEntry) {
      console.warn('Using cached data due to network error')
      return cachedEntry.content
    }
    throw error
  }
}

export const useBook = (testamentId: string, filename: string) => {
  return useQuery({
    queryKey: ['book', testamentId, filename],
    queryFn: () => fetchBookContent(testamentId, filename),
    staleTime: REFRESH_INTERVAL,
    gcTime: Infinity,
    refetchInterval: REFRESH_INTERVAL,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
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

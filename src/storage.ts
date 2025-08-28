import { BookContent } from './hooks'

const STORAGE_KEY_PREFIX = 'ktbd2011'
const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes in milliseconds

export class LocalStorage {
  static getBookKey(testamentId: string, filename: string): string {
    return `${STORAGE_KEY_PREFIX}:${testamentId}:${filename}`
  }

  static getBook(
    testamentId: string,
    filename: string
  ): { content: BookContent; timestamp: number } | null {
    const key = this.getBookKey(testamentId, filename)
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  static setBook(testamentId: string, filename: string, content: BookContent): void {
    const key = this.getBookKey(testamentId, filename)
    const data = {
      content,
      timestamp: Date.now(),
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  static isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_EXPIRY
  }
}

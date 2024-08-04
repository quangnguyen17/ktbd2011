import Books from './Books'
import { useOldTestament } from './hooks'

export const OldTestament = () => {
  const books = useOldTestament()
  return <Books books={books} />
}

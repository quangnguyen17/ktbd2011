import Books from './Books'
import { useNewTestament } from './hooks'

export const NewTestament = () => {
  const books = useNewTestament()
  return <Books books={books} />
}

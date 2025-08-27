import { Books } from './Books'
import { useNewTestament } from './hooks'

export const NewTestament = () => {
  const { data } = useNewTestament()
  if (!data) return null
  return <Books books={data} />
}

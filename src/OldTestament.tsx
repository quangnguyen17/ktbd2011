import { Books } from './Books'
import { useOldTestament } from './hooks'

export const OldTestament = () => {
  const { data } = useOldTestament()
  if (!data) return null
  return <Books books={data} />
}

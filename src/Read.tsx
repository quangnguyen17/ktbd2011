import Accordion from 'react-bootstrap/Accordion'
import { Chapter, useBook, useOldTestament, useNewTestament } from './hooks'
import type { Book } from './dataSource'

const renderParagraphs = (paragraph: Chapter[], paragraphIndex: number) => (
  <div key={paragraphIndex}>
    {Object.entries(paragraph).map(([key, val], chapterIndex) => (
      <div key={chapterIndex}>
        <h5 style={{ marginBottom: '0.75rem' }}>{key}</h5>
        <p style={{ marginBottom: '0' }}>{val as unknown as string}</p>
      </div>
    ))}
  </div>
)

const Chapters = ({ testamentId, book }: { testamentId: string; book: Book }) => {
  const { data } = useBook(testamentId, book.filename)
  if (!data) return null
  return (
    <Accordion flush>
      {data.chapters.map((data: Chapter, index: number) => {
        const count = index + 1
        const chapter: Array<Chapter[]> = data[count]
        return (
          <Accordion.Item key={index} eventKey={index.toString()} style={{ borderRadius: 0 }}>
            <Accordion.Header className="fw-bold">
              <span>Chương {count}</span>
            </Accordion.Header>
            <Accordion.Body className="m-0 p-3 bg-light">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {chapter.map(renderParagraphs)}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export const Read = () => {
  const oldTestament = useOldTestament()
  const newTestament = useNewTestament()
  return (
    <Accordion>
      {oldTestament.books.map((book: Book, index: number) => {
        return (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{book.name}</Accordion.Header>
            <Accordion.Body className="m-0 p-0">
              <Chapters testamentId={oldTestament.id} book={book} />
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
      {newTestament.books.map((book: Book, index: number) => {
        return (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{book.name}</Accordion.Header>
            <Accordion.Body className="m-0 p-0">
              <Chapters testamentId={newTestament.id} book={book} />
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

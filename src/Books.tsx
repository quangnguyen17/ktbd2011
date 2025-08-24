import { Accordion } from 'react-bootstrap'
import { Book, Chapter } from './hooks'

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

const renderChapter = (data: Chapter, index: number) => {
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
}

export const Books = ({ books }: { books: Book[] }) => (
  <Accordion>
    {books.map((book: Book, index: number) => {
      return (
        <Accordion.Item key={index} eventKey={index.toString()} style={{ borderRadius: 0 }}>
          <Accordion.Header>{book.title}</Accordion.Header>
          <Accordion.Body className="m-0 p-0">
            <Accordion flush>{book.chapters.map(renderChapter)}</Accordion>
          </Accordion.Body>
        </Accordion.Item>
      )
    })}
  </Accordion>
)

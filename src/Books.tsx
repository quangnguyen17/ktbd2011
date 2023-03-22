import { Accordion } from 'react-bootstrap'
import { Book, Chapter } from './hooks'

const generateComponentKey = () => Math.round(Math.random() * 10000).toString()

export default function Books({ books }: { books: Book[] }): JSX.Element {
  const renderParagraphs = (paragraph: Chapter[]) => {
    const key = generateComponentKey()
    return (
      <div key={key}>
        {Object.entries(paragraph).map(([key, val], verseIdx) => (
          <div key={verseIdx}>
            <h5 style={{ marginBottom: '0.75rem' }}>{key}</h5>
            <p style={{ marginBottom: '0' }}>{val}</p>
          </div>
        ))}
      </div>
    )
  }

  const renderChapter = (data: Chapter, index: number) => {
    const count = index + 1
    const chapter: Array<Chapter[]> = data[count]
    const key = generateComponentKey()
    return (
      <Accordion.Item key={key} eventKey={key} style={{ borderRadius: 0 }}>
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

  const renderBook = (book: Book) => {
    const key = generateComponentKey()
    return (
      <Accordion.Item key={key} eventKey={key} style={{ borderRadius: 0 }}>
        <Accordion.Header>{book.title}</Accordion.Header>
        <Accordion.Body className="m-0 p-0">
          <Accordion flush>{book.chapters.map(renderChapter)}</Accordion>
        </Accordion.Body>
      </Accordion.Item>
    )
  }

  return <Accordion>{books.map(renderBook)}</Accordion>
}

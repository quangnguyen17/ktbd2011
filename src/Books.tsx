import React from 'react'
import { Accordion } from 'react-bootstrap'
import { Book, Chapter } from './hooks'

type ParagraphsProps = { chapter: Array<Chapter> }
const Paragraphs: React.FC<ParagraphsProps> = ({ chapter }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {chapter.map((paragraph, idx) => (
      <div key={idx}>
        {Object.entries(paragraph).map(([key, val], idx) => (
          <div key={idx}>
            <h5 style={{ marginBottom: '0.75rem' }}>{key}</h5>
            <p style={{ marginBottom: '0' }}>{val}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default function Books({ books }: { books: Book[] }): JSX.Element {
  return (
    <Accordion>
      {books.map((book, index) => (
        <Accordion.Item key={index} eventKey={index.toString()} style={{ borderRadius: 0 }}>
          <Accordion.Header>{book.title}</Accordion.Header>
          <Accordion.Body className="m-0 p-0">
            <Accordion flush>
              {book.chapters.map((chapter, idx) => (
                <Accordion.Item key={idx} eventKey={idx.toString()} style={{ borderRadius: 0 }}>
                  <Accordion.Header className="fw-bold">
                    <span>Chương {idx + 1}</span>
                  </Accordion.Header>
                  <Accordion.Body className="m-0 p-3 bg-light">
                    <Paragraphs chapter={chapter[idx + 1]} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

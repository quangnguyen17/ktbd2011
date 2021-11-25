import React from 'react'
import { Accordion, Spinner } from 'react-bootstrap'
import { Book, Chapter } from './types'

const Paragraphs: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <>
      {chapter.map((paragraph, idx) => (
        <div key={idx} className="pb-3">
          {Object.entries(paragraph).map(([key, val], idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: '1.5rem' }} className="mb-2">
                {key}
              </h3>
              <p style={{ fontSize: '1rem' }} className="mb-0">
                {val}
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const Testament: React.FC<{ name: string; loading: boolean; testament: Book[] }> = ({ name, loading, testament }) => {
  return (
    <div>
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="d-inline mb-0">{name}</h1>
        {loading && <Spinner animation="border" style={{ color: 'rgb(101, 9, 9)' }} />}
      </div>
      {testament.length > 0 && (
        <Accordion className="m-0 p-0">
          {testament.map(({ book, chapters }, idx) => (
            <Accordion.Item key={idx} eventKey={idx.toString()} style={{ borderRadius: 0 }}>
              <Accordion.Header>{book}</Accordion.Header>
              <Accordion.Body className="m-0 p-0">
                <Accordion flush>
                  {chapters.map((chapter, idx) => (
                    <Accordion.Item key={idx} eventKey={idx.toString()} style={{ borderRadius: 0 }}>
                      <Accordion.Header className="fw-bold">Chương {idx + 1}</Accordion.Header>
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
      )}
    </div>
  )
}

export default Testament

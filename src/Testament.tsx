import React from 'react'
import { Accordion } from 'react-bootstrap'
import { TestamentName, useBook } from './hooks'
import { dataSource } from './dataSource'

const Paragraphs: React.FC<{ chapter: Array<Record<string, string>> }> = ({ chapter }) => (
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

const TestamentBook: React.FC<{ index: number; filePath: string }> = ({ index, filePath }) => {
  const { title, chapters } = useBook(filePath)
  return (
    <Accordion.Item eventKey={index.toString()} style={{ borderRadius: 0 }}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className="m-0 p-0">
        <Accordion flush>
          {chapters.map((chapter, idx) => (
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
  )
}

export default function Testament({ testament }: { testament: TestamentName }): JSX.Element {
  const data = dataSource[testament]
  return (
    <Accordion>
      {data.map((filePath, index) => (
        <TestamentBook key={index} index={index} filePath={filePath} />
      ))}
    </Accordion>
  )
}

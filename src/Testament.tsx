import React from 'react'
import axios from 'axios'
import { Accordion } from 'react-bootstrap'
import { useTestament, TestamentName } from './firebase'

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

const TestamentBook: React.FC<{ downloadUrl: string; index: number }> = ({
  downloadUrl,
  index,
}) => {
  const [title, setTitle] = React.useState('')
  const [chapters, setChapters] = React.useState<any[]>([])
  React.useEffect(() => {
    ;(async () => {
      for (let [book, chapters] of Object.entries(
        (await axios.get<Record<string, any[]>>(downloadUrl)).data
      )) {
        setTitle(book)
        setChapters(chapters)
      }
    })()
  }, [downloadUrl])
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

const Testament: React.FC<{ testament: TestamentName }> = ({ testament }) => {
  const books = useTestament(testament)
  return (
    <Accordion>
      {books.map((downloadUrl, index) => (
        <TestamentBook key={index} index={index} downloadUrl={downloadUrl} />
      ))}
    </Accordion>
  )
}
export default Testament

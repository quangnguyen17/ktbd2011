import React from 'react'
import axios from 'axios'
import { Accordion, Spinner } from 'react-bootstrap'
import { Chapter } from './types'
import { useTestament, TestamentName } from './firebase'

const Loader: React.FC = () => (
  <Spinner animation="border" size="sm" style={{ color: 'rgb(101, 9, 9)' }} />
)

const Paragraphs: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
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

const TestamentBook: React.FC<{ downloadUrl: string; index: number }> = ({
  downloadUrl,
  index,
}) => {
  const [loading, setLoading] = React.useState(true)
  const [title, setTitle] = React.useState('')
  const [chapters, setChapters] = React.useState<any[]>([])
  React.useEffect(() => {
    ;(async () => {
      const res = await axios.get<Record<string, any[]>>(downloadUrl)
      for (let [book, chapters] of Object.entries(res.data)) {
        setTitle(book)
        setChapters(chapters)
      }
      setLoading(false)
    })()
  }, [downloadUrl])
  return (
    <Accordion.Item eventKey={index.toString()} style={{ borderRadius: 0 }}>
      <Accordion.Header>
        {title}
        {loading && <Loader />}
      </Accordion.Header>
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

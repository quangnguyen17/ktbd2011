import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import { Chapter, useBook, useOldTestament, useNewTestament } from './hooks'
import type { Book } from './dataSource'
import { useState } from 'react'

const ChapterModal = ({
  title,
  chapter,
  onClose,
}: {
  title: string
  chapter: Chapter[][]
  onClose: () => void
}) => {
  return (
    <div className="ChapterModal">
      <h1 className="Title">{title}</h1>
      <div className="CloseButton">
        <CloseButton onClick={onClose} />
      </div>
      {chapter.map((paragraph: Chapter[], paragraphIndex: number) => (
        <div key={paragraphIndex}>
          {Object.entries(paragraph).map(([key, val], chapterIndex) => (
            <div key={chapterIndex}>
              <h5>{key}</h5>
              <p>{val as unknown as string}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const Chapters = ({ testamentId, book }: { testamentId: string; book: Book }) => {
  const [chapter, setChapter] = useState<Chapter[][] | null>(null)
  const [chapterNumber, setChapterNumber] = useState<number | null>(null)
  const { data } = useBook(testamentId, book.filename)
  if (!data) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', padding: '1rem' }}>
      {data.chapters.map((data: Chapter, index: number) => {
        const count = index + 1
        const chapter: Chapter[][] = data[count]
        return (
          <Button
            key={index}
            variant="light"
            onClick={() => {
              setChapter(chapter)
              setChapterNumber(count)
            }}
          >
            {count}
          </Button>
        )
      })}
      {chapter && (
        <ChapterModal
          title={`${book.name} ${chapterNumber}`}
          chapter={chapter}
          onClose={() => setChapter(null)}
        />
      )}
    </div>
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

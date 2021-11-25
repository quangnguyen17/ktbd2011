import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Navbar, Nav, ListGroup } from 'react-bootstrap'
import Testament from './Testament'
import { getBooks } from './firebase'
import { Book } from './types'

const CuuUoc: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getBooks('old-testament').then((books) => {
      setBooks(books)
      setLoading(false)
    })
  }, [])

  return <Testament name="Cựu Ước" loading={loading} testament={books} />
}

const TanUoc: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getBooks('new-testament').then((books) => {
      setBooks(books)
      setLoading(false)
    })
  }, [])

  return <Testament name="Tân Ước" loading={loading} testament={books} />
}

const AboutBD2011: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Bản Dịch 2011</h1>
      <p>
        Kính chào quý độc giả: Cảm ơn quý vị đã chọn và đọc Kinh Thánh qua Bản Dịch 2011 này. Trước hết chúng tôi xin cảm ơn một số quý đôc
        giả đã cho chúng tôi những lời góp ý rất quý báu. Chúng tôi rất hoan hỉ ghi nhận và tiếp tục cải thiện để bản dịch Kinh Thánh này
        phản ánh được sứ điệp trong nguyên ngữ và dễ hiểu đối với quý vị. Quý vị đang có trong tay ấn bản mới nhất của Bản Dịch 2011. Điều
        chúng tôi rất vui là khi chúng tôi nhận được lời chỉ giáo hoặc thắc mắc của quý vị thì chúng tôi có thể đối chiếu với nguyên tác và
        sửa đổi (nếu cần), và chẳng bao lâu sau đó quý vị có thể thấy sự sửa đổi đó trên dụng cụ điện tử của mình ngay. Cầu xin Chúa dùng
        Bản Dịch Kinh Thánh này làm vui thỏa tâm linh các bạn với Lời hằng sống của Đức Chúa Trời.
        <br />
        <br />
        Nay kính.
        <br />
        Mục sư Đặng Ngọc Báu
        <br />
        kinhthanhbd2011@gmail.com
      </p>
    </div>
  )
}

const SharedNav: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Navbar variant="dark" expand="sm" className="bg-darkRed py-2 px-3">
      <Navbar.Brand onClick={() => navigate('/')}>Kinh Thánh BD2011</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/cuu-uoc')}>Cựu Ước</Nav.Link>
          <Nav.Link onClick={() => navigate('/tan-uoc')}>Tân Ước</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate('/ban-dich-2011')}>Bản Dịch 2011</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '1rem' }}>
      <h1 className="mb-3">Đọc Kinh Thánh</h1>
      <ListGroup style={{ borderRadius: 0 }}>
        <ListGroup.Item action onClick={() => navigate('/cuu-uoc')}>
          Cựu Ước
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => navigate('/tan-uoc')}>
          Tân Ước
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => navigate('/ban-dich-2011')}>
          Bản Dịch 2011
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <>
      <SharedNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tan-uoc" element={<TanUoc />} />
        <Route path="/cuu-uoc" element={<CuuUoc />} />
        <Route path="/ban-dich-2011" element={<AboutBD2011 />} />
      </Routes>
    </>
  )
}

export default App

import { Routes, Route, useNavigate } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Testament from './Testament'
import { useTestament } from './firebase'

const CuuUoc = () => {
  const books = useTestament('old-testament')
  return <Testament books={books} />
}

const TanUoc = () => {
  const books = useTestament('new-testament')
  return <Testament books={books} />
}

const SharedNav = () => {
  const navigate = useNavigate()
  return (
    <Navbar variant="dark" expand="sm" className="bg-darkRed py-2 px-3" fixed="top">
      <Navbar.Brand>
        <Nav.Link onClick={() => navigate('/')}>Kinh Thánh BD2011</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate('/cuu-uoc')}>Cựu Ước</Nav.Link>
          <Nav.Link onClick={() => navigate('/tan-uoc')}>Tân Ước</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const AboutBD2011 = () => (
  <div style={{ padding: '1rem' }}>
    <p>
      Kính chào quý độc giả: Cảm ơn quý vị đã chọn và đọc Kinh Thánh qua Bản Dịch 2011 này. Trước
      hết chúng tôi xin cảm ơn một số quý đôc giả đã cho chúng tôi những lời góp ý rất quý báu.
      Chúng tôi rất hoan hỉ ghi nhận và tiếp tục cải thiện để bản dịch Kinh Thánh này phản ánh được
      sứ điệp trong nguyên ngữ và dễ hiểu đối với quý vị. Quý vị đang có trong tay ấn bản mới nhất
      của Bản Dịch 2011. Điều chúng tôi rất vui là khi chúng tôi nhận được lời chỉ giáo hoặc thắc
      mắc của quý vị thì chúng tôi có thể đối chiếu với nguyên tác và sửa đổi (nếu cần), và chẳng
      bao lâu sau đó quý vị có thể thấy sự sửa đổi đó trên dụng cụ điện tử của mình ngay. Cầu xin
      Chúa dùng Bản Dịch Kinh Thánh này làm vui thỏa tâm linh các bạn với Lời hằng sống của Đức Chúa
      Trời.
      <br />
      <br />
      Nay kính.
      <br />
      MS Đặng Ngọc Báu
      <br />
      kinhthanhbd2011@gmail.com
    </p>
  </div>
)

export default function App() {
  return (
    <>
      <SharedNav />
      <div style={{ height: '56px' }}></div>
      <Routes>
        <Route path="/" element={<AboutBD2011 />} />
        <Route path="/cuu-uoc" element={<CuuUoc />} />
        <Route path="/tan-uoc" element={<TanUoc />} />
      </Routes>
    </>
  )
}

import { Routes, Route } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Testament from './Testament'

const Home = () => (
  <div className="p-3">
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
      <Navbar variant="dark" expand="sm" fixed="top" className="bg-darkRed py-2 px-3">
        <Navbar.Brand>
          <Nav.Link href="/">Kinh Thánh BD2011</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cuu-uoc">Cựu Ước</Nav.Link>
            <Nav.Link href="/tan-uoc">Tân Ước</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: '56px' }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuu-uoc" element={<Testament testament="old-testament" />} />
        <Route path="/tan-uoc" element={<Testament testament="new-testament" />} />
      </Routes>
    </>
  )
}

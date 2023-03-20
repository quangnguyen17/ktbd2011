import React from 'react'
import { Navbar, Nav, Alert, Offcanvas } from 'react-bootstrap'
import Testament, { TestamentProps } from './Testament'

type AboutPageMenuProps = { open: boolean; onClose: () => void }
const AboutPageMenu: React.FC<AboutPageMenuProps> = ({ open, onClose }) => (
  <Offcanvas show={open} onHide={onClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Kinh Thánh BD2011</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body className="pt-0">
      <Alert variant="info" className="rounded-0">
        <p className="mb-0">
          • Nếu các bạn muốn có trên iOS (như là iPhone, iPad,...) thì vui lòng tải xuống và sử dụng{' '}
          <a
            href="https://apps.apple.com/us/app/kinh-th%C3%A1nh-bd2011/id1405782410"
            target="_blank"
            rel="noreferrer"
          >
            Kinh Thánh BD2011
          </a>{' '}
          cho iOS.
        </p>
        <p className="mb-0">
          • Nếu các bạn muốn đọc trong điện thoại Android (như là Samsung, LG, Lenovo,...) thì vui
          lòng tải xuống và sử dụng{' '}
          <a
            href="https://play.google.com/store/apps/details?id=org.kinhthanhbd2011"
            target="_blank"
            rel="noreferrer"
          >
            Kinh Thánh BD2011
          </a>{' '}
          cho Android.
        </p>
      </Alert>
      <p className="mb-0">
        Kính chào quý độc giả: Cảm ơn quý vị đã chọn và đọc Kinh Thánh qua Bản Dịch 2011 này. Trước
        hết chúng tôi xin cảm ơn một số quý đôc giả đã cho chúng tôi những lời góp ý rất quý báu.
        Chúng tôi rất hoan hỉ ghi nhận và tiếp tục cải thiện để bản dịch Kinh Thánh này phản ánh
        được sứ điệp trong nguyên ngữ và dễ hiểu đối với quý vị. Quý vị đang có trong tay ấn bản mới
        nhất của Bản Dịch 2011. Điều chúng tôi rất vui là khi chúng tôi nhận được lời chỉ giáo hoặc
        thắc mắc của quý vị thì chúng tôi có thể đối chiếu với nguyên tác và sửa đổi (nếu cần), và
        chẳng bao lâu sau đó quý vị có thể thấy sự sửa đổi đó trên dụng cụ điện tử của mình ngay.
        Cầu xin Chúa dùng Bản Dịch Kinh Thánh này làm vui thỏa tâm linh các bạn với Lời hằng sống
        của Đức Chúa Trời.
        <br />
        <br />
        Nay kính.
        <br />
        MS Đặng Ngọc Báu
        <br />
        <a href="mailto:kinhthanhbd2011@gmail.com" target="_blank" rel="noreferrer">
          kinhthanhbd2011@gmail.com
        </a>{' '}
        |{' '}
        <a href="https://www.facebook.com/bau.dang" target="_blank" rel="noreferrer">
          Facebook
        </a>
      </p>
    </Offcanvas.Body>
  </Offcanvas>
)

export default function App(): JSX.Element {
  const [showCanvas, setShowCanvas] = React.useState(false)
  const [testament, setTestament] = React.useState<TestamentProps['testament']>('old-testament')
  const openCanvas = () => setShowCanvas(true)
  const closeCanvas = () => setShowCanvas(false)
  const showOldTestament = () => setTestament('old-testament')
  const showNewTestament = () => setTestament('new-testament')
  const showingOldTestament = testament === 'old-testament'
  const showingNewTestament = testament === 'new-testament'
  const showingCanvas = !!showCanvas
  return (
    <>
      <Navbar variant="dark" fixed="top" className="bg-darkRed px-2">
        <Nav className="me-auto">
          <Nav.Link
            onClick={showOldTestament}
            active={showingOldTestament}
            disabled={showingOldTestament}
          >
            Cựu Ước
          </Nav.Link>
          <Nav.Link
            onClick={showNewTestament}
            active={showingNewTestament}
            disabled={showingNewTestament}
          >
            Tân Ước
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link onClick={openCanvas} active={showingCanvas} disabled={showingCanvas}>
            Kinh Thánh BD2011
          </Nav.Link>
        </Nav>
      </Navbar>
      <div style={{ height: '56px' }}></div>
      <Testament testament={testament} />
      <AboutPageMenu open={showCanvas} onClose={closeCanvas} />
    </>
  )
}

import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap'

interface NavigationProps {
  isScrolled: boolean
}

function Navigation({ isScrolled }: NavigationProps) {
  return (
    <Navbar expand="lg" fixed="top" className={`navbar-centered ${isScrolled ? 'glass-nav' : 'navbar-transparent'}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-font d-flex align-items-center gap-2">
          <img src="/logo.png" alt="Rental HS Logo" className="brand-logo" />
          <span>Rental <span className="text-accent">HS.</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3 nav-links-centered">
              <Nav.Link as={Link} to="/" className="fw-medium mx-2 px-3 text-center">
                Beranda
              </Nav.Link>
              <Nav.Link as={Link} to="/armada" className="fw-medium mx-2 px-3 text-center">
                Armada
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-medium mx-2 px-3 text-center">
                Tentang Kami
              </Nav.Link>
            </Nav>
            
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Navigation
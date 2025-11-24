import { Container, Row, Col, Button } from 'react-bootstrap'

const Footer = () => {
  const handleCustomerService = () => {
    const phoneNumber = '+628170455544'
    const message = encodeURIComponent('Halo, saya butuh bantuan informasi rental mobil.')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* --- FOOTER --- */}
      <footer className="footer-premium mt-5 pt-5 pb-3">
        <Container>
          <Row className="g-5 mb-5">
            <Col lg={4}>
              <h3 className="fw-bold text-white mb-3 brand-font d-flex align-items-center gap-2">
                 <i className="bi bi-speedometer2 text-accent"></i>
                 <span>Rental <span className="text-accent">HS.</span></span>
              </h3>
              <p className="mb-4 opacity-75 lh-lg text-white">
                Mitra perjalanan terpercaya Anda. Kami menyediakan unit bersih, terawat, dan layanan bantuan darurat 24 jam di seluruh Indonesia.
              </p>
              <div className="d-flex gap-3">
                {['instagram', 'facebook', 'twitter', 'linkedin'].map(icon => (
                  <a key={icon} href="#" className="text-white opacity-50 hover-opacity-100 fs-5 bg-white bg-opacity-10 p-2 rounded-circle d-flex align-items-center justify-content-center social-link-size" aria-label={`Follow us on ${icon.charAt(0).toUpperCase() + icon.slice(1)}`}>
                    <i className={`bi bi-${icon}`}></i>
                  </a>
                ))}
              </div>
            </Col>
            <Col lg={2} md={4}>
              <h6 className="text-white fw-bold mb-4">Perusahaan</h6>
              <ul className="list-unstyled d-flex flex-column gap-3">
                <li><a href="#" className="footer-link text-decoration-none text-white opacity-75">Tentang Kami</a></li>
                <li><a href="#" className="footer-link text-decoration-none text-white opacity-75">Karir</a></li>
                <li><a href="#" className="footer-link text-decoration-none text-white opacity-75">Blog & Berita</a></li>
              </ul>
            </Col>
            <Col lg={2} md={4}>
              <h6 className="text-white fw-bold mb-4">Bantuan</h6>
              <ul className="list-unstyled d-flex flex-column gap-3">
                <li><a href="#" className="footer-link text-decoration-none text-white opacity-75">Pusat Bantuan</a></li>
                <li><a href="#" className="footer-link text-decoration-none text-white opacity-75">Syarat & Ketentuan</a></li>
                <li><a href="#" className="footer-link text-decoration-none text-white opacity-75">Kebijakan Privasi</a></li>
              </ul>
            </Col>
            <Col lg={4} md={4}>
              <h6 className="text-white fw-bold mb-4">Berlangganan</h6>
              <p className="small opacity-75 mb-3 text-white">Dapatkan info promo eksklusif setiap minggu.</p>
              <div className="input-group mb-3 bg-white bg-opacity-10 p-1 rounded-3 border border-secondary border-opacity-25">
                <input type="text" className="form-control bg-transparent border-0 text-white shadow-none" placeholder="Email Anda" />
                <Button variant="primary" className="bg-accent border-0 text-dark fw-bold rounded-3 px-4">Kirim</Button>
              </div>
            </Col>
          </Row>
          <div className="border-top border-white border-opacity-10 pt-4 text-center">
            <small className="opacity-50 text-white">&copy; 2024 Rental HS Inc. All rights reserved.</small>
          </div>
        </Container>
      </footer>

      {/* Fixed Floating Action Button */}
       <div className="position-fixed bottom-0 end-0 m-4 z-3">
        <Button 
            className="btn-primary-glow rounded-circle p-0 d-flex align-items-center justify-content-center shadow-lg" 
            style={{width:'64px', height:'64px'}}
            onClick={handleCustomerService}
        >
            <i className="bi bi-whatsapp fs-3"></i>
        </Button>
      </div>
    </>
  )
}

export default Footer
import { Container, Row, Col, Badge} from 'react-bootstrap'
import { motion } from 'framer-motion'
import './App.css'

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

// Gallery Images Data
const galleryImages = [
  

  {
    id: 9,
    src: '/armada premiunm.jpg',
    alt: 'Armada Premium',
    category: 'Fleet'
  },
  {
    id: 10,
    src: '/armada.jpg',
    alt: 'Armada',
    category: 'Fleet'
  },
  {
    id: 11,
    src: '/event perusahaan.jpg',
    alt: 'Event Perusahaan',
    category: 'Office'
  },
  {
    id: 12,
    src: '/event.jpg',
    alt: 'Event',
    category: 'Facilities'
  },
  {
    id: 13,
    src: '/Home.png',
    alt: 'Home',
    category: 'Office'
  },
  {
    id: 14,
    src: '/kantor.jpg',
    alt: 'Kantor',
    category: 'Office'
  },
  {
    id: 15,
    src: '/pelanggan.jpg',
    alt: 'Pelanggan',
    category: 'Office'
  },
  {
    id: 16,
    src: '/pelatihan driver.jpg',
    alt: 'Pelatihan Driver',
    category: 'Team'
  },
  {
    id: 17,
    src: '/perjalanan wisata 1.jpg',
    alt: 'Perjalanan Wisata 1',
    category: 'Fleet'
  },
  {
    id: 18,
    src: '/perjalanan wisata.jpg',
    alt: 'Perjalanan Wisata',
    category: 'Fleet'
  },
  {
    id: 19,
    src: '/premium.jpg',
    alt: 'Premium',
    category: 'Fleet'
  },
  {
    id: 20,
    src: '/rombongan perjalanan.jpg',
    alt: 'Rombongan Perjalanan',
    category: 'Fleet'
  },
  {
    id: 21,
    src: '/sertifikat.png',
    alt: 'Sertifikat',
    category: 'Office'
  },
  {
    id: 22,
    src: '/tentang kami 1.jpg',
    alt: 'Tentang Kami 1',
    category: 'Office'
  },
 
  {
    id: 24,
    src: '/tim.jpg',
    alt: 'Tim',
    category: 'Team'
  },
  {
    id: 25,
    src: '/wedding.jpg',
    alt: 'Wedding',
    category: 'Fleet'
  }
]

// Stats Data
const companyStats = [
  { number: '1000', label: 'Pelanggan Puas', icon: 'bi-people-fill' },
  { number: '50+', label: 'Unit Armada', icon: 'bi-car-front-fill' },
  { number: '24/7', label: 'Layanan Support', icon: 'bi-headset' },
  { number: '10', label: 'Tahun Pengalaman', icon: 'bi-calendar-check' }
]



// Values Data
const companyValues = [
  {
    icon: 'bi-shield-check',
    title: 'Keamanan Terjamin',
    description: 'Setiap kendaraan melalui inspeksi menyeluruh dan dilengkapi fitur keamanan modern.'
  },
  {
    icon: 'bi-star-fill',
    title: 'Kualitas Premium',
    description: 'Hanya menyediakan kendaraan dalam kondisi prima dengan standar tertinggi.'
  },
  {
    icon: 'bi-clock',
    title: 'Layanan 24/7',
    description: 'Tim support kami siap membantu Anda kapan saja, di mana saja.'
  },
  {
    icon: 'bi-heart-fill',
    title: 'Customer First',
    description: 'Kepuasan pelanggan adalah prioritas utama dalam setiap layanan kami.'
  }
]

function About() {
  return (
    <div className="min-vh-100 bg-light">
      {/* --- HERO SECTION --- */}
      <section className="about-hero position-relative vh-100 d-flex align-items-center overflow-hidden">
        <div className="hero-bg-gradient position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="hero-bg-pattern position-absolute top-0 start-0 w-100 h-100"></div>

        <Container className="position-relative z-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center text-white"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <Badge bg="light" text="dark" className="mb-4 px-4 py-3 rounded-pill fw-bold shadow-lg">
                <i className="bi bi-building me-2 text-primary"></i>Tentang Kami
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="display-4 fw-bold mb-4 hero-title"
            >
              Mengenal Rental HS
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lead mb-5 hero-subtitle"
            >
              Mitra terpercaya perjalanan Anda sejak 2015. Kami menghadirkan pengalaman rental mobil
              yang tak terlupakan dengan standar hospitality bintang lima.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="d-flex justify-content-center gap-5 flex-wrap mb-5"
            >
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="display-6 fw-bold text-white mb-2">
                    <i className={`bi ${stat.icon} me-2 text-accent`}></i>
                    {stat.number}
                  </div>
                  <div className="small opacity-75">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* --- COMPANY STORY SECTION --- */}
      <section className="py-5 company-story-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-4 py-2 mb-4">
                  <i className="bi bi-book me-2"></i>Cerita Kami
                </Badge>
                <h2 className="display-5 fw-bold mb-4 text-dark">Dimulai dari Passion Otomotif</h2>
                <div className="story-content">
                  <p className="lead text-muted mb-4">
                    Rental HS didirikan pada tahun 2015 oleh sekelompok profesional otomotif yang memiliki visi
                    untuk merevolusi industri rental mobil di Indonesia. Dengan pengalaman lebih dari 15 tahun di
                    bidang hospitality dan otomotif, kami memahami bahwa perjalanan bukan hanya tentang transportasi,
                    tapi juga tentang pengalaman.
                  </p>
                  <p className="text-muted mb-4">
                    Kami percaya bahwa setiap perjalanan memiliki cerita unik. Oleh karena itu, kami berkomitmen
                    untuk memberikan layanan yang tidak hanya memenuhi kebutuhan transportasi, tetapi juga menciptakan
                    kenangan indah bagi setiap pelanggan kami.
                  </p>
                  <p className="text-muted mb-4">
                    Dengan armada yang selalu terawat, driver profesional yang berpengalaman, dan layanan support 24/7,
                    kami telah dipercaya oleh ribuan pelanggan untuk menemani berbagai momen penting dalam hidup mereka.
                  </p>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="story-image-container"
              >
                <div className="story-image-wrapper">
                  <img
                    src="/tentang kami.jpg"
                    alt="Kantor Rental HS"
                    className="story-image"
                  />
                  <div className="story-image-overlay">
                    <div className="story-stats">
                      <div className="stat-item">
                        <div className="stat-number">2015</div>
                        <div className="stat-label">Tahun Berdiri</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">150+</div>
                        <div className="stat-label">Unit Armada</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">5000+</div>
                        <div className="stat-label">Pelanggan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-5 values-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-4 py-2 mb-3">
              <i className="bi bi-star me-2"></i>Nilai Kami
            </Badge>
            <h2 className="display-5 fw-bold mb-3 text-dark">Apa yang Membuat Kami Berbeda</h2>
            <p className="lead text-muted mb-5 max-w-2xl mx-auto">
              Kami tidak hanya menyewakan mobil, tapi juga memberikan pengalaman perjalanan yang tak terlupakan.
            </p>
          </motion.div>

          <Row className="g-4">
            {companyValues.map((value, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="h-100"
                >
                  <div className="value-card-modern h-100">
                    <div className="value-card-content">
                      <div className="value-icon-wrapper">
                        <div className="value-icon-circle">
                          <i className={`bi ${value.icon} value-icon-main`}></i>
                        </div>
                        <div className="value-icon-glow"></div>
                      </div>
                      <div className="value-content">
                        <h4 className="value-title">{value.title}</h4>
                        <p className="value-description">{value.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      
      {/* --- GALLERY SECTION --- */}
      <section className="py-5 gallery-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-4 py-2 mb-3">
              <i className="bi bi-images me-2"></i>Gallery
            </Badge>
            <h2 className="display-5 fw-bold mb-3 text-dark">Lihat Sekilas Dunia Kami</h2>
            <p className="lead text-muted mb-5 max-w-2xl mx-auto">
              Eksplorasi fasilitas modern, armada premium, dan tim profesional yang siap melayani Anda.
            </p>
          </motion.div>

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="gallery-item"
              >
                <div className="gallery-image-wrapper">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-category">{image.category}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default About
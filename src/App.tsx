import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Container, Button, Row, Col, Badge } from 'react-bootstrap'
import { motion } from 'framer-motion'
import CarDetail from './CarDetail'
import ArmadaGallery from './ArmadaGallery'
import About from './About'
import Navigation from './Navigation'
import Footer from './Footer'
import './App.css'

// Import car images
import avanzaImg from './assets/Avanza (2).jpeg'
import innovaImg from './assets/innova reborn (2).jpeg'
import zenixImg from './assets/Toyota Innova Zenix 2023 - Modèle monospace compact (1).jpeg'
import fortunerImg from './assets/fortuner (2).jpeg'
import alphardImg from './assets/Toyota Alphard 2022 Price Philippines & Official Promos.jpeg'
import hiaceCommuterImg from './assets/haiace Commuter.jpeg'
import premioImg from './assets/premio.jpeg'
import weddingCarImg from './assets/wedding car mercy.jpeg'
import mediumBusImg from './assets/medium bus.jpeg'

// Data Mobil (Pastikan URL gambar valid atau gunakan placeholder yang bagus)
const cars = [
  {
    id: 1,
    name: 'Toyota Avanza',
    image: avanzaImg,
    price: 'Rp 700.000',
    type: 'MPV Family',
    seats: '7 Kursi',
    transmission: 'Manual'
  },
  {
    id: 2,
    name: 'Toyota Inova Reborn',
    image: innovaImg,
    price: 'Rp 850.000',
    type: 'MPV Premium',
    seats: '8 Kursi',
    transmission: 'Manual'
  },
  {
    id: 3,
    name: 'Zenix Hybrid',
    image: zenixImg,
    price: 'Rp 1.500.000',
    type: 'Hybrid',
    seats: '5 Kursi',
    transmission: 'Automatic'
  },
  {
    id: 4,
    name: 'Toyota Fortuner',
    image: fortunerImg,
    price: 'Rp 1.700.000',
    type: 'SUV',
    seats: '7 Kursi',
    transmission: 'Automatic'
  },
  {
    id: 5,
    name: 'Toyota Alphard',
    image: alphardImg,
    price: 'Rp 3.500.000',
    type: 'Luxury MPV',
    seats: '7 Kursi',
    transmission: 'Automatic'
  },
  {
    id: 6,
    name: 'Toyota Hiace Commuter',
    image: hiaceCommuterImg,
    price: 'Rp 1.300.000',
    type: 'Van',
    seats: '15 Kursi',
    transmission: 'Manual'
  },
  {
    id: 7,
    name: 'Toyota Hiace Premio',
    image: premioImg,
    price: 'Rp 1.500.000',
    type: 'Premium Van',
    seats: '12 Kursi',
    transmission: 'Manual'
  },
  {
    id: 8,
    name: 'Mercedes-Benz Wedding Car',
    image: weddingCarImg,
    price: 'Rp 2.800.000',
    type: 'Luxury Sedan',
    seats: '4 Kursi',
    transmission: 'Automatic'
  },
  {
    id: 9,
    name: 'Medium Bus 30 Seat',
    image: mediumBusImg,
    price: 'Rp 2.500.000',
    type: 'Bus',
    seats: '30 Kursi',
    transmission: 'Manual'
  }
]

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

// Scroll to Top Component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// --- TESTIMONI DATA ---
const testimonials = [
  {
    id: 1,
    name: 'Aji Saputra',
    role: 'Event Organizer',
    avatar: '/aji.jpg',
    rating: 5,
    text: 'Pelayanan sangat profesional dan mobil dalam kondisi prima. Armada lengkap dari city car hingga luxury SUV. Recommended untuk event organizer!',
    event: 'Wedding Reception',
    car: 'Toyota Alphard'
  },
  {
    id: 2,
    name: 'Muhammad Rizky Falih',
    role: 'Corporate Travel',
    avatar: '/iki.jpg',
    rating: 5,
    text: 'Sudah 3 tahun menggunakan jasa rental ini untuk keperluan dinas. Driver profesional, mobil selalu bersih dan tepat waktu. Very satisfied!',
    event: 'Business Meeting',
    car: 'Toyota Inova Reborn'
  },
  {
    id: 3,
    name: 'Akhmal Ramadhan',
    role: 'Family Trip',
    avatar: '/male.jpg',
    rating: 5,
    text: 'Liburan keluarga jadi lebih menyenangkan dengan mobil yang nyaman dan driver yang ramah. Safety first dengan fitur keamanan lengkap.',
    event: 'Family Vacation',
    car: 'Toyota Avanza'
  },
  {
    id: 4,
    name: 'Maya Putri',
    role: 'Wedding Planner',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Sebagai wedding planner, saya butuh partner rental yang reliable. Mereka selalu on time dan memberikan service terbaik untuk setiap acara.',
    event: 'Wedding Ceremony',
    car: 'Mercedes Wedding'
  },
  {
    id: 5,
    name: 'Rudi Hartono',
    role: 'Tour Guide',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Untuk tur wisata, mobil yang digunakan harus nyaman dan reliable. Armada mereka selalu siap dan driver berpengalaman di berbagai rute.',
    event: 'City Tour',
    car: 'Medium Bus'
  },
  {
    id: 6,
    name: 'Linda Sari',
    role: 'Student Event',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Event kampus jadi lebih smooth dengan dukungan rental mobil yang professional. Harga terjangkau dan service memuaskan.',
    event: 'Campus Event',
    car: 'Hiace Premio'
  }
]

// --- TESTIMONI COMPONENT ---
const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="h-100"
  >
    <div className="testimonial-card-modern h-100">
      {/* Rating */}
      <div className="testimonial-rating">
        {[...Array(testimonial.rating)].map((_, i) => (
          <i key={i} className="bi bi-star-fill"></i>
        ))}
      </div>

      {/* Quote */}
      <div className="testimonial-quote">
        <i className="bi bi-quote testimonial-quote-icon"></i>
        <p className="testimonial-text">{testimonial.text}</p>
      </div>

      {/* Event & Car Info */}
      <div className="testimonial-meta">
        <Badge bg="light" text="dark" className="testimonial-event-badge">
          <i className="bi bi-calendar-event me-1"></i>
          {testimonial.event}
        </Badge>
        <Badge bg="primary" text="white" className="testimonial-car-badge">
          <i className="bi bi-car-front me-1"></i>
          {testimonial.car}
        </Badge>
      </div>

      {/* Author */}
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <img src={testimonial.avatar} alt={testimonial.name} />
        </div>
        <div className="testimonial-author-info">
          <h6 className="testimonial-author-name">{testimonial.name}</h6>
          <span className="testimonial-author-role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  </motion.div>
)

function HomePage() {
  const [searchForm, setSearchForm] = useState({
    location: 'Jakarta Selatan',
    startDate: '',
    endDate: '',
    carType: 'Semua Tipe'
  })
  const [filteredCars, setFilteredCars] = useState(cars.slice(0, 3))
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof cars>([])

  // Handle search form changes
  const handleSearchChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle search functionality
  const handleSearch = () => {
    setIsSearching(true)
    
    // Basic validation
    if (!searchForm.startDate || !searchForm.endDate) {
      alert('Silakan pilih tanggal mulai dan akhir penyewaan')
      setIsSearching(false)
      return
    }

    // Filter cars based on search criteria
    let results = [...cars]

    // Filter by car type if not "Semua Tipe"
    if (searchForm.carType !== 'Semua Tipe') {
      results = results.filter(car => {
        // Map search options to car types
        const typeMapping: { [key: string]: string[] } = {
          'SUV Family': ['SUV', 'MPV Family', 'MPV Premium'],
          'City Car': ['MPV Family', 'Hybrid'],
          'Electric (EV)': ['Hybrid', 'Electric']
        }
        return typeMapping[searchForm.carType]?.includes(car.type) || car.type === searchForm.carType
      })
    }

    // Simulate search delay for better UX
    setTimeout(() => {
      setSearchResults(results)
      setFilteredCars(results.slice(0, 3))
      setIsSearching(false)
      
      // Scroll to car listing section
      const carSection = document.getElementById('armada')
      if (carSection) {
        carSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  return (
    <div className="min-vh-100 bg-light">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-section vh-100 d-flex align-items-center justify-content-center text-center text-white position-relative overflow-hidden">
        <div 
          className="hero-bg-image position-absolute top-0 start-0 w-100 h-100 hero-bg-image-style"
        ></div>
        <div className="hero-gradient position-absolute top-0 start-0 w-100 h-100"></div>
        
        <Container className="position-relative z-2">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
          <Badge bg="white" text="dark" className="rounded-pill px-3 py-2 mb-4 fw-bold shadow-sm">
            <i className="bi bi-stars text-warning me-2"></i> The #1 Car Rental in Indonesia
          </Badge>
        </motion.div>
        <motion.h1 variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="display-custom fw-bold mb-4">
          Jelajahi Dunia <br /> Tanpa Batas.
        </motion.h1>
        <motion.p variants={fadeInUp} transition={{ duration: 0.6, delay: 0.4 }} className="lead opacity-75 mb-5 mx-auto fs-5 hero-subtitle-max-width">
          Sewa mobil premium lepas kunci dengan teknologi AI match dan layanan darurat 24/7. Transparan, Cepat, Elegan.
        </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* --- SEARCH WIDGET (Floating) --- */}
      {/* --- SEARCH WIDGET (Floating) --- */}
      <Container className="position-relative z-3">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -80 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="search-glass-card p-4 p-md-5 shadow-lg rounded-4"
        >
          <Row className="g-3 align-items-end">
        <Col lg={3} md={6}>
          <label className="text-muted small fw-bold mb-2 text-uppercase ls-1">Lokasi Penjemputan</label>
          <div className="input-group border rounded-3 overflow-hidden">
            <span className="input-group-text bg-light border-0"><i className="bi bi-geo-alt text-accent fs-5"></i></span>
            <select 
              className="form-select border-0 shadow-none" 
              aria-label="Pilih lokasi" 
              title="Pilih lokasi penjemputan"
              value={searchForm.location}
              onChange={(e) => handleSearchChange('location', e.target.value)}
            >
              <option>Jakarta Selatan</option>
              <option>Bandara Soekarno Hatta</option>
              <option>Bandung Kota</option>
            </select>
          </div>
        </Col>
        <Col lg={3} md={6}>
          <label className="text-muted small fw-bold mb-2 text-uppercase ls-1">Tanggal Mulai</label>
          <div className="input-group border rounded-3 overflow-hidden">
            <span className="input-group-text bg-light border-0"><i className="bi bi-calendar-event text-accent fs-5"></i></span>
            <input 
              type="date" 
              className="form-control border-0 shadow-none" 
              title="Pilih tanggal mulai penyewaan"
              value={searchForm.startDate}
              onChange={(e) => handleSearchChange('startDate', e.target.value)}
            />
          </div>
        </Col>
        <Col lg={3} md={6}>
          <label className="text-muted small fw-bold mb-2 text-uppercase ls-1">Tanggal Akhir</label>
          <div className="input-group border rounded-3 overflow-hidden">
            <span className="input-group-text bg-light border-0"><i className="bi bi-calendar-check text-accent fs-5"></i></span>
            <input 
              type="date" 
              className="form-control border-0 shadow-none" 
              title="Pilih tanggal akhir penyewaan"
              value={searchForm.endDate}
              onChange={(e) => handleSearchChange('endDate', e.target.value)}
            />
          </div>
        </Col>
        <Col lg={3} md={6}>
          <label className="text-muted small fw-bold mb-2 text-uppercase ls-1">Tipe Mobil</label>
          <div className="input-group border rounded-3 overflow-hidden">
            <span className="input-group-text bg-light border-0"><i className="bi bi-car-front text-accent fs-5"></i></span>
            <select 
              className="form-select border-0 shadow-none" 
              title="Pilih tipe mobil"
              value={searchForm.carType}
              onChange={(e) => handleSearchChange('carType', e.target.value)}
            >
              <option>Semua Tipe</option>
              <option>SUV Family</option>
              <option>City Car</option>
              <option>Electric (EV)</option>
            </select>
          </div>
        </Col>
        <Col lg={12} className="text-center mt-3">
          <Button 
            className="btn-primary-glow w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status"></div>
                Mencari Mobil...
              </>
            ) : (
              <>
                <i className="bi bi-search"></i> Cari Mobil
              </>
            )}
          </Button>
        </Col>
          </Row>
        </motion.div>
      </Container>

     

      {/* --- BENTO GRID FEATURES (MODERN & RAPIH) --- */}
      <section className="py-5 bento-section">
        <div className="bento-bg-decoration"></div>
        <Container className="py-4">
          <div className="text-center mb-5 bento-header-max-width">
            <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-2 mb-3">
              Why Choose Us?
            </Badge>
            <h2 className="display-6 fw-bold mb-3">Standar Baru Kenyamanan</h2>
            <p className="text-muted lead fs-6">
              Kombinasi teknologi presisi AI dengan layanan hospitality bintang lima untuk perjalanan Anda.
            </p>
          </div>

          <Row className="g-4 align-items-stretch">
            {/* KIRI: Feature Utama */}
            <Col lg={7}>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bento-card-main d-flex flex-column justify-content-center"
                style={{ color: '#fcfcfcff' }} // Google Font
              >
                <div className="position-relative z-2">
                  <div className="icon-box-glow">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h3
                    className="fw-bold display-6 mb-3 text-white"
                  >
                    Hospitality <br /> Meets Technology.
                  </h3>
                  <p
                    className="opacity-75 fs-5 mb-4 bento-description-max-width text-white"
                  >
                    Driver kami dilatih dengan standar hotel bintang 5. Didukung aplikasi cerdas untuk ketepatan waktu dan keamanan.
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Badge
                      bg="white"
                      text="dark"
                      className="px-3 py-2 rounded-pill fw-normal d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: '#fff',
                        color: '#212529',
                        fontFamily: "'Poppins', 'Roboto', Arial, sans-serif"
                      }}
                    >
                      <i className="bi bi-check-circle-fill text-success"></i> Professional Driver
                    </Badge>
                    <Badge
                      bg="white"
                      text="dark"
                      className="px-3 py-2 rounded-pill fw-normal d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: '#fff',
                        color: '#212529',
                        fontFamily: "'Poppins', 'Roboto', Arial, sans-serif"
                      }}
                    >
                      <i className="bi bi-check-circle-fill text-success"></i> On-Time Guarantee
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* KANAN: Feature Stacked */}
            <Col lg={5}>
              <Row className="g-4 h-100">
              <Col md={6}>
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bento-card-sub h-100"
                >
                <div className="d-flex flex-column h-100">
                  <div className="icon-box-sub text-success bg-success-subtle flex-shrink-0 mb-3">
                  <i className="bi bi-wallet2"></i>
                  </div>
                  <h4 className="fw-bold mb-2 font-poppins">Harga Transparan</h4>
                  <p className="text-muted small mb-0 flex-grow-1 font-roboto">
                  Harga yang Anda lihat adalah harga final. Tidak ada biaya tersembunyi (hidden fees) saat pengambilan kunci.
                  </p>
                </div>
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bento-card-sub h-100"
                >
                <div className="d-flex flex-column h-100">
                  <div className="icon-box-sub text-danger bg-danger-subtle flex-shrink-0 mb-3">
                  <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <h4 className="fw-bold mb-2 font-poppins">Lacak Real-Time</h4>
                  <p className="text-muted small mb-0 flex-grow-1 font-roboto">
                  Pantau lokasi kendaraan secara real-time demi keamanan keluarga dan ketenangan pikiran Anda.
                  </p>
                </div>
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bento-card-sub h-100"
                >
                <div className="d-flex flex-column h-100">
                  <div className="icon-box-sub text-primary bg-primary-subtle flex-shrink-0 mb-3">
                  <i className="bi bi-robot"></i>
                  </div>
                  <h4 className="fw-bold mb-2 font-poppins">AI Matching</h4>
                  <p className="text-muted small mb-0 flex-grow-1 font-roboto">
                  Teknologi AI kami mencocokkan mobil terbaik sesuai kebutuhan dan preferensi Anda secara otomatis.
                  </p>
                </div>
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bento-card-sub h-100"
                >
                <div className="d-flex flex-column h-100">
                  <div className="icon-box-sub text-warning bg-warning-subtle flex-shrink-0 mb-3">
                  <i className="bi bi-shield-exclamation"></i>
                  </div>
                  <h4 className="fw-bold mb-2 font-poppins">Darurat 24/7</h4>
                  <p className="text-muted small mb-0 flex-grow-1 font-roboto">
                  Layanan bantuan darurat tersedia 24 jam untuk memastikan perjalanan Anda selalu aman dan nyaman.
                  </p>
                </div>
                </motion.div>
              </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- CAR LISTING (MODERN REDESIGN) --- */}
      <section className="car-listing-section py-5" id="armada">
        <Container>
          {/* Header Section */}
          <div className="text-center mb-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge bg="info" className="bg-opacity-10 text-info mb-3 px-4 py-2 rounded-pill fw-semibold">
                <i className="bi bi-car-front-fill me-2"></i>Premium Fleet Collection
              </Badge>
              <h2 className="display-5 fw-bold mb-3 text-dark">Pilihan Armada Premium</h2>
              <p className="lead text-muted mb-4 max-w-2xl mx-auto">
                Temukan mobil impian Anda dengan kualitas terbaik, teknologi terkini, dan layanan profesional untuk perjalanan yang tak terlupakan.
              </p>
              {searchResults.length > 0 && (
                <div className="mb-4">
                  <Badge bg="success" className="px-3 py-2 rounded-pill fw-semibold">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Ditemukan {searchResults.length} mobil sesuai kriteria pencarian
                  </Badge>
                </div>
              )}
            </motion.div>

            {/* Terms Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="car-terms-info max-w-4xl mx-auto"
            >
              <div className="car-terms-title">
                <i className="bi bi-info-circle-fill me-2"></i>
                Syarat & Ketentuan Sewa
              </div>
              <div className="car-terms-list">
                <div className="car-term-item">
                  <i className="bi bi-clock"></i>
                  <span className="text-center">12 Jam Durasi</span>
                </div>
                <div className="car-term-item">
                  <i className="bi bi-person-check"></i>
                  <span className="text-center">Driver Professional</span>
                </div>
                <div className="car-term-item">
                  <i className="bi bi-fuel-pump"></i>
                  <span className="text-center">BBM Included</span>
                </div>
                <div className="car-term-item">
                  <i className="bi bi-geo-alt"></i>
                  <span className="text-center">City Tour Usage</span>
                </div>
                <div className="car-term-item">
                  <i className="bi bi-cash-coin"></i>
                  <span className="text-center">Tol & Parkir Customer</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Car Grid */}
          <div className="car-grid">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                className="car-card-modern"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Image Section */}
                <div className="car-image-wrapper">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image-modern"
                    loading="lazy"
                  />
                  <div className="car-badge-type">{car.type}</div>
                  <div className="car-rating">
                    <i className="bi bi-star-fill"></i>
                    <span>4.9</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="car-content">
                  <h3 className="car-title">{car.name}</h3>

                  <div className="car-features">
                    <div className="car-feature-badge">
                      <i className="bi bi-gear-wide"></i>
                      {car.transmission}
                    </div>
                    <div className="car-feature-badge">
                      <i className="bi bi-people"></i>
                      {car.seats}
                    </div>
                  </div>

                  <div className="car-price-section">
                    <div className="car-price">
                      <div className="car-price-main">{car.price}</div>
                      <div className="car-price-label">per 12 jam</div>
                    </div>
                    <Link to={`/car/${car.id}`} className="car-book-btn-link">
                      <button className="car-book-btn">
                        <span>Lihat Detail</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-5"
          >
            <Link to="/armada">
              <Button
                variant="outline-primary"
                size="lg"
                className="rounded-pill px-5 py-3 fw-bold border-2 btn-hover-glow"
              >
                <i className="bi bi-grid-3x3-gap me-2"></i>
                Lihat Semua Armada
                <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* --- TESTIMONI SECTION (MODERN DESIGN) --- */}
      <section className="testimonials-section py-5">
        <Container>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-4 py-2 mb-3">
              <i className="bi bi-chat-quote-fill me-2"></i>Customer Reviews
            </Badge>
            <h2 className="display-5 fw-bold mb-3 text-dark">Apa Kata Pelanggan Kami</h2>
            <p className="lead text-muted mb-4 max-w-2xl mx-auto">
              Ribuan pelanggan telah mempercayai layanan kami untuk berbagai keperluan.
              Berikut beberapa testimoni dari mereka yang telah merasakan pengalaman terbaik bersama kami.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="testimonials-stats mt-5"
          >
            <div className="stats-grid">
              <div className="stat-item-modern">
                <div className="stat-number-modern">1000</div>
                <div className="stat-label-modern">Happy Customers</div>
              </div>
              <div className="stat-item-modern">
                <div className="stat-number-modern">4.9</div>
                <div className="stat-label-modern">Average Rating</div>
              </div>
              <div className="stat-item-modern">
                <div className="stat-number-modern">98%</div>
                <div className="stat-label-modern">Satisfaction Rate</div>
              </div>
              <div className="stat-item-modern">
                <div className="stat-number-modern">24/7</div>
                <div className="stat-label-modern">Support Available</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <Navigation isScrolled={isScrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/armada" element={<ArmadaGallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

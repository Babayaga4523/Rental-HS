import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Badge, Card, Tabs, Tab, Form, InputGroup } from 'react-bootstrap'
import { motion } from 'framer-motion'
import './App.css'

// Import car images
import avazaImage from './assets/Avanza (2).jpeg'
import innovaRebornImage from './assets/innova reborn (2).jpeg'
import zenixImage from './assets/Toyota Innova Zenix 2023 - Modèle monospace compact (1).jpeg'
import fortunerImage from './assets/fortuner (2).jpeg'
import alphardImage from './assets/Toyota Alphard 2022 Price Philippines & Official Promos.jpeg'
import hiaceCommuterImage from './assets/haiace Commuter.jpeg'
import premioImage from './assets/premio.jpeg'
import weddingCarImage from './assets/wedding car mercy.jpeg'
import mediumBusImage from './assets/medium bus.jpeg'

// Extended car data with more details
interface CarDetail {
  id: number;
  name: string;
  image: string;
  price: string;
  type: string;
  seats: string;
  transmission: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  gallery: string[];
}

const carDetails: Record<number, CarDetail> = {
  1: {
    id: 1,
    name: 'Toyota Avanza',
    image: avazaImage,
    price: 'Rp 700.000',
    type: 'MPV Family',
    seats: '7 Kursi',
    transmission: 'Manual',
    description: "Toyota Avanza adalah MPV yang sempurna untuk keluarga dengan 7 kursi yang nyaman. Dilengkapi dengan fitur keselamatan lengkap dan performa mesin yang handal untuk perjalanan jauh.",
    features: [
      "7 Kursi Nyaman",
      "Air Conditioning",
      "Audio System",
      "Central Lock",
      "Power Steering",
      "ABS & EBD",
      "Dual SRS Airbag",
      "USB Charging Port"
    ],
    specifications: {
      engine: "1.3L Dual VVT-i",
      fuelType: "Bensin",
      fuelCapacity: "45L",
      transmission: "Manual 5-Speed",
      dimensions: "4.16m x 1.66m x 1.69m",
      weight: "1,160kg",
      maxPower: "95 hp @ 6,000 rpm",
      maxTorque: "121 Nm @ 4,200 rpm"
    },
    gallery: [
      avazaImage,
      avazaImage,
      avazaImage
    ]
  },
  2: {
    id: 2,
    name: 'Toyota Inova Reborn',
    image: innovaRebornImage,
    price: 'Rp 850.000',
    type: 'MPV Premium',
    seats: '8 Kursi',
    transmission: 'Manual',
    description: "Toyota Inova Reborn menawarkan kenyamanan premium dengan interior yang luas dan fitur-fitur modern. Cocok untuk perjalanan keluarga atau bisnis dengan kapasitas hingga 8 penumpang.",
    features: [
      "8 Kursi Premium",
      "Dual Zone AC",
      "Touchscreen Audio",
      "Keyless Entry",
      "Push Start Button",
      "Rear Parking Camera",
      "Hill Assist Control",
      "USB & AUX Ports"
    ],
    specifications: {
      engine: "2.0L Dual VVT-i",
      fuelType: "Bensin",
      fuelCapacity: "55L",
      transmission: "Manual 5-Speed",
      dimensions: "4.73m x 1.83m x 1.79m",
      weight: "1,720kg",
      maxPower: "139 hp @ 5,600 rpm",
      maxTorque: "183 Nm @ 4,000 rpm"
    },
    gallery: [
      innovaRebornImage,
      innovaRebornImage,
      innovaRebornImage
    ]
  },
  3: {
    id: 3,
    name: 'Zenix Hybrid',
    image: zenixImage,
    price: 'Rp 1.500.000',
    type: 'Hybrid',
    seats: '5 Kursi',
    transmission: 'Automatic',
    description: "Zenix Hybrid menggabungkan efisiensi bahan bakar dengan performa yang powerful. Teknologi hybrid terdepan untuk pengalaman berkendara yang ramah lingkungan.",
    features: [
      "Hybrid Technology",
      "Regenerative Braking",
      "Digital Instrument Cluster",
      "Wireless Charging",
      "Auto Headlights",
      "Electric Parking Brake",
      "Hill Hold Control",
      "Multi-function Steering Wheel"
    ],
    specifications: {
      engine: "1.5L Turbo Hybrid",
      fuelType: "Hybrid (Bensin + Electric)",
      fuelCapacity: "35L",
      transmission: "CVT Automatic",
      dimensions: "4.57m x 1.82m x 1.60m",
      weight: "1,380kg",
      maxPower: "140 hp",
      maxTorque: "250 Nm"
    },
    gallery: [
      zenixImage,
      zenixImage,
      zenixImage
    ]
  },
  4: {
    id: 4,
    name: 'Toyota Fortuner',
    image: fortunerImage,
    price: 'Rp 1.700.000',
    type: 'SUV',
    seats: '7 Kursi',
    transmission: 'Automatic',
    description: "Toyota Fortuner adalah SUV tangguh dengan kemampuan off-road yang superior. Interior premium dan fitur keselamatan lengkap untuk petualangan di berbagai medan.",
    features: [
      "4x4 All Wheel Drive",
      "7 Kursi Premium",
      "Leather Seats",
      "Multi-terrain Select",
      "Crawl Control",
      "Downhill Assist Control",
      "7 SRS Airbags",
      "Blind Spot Monitor"
    ],
    specifications: {
      engine: "2.4L Turbo Diesel",
      fuelType: "Solar Diesel",
      fuelCapacity: "80L",
      transmission: "Automatic 6-Speed",
      dimensions: "4.79m x 1.85m x 1.83m",
      weight: "2,110kg",
      maxPower: "149 hp @ 3,400 rpm",
      maxTorque: "400 Nm @ 1,600 rpm"
    },
    gallery: [
      fortunerImage,
      fortunerImage,
      fortunerImage
    ]
  },
  5: {
    id: 5,
    name: 'Toyota Alphard',
    image: alphardImage,
    price: 'Rp 3.500.000',
    type: 'Luxury MPV',
    seats: '7 Kursi',
    transmission: 'Automatic',
    description: "Toyota Alphard adalah MPV luxury dengan kenyamanan terbaik di kelasnya. Interior mewah dan fitur premium untuk pengalaman berkendara yang eksklusif.",
    features: [
      "Captain Seats",
      "Premium Leather",
      "Power Sliding Doors",
      "Ottoman Seats",
      "Dual Moonroof",
      "Surround Sound System",
      "Wireless Charger",
      "Advanced Safety Features"
    ],
    specifications: {
      engine: "3.5L V6 Twin Cam",
      fuelType: "Bensin",
      fuelCapacity: "75L",
      transmission: "Automatic 8-Speed",
      dimensions: "4.94m x 1.85m x 1.94m",
      weight: "2,240kg",
      maxPower: "275 hp @ 6,200 rpm",
      maxTorque: "340 Nm @ 4,700 rpm"
    },
    gallery: [
      alphardImage,
      alphardImage,
      alphardImage
    ]
  },
  6: {
    id: 6,
    name: 'Toyota Hiace Commuter',
    image: hiaceCommuterImage,
    price: 'Rp 1.300.000',
    type: 'Van',
    seats: '15 Kursi',
    transmission: 'Manual',
    description: "Toyota Hiace Commuter adalah van komersial yang handal untuk transportasi group. Kapasitas besar dengan efisiensi bahan bakar yang baik.",
    features: [
      "15 Kursi Penumpang",
      "High Roof Design",
      "Dual AC System",
      "Large Cargo Space",
      "Sliding Doors",
      "Stabilitrak",
      "ABS & BA",
      "Driver Airbag"
    ],
    specifications: {
      engine: "2.5L Turbo Diesel",
      fuelType: "Solar Diesel",
      fuelCapacity: "70L",
      transmission: "Manual 5-Speed",
      dimensions: "5.28m x 1.88m x 2.28m",
      weight: "2,350kg",
      maxPower: "102 hp @ 3,600 rpm",
      maxTorque: "260 Nm @ 1,600 rpm"
    },
    gallery: [
      hiaceCommuterImage,
      hiaceCommuterImage,
      hiaceCommuterImage
    ]
  },
  7: {
    id: 7,
    name: 'Toyota Hiace Premio',
    image: premioImage,
    price: 'Rp 1.500.000',
    type: 'Premium Van',
    seats: '12 Kursi',
    transmission: 'Manual',
    description: "Toyota Hiace Premio menawarkan kenyamanan premium untuk transportasi eksekutif. Interior mewah dengan konfigurasi kursi yang fleksibel.",
    features: [
      "Premium Interior",
      "Captain Seats Option",
      "Privacy Glass",
      "Premium Audio",
      "Leather Steering",
      "Multi-zone AC",
      "USB Charging",
      "Rear Entertainment"
    ],
    specifications: {
      engine: "2.7L 4-Cylinder",
      fuelType: "Bensin",
      fuelCapacity: "70L",
      transmission: "Automatic 6-Speed",
      dimensions: "5.28m x 1.88m x 2.28m",
      weight: "2,400kg",
      maxPower: "161 hp @ 5,200 rpm",
      maxTorque: "241 Nm @ 3,800 rpm"
    },
    gallery: [
      premioImage,
      premioImage,
      premioImage
    ]
  },
  8: {
    id: 8,
    name: 'Mercedes-Benz Wedding Car',
    image: weddingCarImage,
    price: 'Rp 2.800.000',
    type: 'Luxury Sedan',
    seats: '4 Kursi',
    transmission: 'Automatic',
    description: "Mercedes-Benz Wedding Car adalah sedan mewah untuk acara spesial. Elegansi klasik dengan kenyamanan modern untuk momen berharga Anda.",
    features: [
      "Premium Leather Interior",
      "Panoramic Sunroof",
      "Premium Sound System",
      "Ambient Lighting",
      "Memory Seats",
      "Advanced Climate Control",
      "Rear Privacy Glass",
      "Chrome Exterior Accents"
    ],
    specifications: {
      engine: "3.0L V6 Turbo",
      fuelType: "Bensin",
      fuelCapacity: "66L",
      transmission: "Automatic 9-Speed",
      dimensions: "5.13m x 1.85m x 1.50m",
      weight: "1,950kg",
      maxPower: "333 hp @ 5,500 rpm",
      maxTorque: "480 Nm @ 1,600 rpm"
    },
    gallery: [
      weddingCarImage,
      weddingCarImage,
      weddingCarImage
    ]
  },
  9: {
    id: 9,
    name: 'Medium Bus 30 Seat',
    image: mediumBusImage,
    price: 'Rp 2.500.000',
    type: 'Bus',
    seats: '30 Kursi',
    transmission: 'Manual',
    description: "Medium Bus 30 Seat adalah solusi transportasi massal yang handal. Kapasitas besar dengan kenyamanan optimal untuk perjalanan group.",
    features: [
      "30 Kursi Penumpang",
      "High Roof Design",
      "Dual AC System",
      "Large Luggage Space",
      "Reclining Seats",
      "Reading Lights",
      "USB Charging Ports",
      "Emergency Exit"
    ],
    specifications: {
      engine: "4.0L Turbo Diesel",
      fuelType: "Solar Diesel",
      fuelCapacity: "200L",
      transmission: "Manual 6-Speed",
      dimensions: "9.20m x 2.40m x 3.20m",
      weight: "8,500kg",
      maxPower: "140 hp @ 2,600 rpm",
      maxTorque: "500 Nm @ 1,200 rpm"
    },
    gallery: [
      mediumBusImage,
      mediumBusImage,
      mediumBusImage
    ]
  }
}

function CarDetail() {
  const { id } = useParams<{ id: string }>()
  const carId = id ? parseInt(id) : 0
  const car = carDetails[carId]
  
  // State untuk simulasi booking
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')

  // Function untuk generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const message = `*PESANAN RENTAL MOBIL*

*Detail Mobil:*
• Nama: ${car.name}
• Tipe: ${car.type}
• Harga: ${car.price}/hari
• Kursi: ${car.seats}
• Transmisi: ${car.transmission}

*Detail Pemesanan:*
• Lokasi Jemput: ${pickupLocation}
• Tanggal Mulai Sewa: ${pickupDate || ''}
• Tanggal Kembali: ${returnDate || ''}

*Catatan:* Harga termasuk Driver & BBM. Durasi sewa dihitung per 12 Jam. Overtime 10%/jam.

Mohon konfirmasi ketersediaan dan proses pemesanan.`

    return encodeURIComponent(message)
  }

  // Function untuk handle booking via WhatsApp
  const handleBooking = () => {
    const phoneNumber = '+628170455544' // Format internasional tanpa spasi
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Function untuk chat customer service
  const handleCustomerService = () => {
    const phoneNumber = '+628170455544'
    const message = encodeURIComponent('Halo, saya butuh bantuan informasi rental mobil.')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Scroll to top saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!car) {
    return (
      <Container className="vh-100 d-flex flex-column align-items-center justify-content-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h2 className="fw-bold display-6 mb-3">Mobil Tidak Ditemukan</h2>
            <p className="text-muted mb-4">Unit yang Anda cari mungkin sedang tidak tersedia atau link salah.</p>
            <Link to="/">
              <Button variant="primary" className="rounded-pill px-4 py-2">Kembali ke Beranda</Button>
            </Link>
        </motion.div>
      </Container>
    )
  }

  return (
    <div className="min-vh-100 bg-surface-light">
      
      {/* --- HERO PRODUCT SECTION --- */}
      <section className="detail-hero-section">
        <Container>
            <Row className="align-items-center">
                <Col lg={6} className="mb-5 mb-lg-0 z-2">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <Badge bg="white" text="dark" className="border px-3 py-2 shadow-sm fw-bold rounded-pill">
                                <i className="bi bi-star-fill text-warning me-2"></i>Premium Collection
                            </Badge>
                            <Badge bg="info" className="bg-opacity-10 text-info border border-info px-3 py-2 rounded-pill">
                                {car.type}
                            </Badge>
                        </div>
                        <h1 className="display-3 fw-bold mb-2 brand-font car-detail-title">
                            {car.name}
                        </h1>
                        <div className="d-flex align-items-center gap-4 mb-4 text-muted">
                            <span className="d-flex align-items-center gap-2"><i className="bi bi-people"></i> {car.seats}</span>
                            <span className="d-flex align-items-center gap-2"><i className="bi bi-gear-wide"></i> {car.transmission}</span>
                            <span className="d-flex align-items-center gap-2"><i className="bi bi-fuel-pump"></i> {car.specifications.fuelType}</span>
                        </div>
                        <p className="lead opacity-75 mb-0 car-detail-description">
                            {car.description.substring(0, 100)}...
                        </p>
                    </motion.div>
                </Col>
                <Col lg={6} className="position-relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }} 
                        animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Decorative Blob behind car */}
                        <div className="position-absolute top-50 start-50 translate-middle bg-accent opacity-25 rounded-circle blur-3xl car-detail-blob"></div>
                        
                        <img src={car.image} alt={car.name} className="hero-car-image" />
                    </motion.div>
                </Col>
            </Row>
        </Container>
      </section>

      {/* --- MAIN CONTENT & BOOKING --- */}
      <Container className="py-5">
        <Row className="g-5">
            
            {/* LEFT COLUMN: Details */}
            <Col lg={8}>
                <Tabs defaultActiveKey="overview" id="car-details-tab" className="custom-tabs mb-4">
                    <Tab eventKey="overview" title="Ringkasan">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-4">
                            <h4 className="fw-bold mb-3">Deskripsi Lengkap</h4>
                            <p className="text-muted lh-lg mb-5">{car.description}</p>
                            
                            <h4 className="fw-bold mb-3">Fitur Unggulan</h4>
                            <Row className="g-3">
                                {car.features.map((feature, idx) => (
                                    <Col md={6} key={idx}>
                                        <div className="d-flex align-items-center gap-3 p-3 rounded-3 border bg-white h-100">
                                            <i className="bi bi-check-circle-fill text-success fs-5"></i>
                                            <span className="fw-medium">{feature}</span>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </motion.div>
                    </Tab>
                    
                    <Tab eventKey="specs" title="Spesifikasi Teknis">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-4">
                             <Row className="g-3">
                                {Object.entries(car.specifications).map(([key, value]) => (
                                    <Col md={6} key={key}>
                                        <div className="spec-grid-item h-100">
                                            <small className="text-muted text-uppercase fw-bold ls-1 d-block mb-1">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </small>
                                            <span className="fs-5 fw-bold text-dark">{value}</span>
                                        </div>
                                    </Col>
                                ))}
                             </Row>
                        </motion.div>
                    </Tab>

                    <Tab eventKey="gallery" title="Galeri Foto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-4">
                            <Row className="g-3">
                                {car.gallery.map((img, idx) => (
                                    <Col md={6} key={idx}>
                                        <div className="overflow-hidden rounded-4 shadow-sm">
                                            <img src={img} alt="Gallery" className="gallery-thumb w-100" />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </motion.div>
                    </Tab>
                </Tabs>
            </Col>

            {/* RIGHT COLUMN: Sticky Booking Card */}
            <Col lg={4}>
                <div className="sticky-top car-detail-sticky">
                    <Card className="booking-card border-0">
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                                <div>
                                    <small className="text-muted d-block">Harga Sewa</small>
                                    <span className="h3 fw-bold text-dark mb-0">{car.price}</span>
                                </div>
                                <Badge bg="success" className="bg-opacity-10 text-success px-3 py-2">
                                    Available
                                </Badge>
                            </div>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-muted">LOKASI JEMPUT</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0"><i className="bi bi-geo-alt text-accent"></i></InputGroup.Text>
                                        <Form.Select 
                                            className="bg-light border-start-0 ps-0 car-detail-form-select"
                                            value={pickupLocation}
                                            onChange={(e) => setPickupLocation(e.target.value)}
                                        >
                                            <option>Kantor Pusat (Jakarta)</option>
                                            <option>Bandara Soekarno Hatta</option>
                                            <option>Antar ke Alamat (+Biaya)</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>

                                <Row className="g-2 mb-4">
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted">TANGGAL AMBIL</Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted">TANGGAL KEMBALI</Form.Label>
                                            <Form.Control 
                                                type="date"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Syarat Singkat */}
                                <div className="bg-info bg-opacity-10 p-3 rounded-3 mb-4">
                                    <div className="d-flex align-items-start gap-2">
                                        <i className="bi bi-info-circle-fill text-info mt-1"></i>
                                        <small className="text-dark opacity-75">
                                            Harga termasuk Driver & BBM. Durasi sewa dihitung per 12 Jam. Overtime 10%/jam.
                                        </small>
                                    </div>
                                </div>

                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    className="w-100 rounded-pill fw-bold btn-primary-glow"
                                    onClick={handleBooking}
                                >
                                    Lanjutkan Pemesanan
                                </Button>
                                <div className="text-center mt-3">
                                    <small className="text-muted">Belum dikenakan biaya</small>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Contact Support */}
                    <div className="text-center mt-4">
                        <p className="text-muted small mb-2">Butuh bantuan khusus?</p>
                        <Button 
                            variant="link" 
                            className="text-decoration-none text-accent fw-bold p-0"
                            onClick={handleCustomerService}
                        >
                            <i className="bi bi-whatsapp me-1"></i> Chat Customer Service
                        </Button>
                    </div>
                </div>
            </Col>

        </Row>
      </Container>

      {/* --- FOOTER (Simple Version) --- */}
      <footer className="bg-white py-4 mt-5 border-top">
        <Container className="text-center">
            <small className="text-muted">&copy; 2024 Rental HS. Premium Car Rental Services.</small>
        </Container>
      </footer>

    </div>
  )
}

export default CarDetail

import React, { useState, useRef, useEffect } from 'react'
import { Container, Button, Form, InputGroup, Pagination, Badge, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { aiService } from './services/aiService'
// (Data tetap sama, saya ringkas agar fokus ke UI)
const cars = [
  {
    id: 1,
    name: 'Toyota Avanza',
    image: '/src/assets/Avanza (2).jpeg',
    price: 'Rp 700.000',
    type: 'MPV Family',
    seats: '7 Kursi',
    transmission: 'Manual',
    category: 'MPV',
    fuel: 'Bensin',
    features: ['AC', 'Audio', 'ABS'],
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Toyota Inova Reborn',
    image: '/src/assets/innova reborn (2).jpeg',
    price: 'Rp 850.000',
    type: 'MPV Premium',
    seats: '8 Kursi',
    transmission: 'Manual',
    category: 'MPV',
    fuel: 'Bensin',
    features: ['AC', 'Audio', 'ABS'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Wuling Zenix Hybrid',
    image: '/src/assets/Toyota Innova Zenix 2023 - Modèle monospace compact (1).jpeg',
    price: 'Rp 1.500.000',
    type: 'Hybrid',
    seats: '5 Kursi',
    transmission: 'Automatic',
    category: 'Sedan',
    fuel: 'Hybrid',
    features: ['Hybrid', 'AC', 'Audio'],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Toyota Fortuner',
    image: '/src/assets/fortuner (2).jpeg',
    price: 'Rp 1.700.000',
    type: 'SUV',
    seats: '7 Kursi',
    transmission: 'Automatic',
    category: 'SUV',
    fuel: 'Diesel',
    features: ['4x4', 'AC', 'Audio'],
    rating: 4.9,
    reviews: 203
  },
  {
    id: 5,
    name: 'Toyota Alphard',
    image: '/src/assets/Toyota Alphard 2022 Price Philippines & Official Promos.jpeg',
    price: 'Rp 3.500.000',
    type: 'Luxury MPV',
    seats: '7 Kursi',
    transmission: 'Automatic',
    category: 'MPV',
    fuel: 'Bensin',
    features: ['Premium', 'Ottoman'],
    rating: 5.0,
    reviews: 67
  },
  {
    id: 6,
    name: 'Toyota Hiace Commuter',
    image: '/src/assets/haiace Commuter.jpeg',
    price: 'Rp 1.300.000',
    type: 'Van',
    seats: '15 Kursi',
    transmission: 'Manual',
    category: 'Van',
    fuel: 'Diesel',
    features: ['AC', 'High Roof'],
    rating: 4.6,
    reviews: 98
  },
    {
    id: 7,
    name: 'Toyota Hiace Premio',
    image: '/src/assets/premio.jpeg',
    price: 'Rp 1.500.000',
    type: 'Van',
    seats: '12 Kursi',
    transmission: 'Manual',
    category: 'Van',
    fuel: 'Diesel',
    features: ['AC', 'Premium'],
    rating: 4.8,
    reviews: 55
  },
   {
    id: 8,
    name: 'Mercedes-Benz Wedding Car',
    image: '/src/assets/wedding car mercy.jpeg',
    price: 'Rp 2.800.000',
    type: 'Luxury',
    seats: '4 Kursi',
    transmission: 'Auto',
    category: 'Sedan',
    fuel: 'Bensin',
    features: ['Sunroof', 'Leather'],
    rating: 5.0,
    reviews: 22
  },
   {
    id: 9,
    name: 'Medium Bus 30 Seat',
    image: '/src/assets/medium bus.jpeg',
    price: 'Rp 2.500.000',
    type: 'Bus',
    seats: '30 Kursi',
    transmission: 'Manual',
    category: 'Bus',
    fuel: 'Diesel',
    features: ['Audio', 'Reclining'],
    rating: 4.5,
    reviews: 40
  }
]

// --- SKELETON LOADING COMPONENT ---
const CarSkeleton = () => (
  <div className="car-card-modern h-100">
    <div className="car-image-wrapper skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-badge"></div>
      <div className="skeleton-rating"></div>
    </div>
    <div className="car-content">
      <div className="skeleton-title"></div>
      <div className="car-features">
        <div className="skeleton-feature"></div>
        <div className="skeleton-feature"></div>
        <div className="skeleton-feature"></div>
      </div>
      <div className="car-price-section">
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  </div>
)

// --- AI ASSISTANT COMPONENT ---
interface Message {
  role: 'user' | 'ai';
  content: string | {
    text: string;
    rec?: {
      name: string;
      score: number;
      reason: string;
      features: string[];
      price: string;
    };
  };
}

function AiAssistant() {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 || isChatLoading) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [messages, isChatLoading])

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const handleSend = async (text: string) => {
    if (!text.trim()) return
    
    setShowWelcome(false) // Sembunyikan sapaan awal
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setChatInput('')
    setIsChatLoading(true)

    try {
      // Gunakan AI service yang sesungguhnya
      const result = await aiService.generateCarRecommendation(text, cars)
      
      // Format response untuk chat interface
      const aiResponse = {
        text: result.response,
        rec: result.recommendations.length > 0 ? {
          name: result.recommendations[0].carName,
          score: result.recommendations[0].matchScore,
          reason: result.recommendations[0].reason,
          features: result.recommendations[0].keyFeatures,
          price: result.recommendations[0].price
        } : undefined
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    } catch (error) {
      console.error('AI Error:', error)
      const errorMessage = {
        text: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi atau gunakan filter manual.",
        rec: undefined
      }
      setMessages(prev => [...prev, { role: 'ai', content: errorMessage }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const suggestions = [
    { text: "Carikan mobil keluarga untuk 7 orang", icon: "bi-people" },
    { text: "Saya butuh SUV untuk ke jalan pegunungan", icon: "bi-tree" },
    { text: "Rekomendasi mobil irit bbm dalam kota", icon: "bi-fuel-pump" },
    { text: "Mobil mewah untuk tamu VIP / Wedding", icon: "bi-stars" },
  ]

  return (
    <section className="ai-nexus-section">
      <Container>
        <div className="gemini-chat-container">
          
          {/* 1. WELCOME STATE (Hanya muncul jika belum ada chat) */}
          {showWelcome && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="ai-welcome-text"
            >
              <div>
                <span className="gradient-text">Hello, Traveler</span>
              </div>
              <div className="sub-welcome">Apa rencana perjalananmu hari ini?</div>
            </motion.div>
          )}

          {/* 2. CHAT HISTORY */}
          <div className="chat-scroll-area">
            {messages.map((msg, idx) => (
              <div key={idx} className="gemini-msg">
                <div className="gemini-avatar">
                  {msg.role === 'ai' ? (
                    <div className="avatar-ai-icon"></div>
                  ) : (
                    <div className="avatar-user-icon">A</div>
                  )}
                </div>
                <div className="gemini-content w-100">
                  {typeof msg.content === 'string' ? (
                    <div>{msg.content}</div>
                  ) : (
                    <div>
                      <p>{msg.content.text}</p>
                      {/* Recommendation Card */}
                      {msg.content.rec && (
                        <div className="gemini-result-card">
                          <div className="match-score-badge">
                            <i className="bi bi-stars"></i> {msg.content.rec.score}% Match
                          </div>
                          <h4 className="result-title">{msg.content.rec.name}</h4>
                          <p className="text-muted small mb-0">{msg.content.rec.reason}</p>
                          
                          <div className="result-features">
                            {msg.content.rec.features.map((f: string, i: number) => (
                              <span key={i} className="feature-pill">{f}</span>
                            ))}
                          </div>

                          <div className="result-action">
                            <div>
                              <small className="text-muted d-block">Harga Sewa</small>
                              <span className="price-text">{msg.content.rec.price}</span>
                            </div>
                            {(() => {
                              const content = msg.content;
                              const rec = typeof content === 'object' && content && 'rec' in content ? content.rec : null;
                              const recommendedCar = rec && rec.name ? cars.find(car => car.name === rec.name) : null;
                              return recommendedCar ? (
                                <Link to={`/car/${recommendedCar.id}`}>
                                  <button className="btn-view-gemini">Lihat Unit</button>
                                </Link>
                              ) : (
                                <button 
                                  className="btn-view-gemini"
                                  onClick={() => document.getElementById('car-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                  Lihat Unit
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading State */}
            {isChatLoading && (
              <div className="gemini-msg">
                <div className="gemini-avatar"><div className="avatar-ai-icon"></div></div>
                <div className="gemini-content">
                   <div className="d-flex align-items-center gap-2 text-muted">
                      <Spinner animation="grow" size="sm" /> Sedang berpikir...
                   </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
            
            {/* Scroll to Bottom Button */}
            {messages.length > 2 && (
              <button 
                className="scroll-to-bottom-btn"
                onClick={scrollToBottom}
                title="Scroll ke pesan terbaru"
              >
                <i className="bi bi-chevron-down"></i>
              </button>
            )}
          </div>

          {/* 3. SUGGESTIONS GRID (Hilang setelah chat dimulai) */}
          {showWelcome && (
            <div className="suggestion-grid">
              {suggestions.map((s, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="suggestion-card"
                  onClick={() => handleSend(s.text)}
                >
                  <span className="suggestion-text">{s.text}</span>
                  <div className="suggestion-icon">
                    <i className={`bi ${s.icon}`}></i>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* 4. INPUT AREA (Sticky Bottom) */}
          <div className="input-area-wrapper">
            <div className="gemini-input-box">
              <input 
                type="text" 
                className="gemini-input"
                placeholder="Tanya Rental HS AI..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend(chatInput);
                  }
                }}
                disabled={isChatLoading}
              />
              <button 
                className="btn-send-gemini"
                onClick={() => handleSend(chatInput)}
                disabled={!chatInput.trim() || isChatLoading}
                title="Kirim pesan"
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
            <div className="text-center mt-3">
               <small className="text-muted disclaimer-text">
                 Rental HS AI dapat membuat kesalahan. Mohon verifikasi informasi ketersediaan.
               </small>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

// --- COMPONENT ---
function ArmadaGallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  // Config Pagination
  const carsPerPage = 6
  const categories = ['Semua', ...new Set(cars.map(car => car.category))]

  // Simulate loading effect
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Logic Filter & Sort
  const filteredCars = cars
    .filter(car => {
      const matchSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCat = selectedCategory === 'Semua' || car.category === selectedCategory
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))
      if (sortBy === 'price-high') return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''))
      if (sortBy === 'rating') return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })

  // Logic Slice Data
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)
  const paginatedCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* --- 1. HERO SECTION (PREMIUM DESIGN) --- */}
      <section className="armada-hero position-relative vh-100 d-flex align-items-center overflow-hidden">
        {/* Background dengan gradient dan pattern */}
        <div className="hero-bg-gradient position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="hero-bg-pattern position-absolute top-0 start-0 w-100 h-100"></div>

        

        <Container className="position-relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge bg="light" text="dark" className="mb-4 px-4 py-3 rounded-pill fw-bold shadow-lg">
                <i className="bi bi-car-front-fill me-2 text-primary"></i>
                Complete Fleet Collection
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="display-4 fw-bold mb-4 hero-title"
            >
              Temukan Mobil Impian Anda
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lead mb-5 hero-subtitle"
            >
              Dari city car yang lincah hingga luxury SUV yang mewah.
              <br />
              Armada lengkap dengan standar kualitas tertinggi untuk perjalanan Anda.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="d-flex justify-content-center gap-5 flex-wrap mb-5"
            >
              <div className="text-center">
                <div className="display-6 fw-bold text-white">{cars.length}+</div>
                <div className="small opacity-75">Unit Armada</div>
              </div>
              <div className="text-center">
                <div className="display-6 fw-bold text-white">24/7</div>
                <div className="small opacity-75">Layanan Support</div>
              </div>
              <div className="text-center">
                <div className="display-6 fw-bold text-white">100%</div>
                <div className="small opacity-75">Kondisi Prima</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <Button
                variant="light"
                size="lg"
                className="rounded-pill px-5 py-3 fw-bold shadow-lg btn-hero-glow"
                onClick={() => document.getElementById('car-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <i className="bi bi-arrow-down-circle me-2"></i>
                Jelajahi Armada
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="scroll-indicator position-absolute bottom-0 start-50 translate-middle-x mb-4"
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </motion.div>
      </section>

      {/* --- AI NEXUS SECTION (Futuristic Dark Mode) --- */}
      <AiAssistant />

      {/* --- 2. FILTER BAR (ULTRA MODERN DESIGN) --- */}
      <section className="filters-section-modern py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Filter Header */}
            <div className="text-center mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-4 py-2 mb-3">
                  <i className="bi bi-funnel-fill me-2"></i>Smart Filters
                </Badge>
                <h3 className="fw-bold text-dark mb-1">Temukan Mobil yang Tepat</h3>
                <p className="text-muted small">Gunakan filter canggih untuk menemukan mobil impian Anda</p>
              </motion.div>
            </div>

            {/* Main Filter Cards */}
            <div className="filter-cards-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="filter-cards-grid"
              >
                {/* Search Card */}
                <div className="filter-card-modern">
                  <div className="filter-card-header">
                    <div className="filter-icon">
                      <i className="bi bi-search"></i>
                    </div>
                    <span className="filter-label">Cari Mobil</span>
                  </div>
                  <div className="filter-card-body">
                    <InputGroup className="modern-input-group">
                      <InputGroup.Text className="modern-input-icon">
                        <i className="bi bi-search text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Nama mobil atau tipe..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="modern-input"
                      />
                      {searchTerm && (
                        <InputGroup.Text
                          className="modern-input-clear"
                          onClick={() => setSearchTerm('')}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </InputGroup.Text>
                      )}
                    </InputGroup>
                  </div>
                </div>

                {/* Category Card */}
                <div className="filter-card-modern">
                  <div className="filter-card-header">
                    <div className="filter-icon">
                      <i className="bi bi-tag"></i>
                    </div>
                    <span className="filter-label">Kategori</span>
                  </div>
                  <div className="filter-card-body">
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                      className="modern-select"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'Semua' ? '🎯 Semua Kategori' : `🚗 ${category}`}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>

                {/* Sort Card */}
                <div className="filter-card-modern">
                  <div className="filter-card-header">
                    <div className="filter-icon">
                      <i className="bi bi-sort-down"></i>
                    </div>
                    <span className="filter-label">Urutkan</span>
                  </div>
                  <div className="filter-card-body">
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="modern-select"
                    >
                      <option value="name">📝 Nama A-Z</option>
                      <option value="price-low">💰 Harga Rendah</option>
                      <option value="price-high">💎 Harga Tinggi</option>
                      <option value="rating">⭐ Rating Terbaik</option>
                    </Form.Select>
                  </div>
                </div>

                {/* Results Stats Card */}
                <div className="filter-card-modern results-card">
                  <div className="filter-card-header">
                    <div className="filter-icon results-icon">
                      <i className="bi bi-graph-up"></i>
                    </div>
                    <span className="filter-label">Hasil</span>
                  </div>
                  <div className="filter-card-body">
                    <div className="results-display">
                      <div className="results-number">{filteredCars.length}</div>
                      <div className="results-label">Mobil Ditemukan</div>
                      <div className="results-progress">
                        <div
                          className="progress-bar-modern"
                          data-progress={`${(filteredCars.length / cars.length) * 100}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="quick-actions-bar"
              >
                <div className="quick-actions-content">
                  <div className="quick-actions-left">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {setSearchTerm(''); setSelectedCategory('Semua'); setSortBy('name'); setCurrentPage(1);}}
                      className="quick-action-btn reset-btn"
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Reset Semua
                    </Button>
                  </div>
                  <div className="quick-actions-right">
                    <Button
                      variant="primary"
                      size="sm"
                      className="quick-action-btn scroll-btn"
                      onClick={() => document.getElementById('car-grid')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <i className="bi bi-grid me-2"></i>
                      Lihat Armada
                      <i className="bi bi-chevron-down ms-2"></i>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* --- 3. CAR GRID SECTION --- */}
      <section id="car-grid" className="car-listing-section py-5">
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
              <i className="bi bi-car-front-fill me-2"></i>Premium Fleet Collection
            </Badge>
            <h2 className="display-5 fw-bold mb-3 text-dark">Pilihan Armada Premium</h2>
            <p className="lead text-muted mb-4 max-w-2xl mx-auto">
              Temukan mobil impian Anda dengan kualitas terbaik, teknologi terkini, dan layanan profesional untuk perjalanan yang tak terlupakan.
            </p>
          </motion.div>

          {/* Car Grid */}
          {isLoading ? (
            <div className="car-grid">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <CarSkeleton />
                </motion.div>
              ))}
            </div>
          ) : paginatedCars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-5"
            >
              <div className="empty-state-icon mb-4">
                <i className="bi bi-search display-1 text-muted"></i>
              </div>
              <h3 className="text-muted mb-3">Tidak ada mobil ditemukan</h3>
              <p className="text-muted mb-4">Coba ubah kriteria pencarian Anda</p>
              <Button
                variant="outline-primary"
                onClick={() => {setSearchTerm(''); setSelectedCategory('Semua'); setSortBy('name'); setCurrentPage(1);}}
                className="rounded-pill px-4"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>Reset Filter
              </Button>
            </motion.div>
          ) : (
            <div className="car-grid">
              {paginatedCars.map((car, index) => (
                <motion.div
                  key={car.id}
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
                  className="h-100"
                >
                  <div className="car-card-modern h-100">
                    {/* Image Section */}
                    <div className="car-image-wrapper">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="car-image-modern"
                        loading="lazy"
                      />
                      <div className="car-badge-type">{car.category}</div>
                      <div className="car-rating">
                        <i className="bi bi-star-fill"></i>
                        <span>{car.rating}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="car-content">
                      <h3 className="car-title">{car.name}</h3>

                      <div className="car-features">
                        <div className="car-feature-badge">
                          <i className="bi bi-people"></i>
                          {car.seats}
                        </div>
                        <div className="car-feature-badge">
                          <i className="bi bi-gear-wide"></i>
                          {car.transmission}
                        </div>
                        <div className="car-feature-badge">
                          <i className="bi bi-fuel-pump"></i>
                          {car.fuel}
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
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="d-flex justify-content-center mt-5"
            >
              <Pagination className="gap-2">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  const isCurrentPage = pageNumber === currentPage
                  const isNearCurrent = Math.abs(pageNumber - currentPage) <= 2

                  if (isCurrentPage || isNearCurrent || pageNumber === 1 || pageNumber === totalPages) {
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={isCurrentPage}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    )
                  } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                    return <Pagination.Ellipsis key={pageNumber} />
                  }
                  return null
                })}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </motion.div>
          )}
        </Container>
      </section>

      
    </div>
  )
}

export default ArmadaGallery
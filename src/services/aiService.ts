import axios from 'axios'

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface CarRecommendation {
  carName: string
  reason: string
  matchScore: number
  keyFeatures: string[]
  price: string
}

export interface CarData {
  id: number
  name: string
  type: string
  seats: string
  transmission: string
  fuel: string
  category: string
  price: string
  features: string[]
  image: string
  rating: number
  reviews: number
}

class AIService {
  private apiKey: string

  constructor() {
    this.apiKey = OPENROUTER_API_KEY || ''
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file')
    }
  }

  async generateCarRecommendation(userInput: string, availableCars: CarData[]): Promise<{
    response: string
    recommendations: CarRecommendation[]
  }> {
    if (!this.apiKey) {
      return {
        response: "Maaf, fitur AI sedang dalam maintenance. Silakan gunakan filter manual untuk mencari mobil.",
        recommendations: []
      }
    }

    try {
      const carList = availableCars.map(car => ({
        id: car.id,
        name: car.name,
        type: car.type,
        seats: car.seats,
        transmission: car.transmission,
        fuel: car.fuel,
        category: car.category,
        price: car.price,
        features: car.features
      }))

      const systemPrompt = `Anda adalah Rental HS AI Assistant, asisten AI cerdas generasi terdepan untuk aplikasi rental mobil Rental HS. Anda memiliki kemampuan analisis mendalam dan pemahaman konteks yang luar biasa.

KEAHLIAN UTAMA ANDA:
1. Analisis Kebutuhan Pengguna - Pahami konteks mendalam dari permintaan user
2. Rekomendasi Presisi - Cocokkan mobil dengan kebutuhan spesifik user
3. Penjelasan Detail - Berikan alasan logis dan data-driven
4. Optimisasi Anggaran - Sarankan opsi terbaik dalam budget
5. Prediksi Kebutuhan - Antisipasi kebutuhan tambahan user

ANALISIS KEBUTUHAN USER (SELALU LAKUKAN):
- Budget: Ekstrak range harga dari konteks percakapan
- Jumlah Penumpang: Analisis untuk keluarga, rombongan, atau personal
- Tujuan Perjalanan: Liburan, bisnis, off-road, harian, dll
- Durasi: Jangka pendek vs jangka panjang
- Preferensi: Merek, fitur khusus, tipe transmisi, bahan bakar
- Lokasi: Pertimbangkan kondisi jalan dan cuaca

DATA MOBIL TERSEDIA:
${JSON.stringify(carList, null, 2)}

ALGORITMA MATCHING CERDAS:
🎯 PRIORITAS UTAMA (90-100% match):
- Toyota Avanza/Innova: Budget terbatas, keluarga, handal
- Toyota Alphard: Premium, keluarga besar, mewah
- Mercedes-Benz: Bisnis, eksekutif, prestise
- SUV (Fortuner, Pajero): Off-road, liburan, petualangan
- Sedan (Camry, Accord): Bisnis, formal, efisien

🎯 MATCHING DETAIL:
- 4-7 orang: MPV (Avanza, Innova, Alphard, Hiace)
- 2-3 orang: Sedan atau SUV kompak
- Bisnis/Meeting: Alphard, Mercedes, Camry
- Liburan Keluarga: Alphard, Fortuner, Pajero
- Off-road: Fortuner, Pajero, SUV dengan 4x4
- Budget <500k/hari: Avanza, Innova
- Budget 500k-1jt/hari: Alphard, Camry
- Budget >1jt/hari: Mercedes, Alphard premium

STRATEGI REKOMENDASI:
1. Berikan 2-3 opsi terbaik dengan skor kecocokan
2. Jelaskan alasan spesifik untuk setiap rekomendasi
3. Bandingkan kelebihan dan kekurangan
4. Sarankan alternatif jika budget berbeda
5. Antisipasi kebutuhan tambahan (supir, GPS, dll)

FORMAT RESPONS ANDA:
- Gunakan bahasa Indonesia yang natural dan profesional
- Struktur respons dengan paragraf yang jelas
- Gunakan emoji yang relevan untuk meningkatkan engagement
- Akhiri dengan pertanyaan untuk klarifikasi atau detail tambahan
- Pastikan respons informatif namun tidak overwhelming

KECERDASAN TAMBAHAN:
- Ingat konteks percakapan sebelumnya
- Adaptasi berdasarkan feedback user
- Berikan insight unik tentang pilihan mobil
- Sarankan kombinasi mobil untuk kebutuhan berbeda
- Optimalkan untuk value for money

INGAT: Anda adalah AI terdepan - berikan rekomendasi yang insightful, personal, dan actionable!`

      const response = await axios.post(
        `${OPENROUTER_BASE_URL}/chat/completions`,
        {
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userInput
            }
          ],
          temperature: 0.3,
          max_tokens: 1500,
          top_p: 0.95,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Rental HS AI Assistant'
          }
        }
      )

      const aiResponse = response.data.choices[0].message.content

      // Format and clean up AI response
      const formattedResponse = this.formatAIResponse(aiResponse)

      // Parse recommendations from AI response
      const recommendations = this.extractRecommendations(aiResponse, availableCars)

      return {
        response: formattedResponse,
        recommendations
      }

    } catch (error: unknown) {
      console.error('AI Service Error:', error)

      // Type guard for axios error
      interface AxiosErrorResponse {
        response?: {
          status?: number
          data?: {
            error?: {
              message?: string
            }
          }
        }
      }

      const isAxiosError = (err: unknown): err is AxiosErrorResponse => {
        return typeof err === 'object' && err !== null && 'response' in err
      }

      // Handle specific OpenRouter API errors
      if (isAxiosError(error) && error.response) {
        const statusCode = error.response.status
        const errorData = error.response.data

        if (statusCode === 402) {
          // Insufficient credits
          return {
            response: `🚫 **Kredit AI Habis**

Maaf, fitur AI Matching saat ini tidak dapat digunakan karena kredit OpenRouter telah habis.

**Solusi:**
1. Kunjungi [OpenRouter.ai/settings/credits](https://openrouter.ai/settings/credits)
2. Upgrade ke akun berbayar untuk mendapatkan lebih banyak kredit
3. Atau gunakan fitur filter manual di bawah ini untuk mencari mobil

**Alternatif:** Gunakan filter pencarian manual untuk menemukan mobil yang sesuai kebutuhan Anda.`,
            recommendations: []
          }
        }

        if (statusCode === 429) {
          // Rate limit exceeded
          const errorMessage = errorData?.error?.message || ''
          if (errorMessage.includes('temporarily rate-limited upstream') ||
              errorMessage.includes('upstream') ||
              errorMessage.includes('rate-limited')) {
            return {
              response: `⏱️ **Batas Permintaan Provider AI**

Provider AI (Google) sedang membatasi permintaan untuk model ini. Ini adalah batas dari provider, bukan dari OpenRouter.

**Solusi:**
1. Tunggu beberapa saat sebelum mencoba lagi
2. Gunakan model AI yang berbeda (akan dicoba secara otomatis)
3. Atau gunakan filter manual di bawah ini

**Alternatif:** Gunakan filter pencarian manual untuk menemukan mobil yang sesuai.`,
              recommendations: []
            }
          }
          // Generic rate limit
          return {
            response: `⏱️ **Terlalu Banyak Permintaan**

Sistem AI sedang sibuk. Silakan tunggu beberapa saat sebelum mencoba lagi.

**Alternatif:** Gunakan filter pencarian manual untuk menemukan mobil yang sesuai.`,
            recommendations: []
          }
        }

        if (statusCode === 401) {
          // Invalid API key
          return {
            response: `🔐 **Konfigurasi API Error**

Fitur AI sedang dalam maintenance. Silakan gunakan filter manual untuk mencari mobil.`,
            recommendations: []
          }
        }

        if (statusCode === 400) {
          // Bad request - often model doesn't support system instructions
          const errorMessage = errorData?.error?.message || ''
          if (errorMessage.includes('Developer instruction is not enabled') ||
              errorMessage.includes('system instructions') ||
              errorMessage.includes('system message')) {
            return {
              response: `🔧 **Model AI Tidak Mendukung Instruksi Sistem**

Model AI yang dipilih tidak mendukung instruksi sistem yang diperlukan untuk rekomendasi cerdas.

**Alternatif:** Gunakan filter pencarian manual untuk menemukan mobil yang sesuai kebutuhan Anda.`,
              recommendations: []
            }
          }
          // Generic bad request
          return {
            response: `⚠️ **Permintaan Tidak Valid**

Terjadi kesalahan dalam format permintaan ke layanan AI.

**Alternatif:** Gunakan filter pencarian manual untuk menemukan mobil yang sesuai.`,
            recommendations: []
          }
        }

        if (statusCode === 404) {
          // Model not found or unavailable
          return {
            response: `🔄 **Model AI Tidak Tersedia**

Model AI yang digunakan saat ini tidak tersedia. Sistem akan menggunakan alternatif atau fitur manual.

**Alternatif:** Gunakan filter pencarian manual untuk menemukan mobil yang sesuai kebutuhan Anda.`,
            recommendations: []
          }
        }

        if (statusCode && statusCode >= 500) {
          // Server error
          return {
            response: `🔧 **Server Error**

Layanan AI sedang mengalami gangguan teknis. Silakan coba lagi nanti atau gunakan filter manual.`,
            recommendations: []
          }
        }

        // Generic API error with message from response
        if (errorData?.error?.message) {
          return {
            response: `⚠️ **Error AI Service**

${errorData.error.message}

Silakan gunakan filter manual untuk mencari mobil yang sesuai kebutuhan Anda.`,
            recommendations: []
          }
        }
      }

      // Network or other errors
      if (!isAxiosError(error) || !error.response) {
        return {
          response: `🌐 **Koneksi Error**

Tidak dapat terhubung ke layanan AI. Periksa koneksi internet Anda dan coba lagi.

**Alternatif:** Gunakan filter pencarian manual yang tersedia.`,
          recommendations: []
        }
      }

      // Generic fallback
      return {
        response: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi atau gunakan filter manual.",
        recommendations: []
      }
    }
  }

  private extractRecommendations(aiResponse: string, availableCars: CarData[]): CarRecommendation[] {
    // Enhanced parsing - look for car names with context
    const carNames = availableCars.map(car => ({
      lowerName: car.name.toLowerCase(),
      car: car
    }))

    // Score each car based on AI response analysis
    const scoredCars = carNames.map(({ lowerName, car }) => {
      let score = 0
      let mentions = 0
      const responseLower = aiResponse.toLowerCase()

      // Direct mentions
      if (responseLower.includes(lowerName)) {
        score += 50
        mentions += responseLower.split(lowerName).length - 1
      }

      // Category matching
      const categoryKeywords = {
        'mpv': ['mpv', 'keluarga', 'rombongan', '7 orang', 'avanza', 'innova', 'alphard'],
        'suv': ['suv', 'off-road', 'petualangan', 'fortuner', 'pajero'],
        'sedan': ['sedan', 'bisnis', 'eksekutif', 'camry', 'accord'],
        'luxury': ['luxury', 'premium', 'mewah', 'mercedes', 'alphard']
      }

      Object.entries(categoryKeywords).forEach(([category, keywords]) => {
        if (keywords.some(keyword => responseLower.includes(keyword))) {
          if (car.category.toLowerCase().includes(category) ||
              car.type.toLowerCase().includes(category)) {
            score += 20
          }
        }
      })

      // Price range matching
      const priceMatch = aiResponse.match(/(\d+(?:\.\d+)?)\s*(?:ribu|rb|juta|jt|k|k\/hari)/gi)
      if (priceMatch) {
        const mentionedPrices = priceMatch.map(match => {
          const num = parseFloat(match.replace(/[^\d.]/g, ''))
          return match.includes('juta') || match.includes('jt') ? num * 1000000 :
                 match.includes('ribu') || match.includes('rb') ? num * 1000 : num
        })

        const carPrice = parseFloat(car.price.replace(/[^\d.]/g, '')) || 0
        const priceDiff = Math.abs(carPrice - mentionedPrices[0])
        if (priceDiff < carPrice * 0.3) { // Within 30% range
          score += 25
        }
      }

      // Passenger count matching
      const passengerMatch = aiResponse.match(/(\d+)\s*orang/gi)
      if (passengerMatch) {
        const mentionedPassengers = parseInt(passengerMatch[0])
        const carSeats = parseInt(car.seats) || 0
        if (Math.abs(carSeats - mentionedPassengers) <= 2) {
          score += 15
        }
      }

      return {
        car,
        score: Math.min(100, score + (mentions * 10)), // Cap at 100, bonus for multiple mentions
        mentions
      }
    })

    // Sort by score and take top recommendations
    const topCars = scoredCars
      .filter(item => item.score > 30) // Only include cars with meaningful scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    // Convert to recommendation format
    return topCars.map(({ car, score }) => ({
      carName: car.name,
      reason: this.generateSmartReason(car, score),
      matchScore: score,
      keyFeatures: this.extractRelevantFeatures(car, aiResponse),
      price: car.price
    }))
  }

  private generateSmartReason(car: CarData, score: number): string {
    const reasons = []

    if (score >= 90) {
      reasons.push("Pencocokan sempurna dengan kebutuhan Anda")
    } else if (score >= 75) {
      reasons.push("Sangat cocok untuk kebutuhan spesifik Anda")
    } else if (score >= 60) {
      reasons.push("Cocok dengan beberapa kriteria utama")
    }

    // Add specific reasons based on car features
    if (car.type.toLowerCase().includes('mpv')) {
      reasons.push("Ideal untuk perjalanan keluarga atau rombongan")
    }
    if (car.type.toLowerCase().includes('suv')) {
      reasons.push("Cocok untuk petualangan dan berbagai kondisi jalan")
    }
    if (car.type.toLowerCase().includes('sedan')) {
      reasons.push("Tepat untuk perjalanan bisnis dan formal")
    }

    return reasons.join(". ") + "."
  }

  private extractRelevantFeatures(car: CarData, aiResponse: string): string[] {
    const relevantFeatures: string[] = []
    const responseLower = aiResponse.toLowerCase()

    // Map common requirements to features
    const featureMap = {
      'ac': ['ac', 'pendingin', 'udara'],
      'audio': ['audio', 'musik', 'sound system'],
      'gps': ['gps', 'navigasi', 'peta'],
      'bluetooth': ['bluetooth', 'handsfree'],
      'usb': ['usb', 'charging'],
      'sunroof': ['sunroof', 'atap'],
      'leather': ['leather', 'kulit', 'mewah'],
      'automatic': ['automatic', 'otomatis', 'transmisi']
    }

    car.features.forEach(feature => {
      const featureLower = feature.toLowerCase()
      for (const [, keywords] of Object.entries(featureMap)) {
        if (keywords.some(keyword => responseLower.includes(keyword)) &&
            keywords.some(keyword => featureLower.includes(keyword))) {
          relevantFeatures.push(feature)
          break
        }
      }
    })

    // If no specific features matched, return top 3 general features
    if (relevantFeatures.length === 0) {
      return car.features.slice(0, 3)
    }

    return relevantFeatures.slice(0, 3)
  }

  private formatAIResponse(aiResponse: string): string {
    if (!aiResponse) return aiResponse

    return aiResponse
      // Remove excessive whitespace and normalize line breaks
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+$/gm, '')
      .replace(/^\s+/gm, '')
      // Clean up common AI response artifacts
      .replace(/\*\*\s*\*\*/g, '') // Remove empty bold markers
      .replace(/\*\s+\*/g, '') // Remove single asterisk formatting
      .replace(/\*\*([^*]+)\*\*/g, '**$1**') // Normalize bold formatting
      // Ensure proper spacing after punctuation
      .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2')
      // Format numbered lists properly
      .replace(/(\d+)\.\s*([^\n])/g, '$1. $2')
      // Format bullet points
      .replace(/[-*]\s*([^\n])/g, '• $1')
      // Clean up multiple spaces
      .replace(/ {2,}/g, ' ')
      // Remove trailing punctuation duplicates
      .replace(/([.!?])\1+/g, '$1')
      // Ensure proper paragraph breaks
      .replace(/([.!?])\s*\n\s*([A-Z])/g, '$1\n\n$2')
      // Trim final result
      .trim()
  }
}

export const aiService = new AIService()
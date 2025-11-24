# 🚗 Rental HS - Aplikasi Rental Mobil Modern

Aplikasi web rental mobil modern dengan AI Assistant cerdas menggunakan React, TypeScript, dan Vite.

## ✨ Fitur Utama

- 🎨 **UI/UX Modern** - Desain futuristik dengan animasi smooth
- 🤖 **AI Assistant** - Rekomendasi mobil cerdas menggunakan OpenRouter API
- 📱 **Responsive Design** - Optimal di desktop dan mobile
- 🔍 **Smart Filtering** - Filter canggih berdasarkan kategori, harga, rating
- ⚡ **Performance** - Build dengan Vite untuk kecepatan maksimal

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn
- API Key OpenRouter (untuk fitur AI)

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd rental-hs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Copy `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` dan isi API key OpenRouter:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

   **Cara mendapatkan API Key:**
   - Kunjungi [OpenRouter.ai](https://openrouter.ai/keys)
   - Buat akun dan generate API key
   - Copy key dan paste ke file `.env`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   ```
   http://localhost:5173
   ```

## 🤖 AI Assistant Setup

### Tanpa AI (Fallback Mode)
Jika tidak ada API key, aplikasi akan berjalan dalam mode manual dengan filter standar.

### Dengan AI (Full Mode)
1. Setup API key OpenRouter
2. AI akan memberikan rekomendasi mobil berdasarkan:
   - Kebutuhan penumpang
   - Budget pengguna
   - Tujuan perjalanan
   - Preferensi khusus

### Model AI yang Digunakan
- **Primary**: Meta Llama 3.1 8B Instruct
- **Fallback**: Model alternatif jika primary tidak tersedia

## 📁 Struktur Project

```
src/
├── components/
│   ├── ArmadaGallery.tsx    # Komponen utama galeri mobil
│   └── AiAssistant.tsx      # Komponen AI chat (terintegrasi)
├── services/
│   └── aiService.ts         # Service AI menggunakan OpenRouter
├── assets/                  # Gambar dan asset statis
└── App.css                 # Styling global
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Animations**: Framer Motion
- **AI**: OpenRouter API (Meta Llama)
- **Icons**: Bootstrap Icons

## 🎯 Fitur AI Assistant

### Kemampuan AI:
- ✅ Analisis kebutuhan pengguna secara mendalam
- ✅ Rekomendasi mobil presisi berdasarkan konteks
- ✅ Perhitungan budget dan optimasi harga
- ✅ Prediksi kebutuhan tambahan
- ✅ Penjelasan detail dengan reasoning

### Contoh Percakapan:
```
User: "Saya butuh mobil untuk liburan keluarga 7 orang, budget 1jt per hari"

AI: "Berdasarkan kebutuhan keluarga 7 orang dengan budget 1jt/hari,
saya rekomendasikan Toyota Alphard dengan skor kecocokan 95%.
Alasan: Captain seat yang luas, suspensi empuk, cocok untuk perjalanan jauh."
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build untuk production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
npm run type-check   # TypeScript type checking
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key untuk AI | ❌ (Opsional) |

## 🚨 Troubleshooting

### AI Tidak Berfungsi
1. **Cek API Key**: Pastikan `VITE_OPENROUTER_API_KEY` sudah diisi dengan benar
2. **Cek Kredit**: Kunjungi [OpenRouter Dashboard](https://openrouter.ai/settings/credits)
3. **Rate Limit**: Tunggu beberapa saat jika mendapat error rate limit
4. **Network**: Pastikan koneksi internet stabil

### Error Build
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Sudah Digunakan
```bash
# Gunakan port berbeda
npm run dev -- --port 3000
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah:
- Buat issue di GitHub
- Email: support@rentalhs.com
- Dokumentasi lengkap: [Wiki](https://github.com/username/repo/wiki)

---

**Made with ❤️ by Rental HS Team**
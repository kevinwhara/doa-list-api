# API Doa Islami

API RESTful untuk mengakses doa-doa Islami sehari-hari dalam bahasa Arab, Latin, dan terjemahan Indonesia.

## 🚀 Fitur

- ✅ Doa-doa Islami sehari-hari
- ✅ Bahasa Arab, Latin, dan terjemahan
- ✅ Kategori doa yang terorganisir
- ✅ Pencarian doa
- ✅ Doa acak
- ✅ Pagination
- ✅ Dokumentasi lengkap

## 📚 Endpoint

### Root
- `GET /` - Dokumentasi API

### Doa
- `GET /api/doa` - Semua doa
- `GET /api/doa/:id` - Doa berdasarkan ID
- `GET /api/doa/kategori/:category` - Doa berdasarkan kategori
- `GET /api/doa/acak` - Doa acak

### Kategori
- `GET /api/kategori` - Semua kategori

### Pencarian
- `GET /api/cari?q=keyword` - Cari doa

### Health Check
- `GET /api/health` - Status API

## 🛠️ Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Data doa-doa Islami
const prayers = [
  {
    id: 1,
    title: "Doa Sebelum Makan",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا، وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma barik lana fima razaqtana, waqina 'adzaban nar",
    translation: "Ya Allah, berkahilah kami dalam rezeki yang Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka",
    category: "makan",
    source: "HR. Ibnu Sunni"
  },
  {
    id: 2,
    title: "Doa Sesudah Makan",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin: "Alhamdulillahil ladzi ath'amana wa saqana wa ja'alana muslimin",
    translation: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang muslim",
    category: "makan",
    source: "HR. Abu Dawud"
  },
  {
    id: 3,
    title: "Doa Masuk Masjid",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaf tahli abwaba rahmatik",
    translation: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu",
    category: "masjid",
    source: "HR. Muslim"
  },
  {
    id: 4,
    title: "Doa Keluar Masjid",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma inni as'aluka min fadhlik",
    translation: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu",
    category: "masjid",
    source: "HR. Muslim"
  },
  {
    id: 5,
    title: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    latin: "Bismikallhumma amutu wa ahya",
    translation: "Dengan nama-Mu ya Allah, aku mati dan aku hidup",
    category: "tidur",
    source: "HR. Bukhari"
  },
  {
    id: 6,
    title: "Doa Bangun Tidur",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdulillahil ladzi ahyana ba'da ma amatana wa ilaihin nushur",
    translation: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan hanya kepada-Nya kami dikembalikan",
    category: "tidur",
    source: "HR. Bukhari"
  },
  {
    id: 7,
    title: "Doa Masuk Kamar Mandi",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allahumma inni a'udzu bika minal khubutsi wal khabaits",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan",
    category: "kamar_mandi",
    source: "HR. Bukhari"
  },
  {
    id: 8,
    title: "Doa Keluar Kamar Mandi",
    arabic: "غُفْرَانَكَ",
    latin: "Ghufranak",
    translation: "Aku mohon ampunan-Mu",
    category: "kamar_mandi",
    source: "HR. Abu Dawud"
  },
  {
    id: 9,
    title: "Doa Memakai Pakaian",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latin: "Alhamdulillahil ladzi kasani hadzats tsauba wa razaqanihi min ghairi haulin minni wa la quwwatin",
    translation: "Segala puji bagi Allah yang telah memberikan pakaian ini kepadaku sebagai rezeki dari-Nya tanpa daya dan kekuatan dariku",
    category: "pakaian",
    source: "HR. Abu Dawud"
  },
  {
    id: 10,
    title: "Doa Keluar Rumah",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    latin: "Bismillahi tawakkaltu 'alallah, la haula wa la quwwata illa billah",
    translation: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan upaya kecuali dengan pertolongan Allah",
    category: "rumah",
    source: "HR. Abu Dawud"
  },
  {
    id: 11,
    title: "Doa Masuk Rumah",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    latin: "Allahumma inni as'aluka khairal mauliji wa khairal makhraji, bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkaltu",
    translation: "Ya Allah, sesungguhnya aku mohon kepada-Mu baiknya tempat masuk dan baiknya tempat keluar. Dengan menyebut nama Allah kami masuk, dan dengan menyebut nama Allah kami keluar, dan kepada Allah Tuhan kami, kami bertawakal",
    category: "rumah",
    source: "HR. Abu Dawud"
  },
  {
    id: 12,
    title: "Doa Naik Kendaraan",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    latin: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
    translation: "Maha Suci Allah yang telah menundukkan semua ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami",
    category: "perjalanan",
    source: "HR. Muslim"
  },
  {
    id: 13,
    title: "Doa Memulai Pelajaran",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    latin: "Rabbi zidni 'ilma",
    translation: "Ya Rabbku, tambahkanlah kepadaku ilmu",
    category: "belajar",
    source: "QS. Thaha: 114"
  },
  {
    id: 14,
    title: "Doa Untuk Kedua Orang Tua",
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    latin: "Rabbi rhamhuma kama rabbayani shaghira",
    translation: "Ya Tuhanku, kasihilah mereka keduanya, sebagaimana mereka berdua telah mendidik aku waktu kecil",
    category: "orang_tua",
    source: "QS. Al-Isra: 24"
  },
  {
    id: 15,
    title: "Doa Mohon Ampun",
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الأَبْرَارِ",
    latin: "Rabbana ghfir lana dzunubana wa kaffir 'anna sayyiatina wa tawaffana ma'al abrar",
    translation: "Ya Tuhan kami, ampunilah dosa-dosa kami dan hapuskanlah kesalahan-kesalahan kami, dan matikanlah kami beserta orang-orang yang berbakti",
    category: "ampunan",
    source: "QS. Ali Imran: 193"
  }
];

const categories = [
  { id: "makan", name: "Doa Makan & Minum", count: 2 },
  { id: "tidur", name: "Doa Tidur", count: 2 },
  { id: "masjid", name: "Doa Masjid", count: 2 },
  { id: "kamar_mandi", name: "Doa Kamar Mandi", count: 2 },
  { id: "pakaian", name: "Doa Pakaian", count: 1 },
  { id: "rumah", name: "Doa Rumah", count: 2 },
  { id: "perjalanan", name: "Doa Perjalanan", count: 1 },
  { id: "belajar", name: "Doa Belajar", count: 1 },
  { id: "orang_tua", name: "Doa Orang Tua", count: 1 },
  { id: "ampunan", name: "Doa Ampunan", count: 1 }
];

// Routes

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "🕌 Selamat datang di API Doa Islami",
    version: "1.0.0",
    endpoints: {
      all_prayers: "/api/doa",
      single_prayer: "/api/doa/:id",
      by_category: "/api/doa/kategori/:category",
      categories: "/api/kategori",
      random: "/api/doa/acak",
      search: "/api/cari?q=keyword"
    },
    documentation: "Gunakan endpoint di atas untuk mengakses koleksi doa-doa Islami. BTW yang bikin Kepin"
  });
});

// Get all prayers
app.get('/api/doa', (req, res) => {
  const { limit, page } = req.query;
  let result = [...prayers];

  // Pagination
  if (page && limit) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    result = result.slice(startIndex, endIndex);
  }

  res.json({
    success: true,
    total: prayers.length,
    data: result
  });
});

// Get prayer by ID
app.get('/api/doa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prayer = prayers.find(p => p.id === id);

  if (!prayer) {
    return res.status(404).json({
      success: false,
      message: "Doa tidak ditemukan"
    });
  }

  res.json({
    success: true,
    data: prayer
  });
});

// Get prayers by category
app.get('/api/doa/kategori/:category', (req, res) => {
  const category = req.params.category;
  const categoryPrayers = prayers.filter(p => p.category === category);

  if (categoryPrayers.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Kategori tidak ditemukan"
    });
  }

  res.json({
    success: true,
    category: category,
    total: categoryPrayers.length,
    data: categoryPrayers
  });
});

// Get all categories
app.get('/api/kategori', (req, res) => {
  res.json({
    success: true,
    total: categories.length,
    data: categories
  });
});

// Get random prayer
app.get('/api/doa/acak', (req, res) => {
  const randomIndex = Math.floor(Math.random() * prayers.length);
  const randomPrayer = prayers[randomIndex];

  res.json({
    success: true,
    data: randomPrayer
  });
});

// Search prayers
app.get('/api/cari', (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Parameter pencarian (q) diperlukan"
    });
  }

  const results = prayers.filter(prayer => 
    prayer.title.toLowerCase().includes(query) ||
    prayer.arabic.toLowerCase().includes(query) ||
    prayer.latin.toLowerCase().includes(query) ||
    prayer.translation.toLowerCase().includes(query) ||
    prayer.category.toLowerCase().includes(query)
  );

  res.json({
    success: true,
    query: query,
    total: results.length,
    data: results
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "API berjalan dengan baik",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// // 404 handler
// app.use('/*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Endpoint tidak ditemukan"
//   });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Terjadi kesalahan internal server"
//   });
// });

// Start server
app.listen(PORT, () => {
  console.log(`🕌 API Doa Islami berjalan di http://localhost:${PORT}`);
  console.log(`📚 Total doa: ${prayers.length}`);
  console.log(`📂 Total kategori: ${categories.length}`);
});
# TEXNIK TOPSHIRIQ (TZ)
# "UrbanPulse Samarqand" — AI va Sun'iy Yo'ldosh Monitoringi Platformasi

**Versiya:** 1.0
**Sana:** 2026-yil 24-iyul
**Loyiha turi:** Shahar infratuzilmasi monitoringi, GovTech / CivicTech
**Tayyorladi:** IdeaNova jamoasi

---

## 1. LOYIHA HAQIDA UMUMIY MA'LUMOT

### 1.1. Muammo
Samarqand va Markaziy Osiyo shaharlarida qurilish va infratuzilma loyihalarining monitoringi asosan qo'lda, insonlar tomonidan (inspektorlar, fuqarolarning fotosurat yuklashi) amalga oshiriladi. Bu quyidagi muammolarni keltirib chiqaradi:
- Inson omili va sub'ektivlik (korrupsiya xavfi, noto'g'ri hisobotlar)
- Real vaqtda kuzatuvning yo'qligi — kechikishlar kech aniqlanadi
- Fuqarolarning byudjet va qurilish jarayoni haqida shaffof ma'lumotga ega emasligi
- Shikoyat va muammolarni tegishli tashkilotga yetkazishning sekinligi

### 1.2. Yechim
UrbanPulse Samarqand — sun'iy yo'ldosh tasvirlari, drone monitoring va sun'iy intellektni birlashtirib, qurilish/infratuzilma loyihalarini **inson omilisiz, avtomatik** kuzatuvchi platforma. Tizim ochiq ma'lumotlar (Sentinel, Landsat) va AI tahlili orqali obyektiv, shaffof va real vaqtli monitoring taqdim etadi.

### 1.3. Qisqa差aralash (Positioning)
| Raqiblar | UrbanPulse Samarqand |
|---|---|
| "Odamlar fotosurat yuklaydi" | "Tizim inson omilisiz avtomatik monitoring qiladi" |
| Sub'ektiv, kech hisobotlar | Obyektiv, real vaqtli AI tahlili |
| Yopiq byudjet ma'lumotlari | Ochiq, fuqarolarga ko'rinadigan dashboard |

### 1.4. Maqsadli foydalanuvchilar
1. **Fuqarolar** — o'z mahallasidagi qurilishni kuzatish, muammo bildirish
2. **Shahar hokimiyati / qurilish nazorati organlari** — obyektiv monitoring va hisobotlar
3. **Pudratchilar** — o'z loyihalari statusini ko'rish (ixtiyoriy rol)
4. **Administratorlar** — tizimni boshqarish, AI natijalarini tasdiqlash

---

## 2. LOYIHANING MAQSAD VA VAZIFALARI

**Asosiy maqsad:** Qurilish loyihalarini avtomatik, shaffof va fuqarolar ishtirokida monitoring qiluvchi yagona platforma yaratish.

**Vazifalar:**
- Sun'iy yo'ldosh/drone tasvirlari orqali qurilish sur'atini avtomatik kuzatish
- Fuqarolarga ochiq byudjet va reja ma'lumotlarini taqdim etish
- Fuqarolik nazorati (crowd-sourcing) orqali qo'shimcha ma'lumot yig'ish
- Kechikish va qoidabuzarliklarni avtomatik aniqlash va signal berish (Red Flag)
- Mas'ul tashkilotlarga muammolarni avtomatik yo'naltirish

---

## 3. FOYDALANUVCHI ROLLARI

| Rol | Huquqlar |
|---|---|
| **Fuqaro (Citizen)** | Xaritani ko'rish, loyiha tafsilotlarini ko'rish, rasm/video yuklash, muammo bildirish, bildirishnoma olish |
| **Pudratchi (Contractor)** | O'z loyihasi statusini ko'rish, izoh qoldirish (faqat o'qish + izoh) |
| **Nazoratchi / Inspektor** | Red Flag holatlarni ko'rib chiqish, tasdiqlash/rad etish, hisobot shakllantirish |
| **Davlat organi (Xokimiyat)** | Barcha loyihalar bo'yicha umumiy statistika, hisobotlar, eksport |
| **Administrator** | Tizim sozlamalari, foydalanuvchilarni boshqarish, AI model monitoring |

---

## 4. FUNKSIONAL TALABLAR

### 4.1. Modul 1 — AI Sun'iy Yo'ldosh / Drone Progress Tracking

**Tavsif:** Qurilish ob'ektlari ochiq sun'iy yo'ldosh tasvirlari (Sentinel-2, Landsat-8/9) yoki shahar dronlari orqali muntazam skanerlanadi.

**Funksiyalar:**
- F1.1: Har bir qurilish ob'ekti uchun geo-chegara (polygon/geofence) belgilash
- F1.2: Belgilangan hudud bo'yicha davriy (masalan, har 5-10 kunda, Sentinel-2 revisit siklidan kelib chiqqan holda) tasvir yuklab olish (Sentinel Hub / Copernicus Open Access Hub API orqali)
- F1.3: AI orqali tasvirni tahlil qilish:
  - Poydevor maydoni aniqlash (segmentation)
  - Qavatlar sonini taxminiy baholash (balandlik/soyaga asoslangan tahlil yoki vaqt seriyasidagi o'zgarish tezligi)
  - Qurilish maydonidagi o'zgarish tezligini (construction velocity) hisoblash
- F1.4: Haqiqiy progressni rejadagi (Gantt/grafik) progress bilan solishtirish
- F1.5: Agar kechikish aniqlangan bo'lsa — avtomatik **"Kechikish xavfi (Red Flag)"** statusi berish
- F1.6: Drone tasvirlarini qo'shimcha aniqlik uchun integratsiya qilish imkoniyati (shahar dronlari yoki pudratchi tomonidan yuklangan rasmiy tasvirlar)
- F1.7: Har bir ob'ekt uchun vaqt bo'yicha tasvirlar tarixi (timeline) va progress grafigi
- F1.8 (UNESCO Buffer Zone): YUNESKO muhofaza zonalarini GIS qatlam sifatida kiritish va ushbu zonada aniqlangan noqonuniy balandlik hamda qurilishlarni AI orqali "Heritage Violation Flag" bilan belgilash
- F1.9 (Radar InSAR Monitoring): Sentinel-1 (InSAR) radar ma'lumotlari orqali zamin va poydevor deformatsiyalarini (±2-5mm aniqlikda) avtomatik kuzatish va xavfli cho'kishlar haqida ogohlantirish

**Kirish ma'lumotlari manbalari:**
- Sentinel-2 (10m/piksel, optik) — asosiy manba, bepul
- Sentinel-1 (SAR/InSAR, radar) — zamin deformatsiyasi va cho'kishlarni kuzatish uchun
- Landsat 8/9 (15-30m/piksel) — zaxira manba
- Shahar drone tasvirlari (agar mavjud bo'lsa) — yuqori aniqlik uchun

**Cheklov (MVP bosqichi uchun muhim):** Sentinel-2ning piksel aniqligi (10m) kichik binolarning qavat sonini aniq hisoblash uchun yetarli emas. MVP bosqichida bu modul katta/yirik infratuzilma loyihalari (yo'llar, ko'priklar, yirik binolar) uchun optimallashtiriladi; kichik obyektlar uchun drone yoki qo'lda tekshiruv bilan to'ldiriladi.

### 4.2. Modul 2 — "Ochiq Bosh Reja va Budjet" Dashboardi

**Funksiyalar:**
- F2.1: Interaktiv xarita — fuqaro o'z mahallasini/hududini tanlaydi
- F2.2: Har bir belgilangan qurilish ob'ekti bo'yicha ochiq ma'lumot:
  - Bino/inshoot turi va tavsifi
  - Pudratchi tashkilot nomi va rekvizitlari
  - Boshlanish va tugash sanasi (reja va haqiqiy)
  - Ajratilgan byudjet summasi
  - Byudjetning sarflangan foizi (agar davlat ma'lumotlar bazasidan integratsiya mavjud bo'lsa)
  - Joriy progress foizi (AI tomonidan hisoblangan)
  - Status: "Reja bo'yicha" / "Kechikish xavfi" / "Tugallangan"
- F2.3: Filtrlash va qidiruv (tuman, loyiha turi, status bo'yicha)
- F2.4: Har bir loyiha uchun batafsil sahifa (tasvirlar tarixi, hujjatlar, hisobotlar)
- F2.5: Ma'lumotlarni eksport qilish (PDF/Excel hisobot)

### 4.3. Modul 3 — Smart Crowd-Sourcing (Fuqarolik Nazorati + Geofencing)

**Funksiyalar:**
- F3.1: Mobil ilovada GPS orqali foydalanuvchining qurilish hududiga yaqinligini aniqlash (geofencing)
- F3.2: Hududga kirganda push-bildirishnoma: "Siz qurilish maydoni yaqinidasiz — muammo bormi?"
- F3.3: Fuqaro rasm/video yuklashi va muammo turini tanlashi (masalan: "Yo'l yopilgan", "Chang/shovqin me'yordan ortiq", "Xavfsizlik qoidasi buzilgan", "Chiqindi tashlangan")
- F3.4: AI orqali yuklangan rasmni tahlil qilish (computer vision — obyekt aniqlash/klassifikatsiya):
  - Chiqindi/axlat aniqlash
  - Xavfsizlik jihozlari yo'qligini aniqlash (masalan, to'siq, kaska)
  - Yo'l to'sig'ini aniqlash
- F3.5: Aniqlangan muammoni avtomatik ravishda mas'ul tashkilotga (tuman hokimligi, qurilish nazorati) yo'naltirish
- F3.6: Fuqaroga murojaat statusi bo'yicha bildirishnoma (qabul qilindi → ko'rib chiqilmoqda → hal qilindi)
- F3.7: Soxta/noto'g'ri xabarlarni filtrlash uchun reputatsiya tizimi (foydalanuvchi ishonch bali)
- F3.8 (EXIF & Proof-of-Presence): Yuklanayotgan fotosuratlarning EXIF meta-ma'lumotlarini real GPS va vaqt bilan avtomatik tekshirish (galereyadan soxta rasm yuklashni taqiqlash)
- F3.9 (Auto-Clustering): Bitta hududda ko'p fuqarolar tomonidan bildirilgan o'xshash muammolarni AI orqali bitta "Klaster Murojaat"ga biriktirish

### 4.4. Modul 4 — AI Hisobot va Bashoratli Tahlil (Predictive Analytics & Reporting)

*(Sizning ro'yxatingizda 4-band matni to'liq kiritilmagan edi — men mantiqiy davomini таклиф qildim. Agar boshqa funksiyani nazarda tutgan bo'lsangiz, o'zgartirib beraman.)*

**Funksiyalar:**
- F4.1: Barcha ob'ektlar bo'yicha avtomatik haftalik/oylik hisobot generatsiyasi
- F4.2: Kechikish sabablarini tahlil qilish va bashorat qilish (masalan, mavsumiy ob-havo ta'siri, byudjet sarfi sur'ati)
- F4.3: Pudratchilar reytingi (o'z vaqtida bajarish tarixi asosida)
- F4.4: Davlat organi uchun umumiy dashboard — barcha tuman/loyihalar bo'yicha statistika, xarita bo'yicha issiqlik xaritasi (heatmap) shaklida kechikkan loyihalar

---

## 5. TIZIM ARXITEKTURASI

```
┌─────────────────────────────────────────────────────────┐
│                    FOYDALANUVCHI QATLAMI                  │
│   Mobil ilova (iOS/Android)   |   Web Dashboard            │
└───────────────────────┬─────────────────────────────────┘
                         │ REST API / GraphQL
┌───────────────────────┴─────────────────────────────────┐
│                    BACKEND (API GATEWAY)                  │
│   Autentifikatsiya | Rol boshqaruvi | Bildirishnomalar     │
└──────┬───────────────────┬───────────────────┬───────────┘
       │                   │                   │
┌──────┴──────┐   ┌────────┴────────┐   ┌──────┴──────────┐
│ Ma'lumotlar │   │  AI/ML Servis    │   │  Geo/Xarita     │
│  bazasi     │   │  - Progress      │   │  Servis (GIS)   │
│ (PostgreSQL │   │    detection     │   │  - PostGIS      │
│  + PostGIS) │   │  - Image class.  │   │  - Yandex/Google │
│             │   │  - Anomaly detect│   │    Maps API     │
└─────────────┘   └────────┬─────────┘   └─────────────────┘
                            │
                  ┌─────────┴──────────┐
                  │ Tashqi ma'lumot     │
                  │ manbalari:          │
                  │ - Sentinel Hub API  │
                  │ - Copernicus/USGS   │
                  │ - Drone tasvirlari  │
                  └─────────────────────┘
```

---

## 6. TAVSIYA ETILGAN TEXNOLOGIK STEK

| Qatlam | Texnologiya |
|---|---|
| Mobil ilova | React Native yoki Flutter |
| Web dashboard | React / Next.js |
| Backend | Node.js (NestJS) yoki Python (FastAPI/Django) |
| Ma'lumotlar bazasi | PostgreSQL + PostGIS (geo-ma'lumotlar uchun) |
| AI/ML — Satellite tahlili | Python: PyTorch/TensorFlow, Sentinel Hub Python SDK, Google Earth Engine API |
| AI/ML — Rasm klassifikatsiyasi (crowd-sourcing) | Computer Vision model (YOLO/EfficientNet asosida, fine-tuned) |
| Xarita servisi | Yandex Maps API (O'zbekiston uchun qulay) yoki Mapbox |
| Fayl saqlash (rasm/video) | AWS S3 / MinIO (self-hosted) |
| Push-bildirishnoma | Firebase Cloud Messaging |
| Hosting | AWS / VK Cloud / mahalliy data-markaz (davlat talablariga mos) |

---

## 7. NOFUNKSIONAL TALABLAR

- **Ishlash tezligi:** Dashboard sahifalari 2 soniyadan tez yuklanishi kerak
- **Miqyoslanuvchanlik:** Butun Samarqand viloyati (keyinchalik Markaziy Osiyo) miqyosidagi ob'ektlarni qo'llab-quvvatlash
- **Xavfsizlik:** Foydalanuvchi ma'lumotlari shifrlangan holda saqlanishi, GDPR/O'zbekiston shaxsiy ma'lumotlar qonunchiligiga muvofiqlik
- **Mavjudlik:** 99% uptime (SLA)
- **Til qo'llab-quvvatlash:** O'zbek (lotin), Rus, ixtiyoriy — Ingliz

---

## 8. INTEGRATSIYALAR (kelajakda)

- Davlat qurilish nazorati organlari tizimlari (agar API mavjud bo'lsa)
- Byudjet monitoring tizimlari (moliya vazirligi ochiq ma'lumotlar portali)
- Yagona murojaatlar tizimi (masalan, "Mening fikrim" yoki tuman hokimligi tizimlari bilan integratsiya)

---

## 9. MVP BOSQICHLARI (Roadmap taklifi)

| Bosqich | Muddat (taxminiy) | Mazmuni |
|---|---|---|
| **Faza 0 — Tadqiqot** | 2-3 hafta | Sentinel API bilan tanishuv, 3-5 ta pilot ob'ekt tanlash, ma'lumot yig'ish |
| **Faza 1 — MVP Dashboard** | 4-6 hafta | Ochiq byudjet/reja dashbordi (2-modul), statik ma'lumotlar bilan |
| **Faza 2 — Satellite AI** | 6-8 hafta | 1-modulning asosiy versiyasi (bitta/ikkita yirik pilot ob'ekt uchun) |
| **Faza 3 — Crowd-sourcing** | 4-6 hafta | Mobil ilova, geofencing, rasm yuklash va AI klassifikatsiya |
| **Faza 4 — Pilot ishga tushirish** | 4 hafta | Bitta tuman/mahalla bilan pilot loyiha, fikr-mulohaza yig'ish |

---

## 10. MUVAFFAQIYAT MEZONLARI (KPI)

- Monitoring qilinayotgan ob'ektlar soni
- AI aniqlagan kechikishlarning haqiqiy holat bilan mosligi (aniqlik foizi, %)
- Fuqarolar tomonidan yuborilgan murojaatlar soni va hal qilinish vaqti
- Dashboard faol foydalanuvchilari soni (oylik)
- Davlat organlari tomonidan tan olinishi / rasmiy hamkorlik

---

## 11. XAVF-TAVAKKALCHILIKLAR

| Xavf | Ta'siri | Yechim |
|---|---|---|
| Sentinel-2 piksel aniqligi past (10m) | Kichik binolarni aniq kuzatib bo'lmasligi | MVPda yirik infratuzilma loyihalariga fokus, keyinchalik drone integratsiyasi |
| Davlat ma'lumotlariga ochiq kirish yo'qligi | Byudjet ma'lumotlarini olib bo'lmasligi | Boshlang'ich bosqichda qo'lda kiritish + hokimiyat bilan hamkorlik shartnomasi |
| Soxta crowd-sourcing xabarlari | Ma'lumot sifatining pasayishi | Reputatsiya tizimi + AI tekshiruvi |
| AI progress-baholash xatoligi | Noto'g'ri Red Flag berish | Inspektor tomonidan tasdiqlash bosqichi (human-in-the-loop) |

---

## 12. BIZNES MODEL VA MONETIZATSIYA (SUSTAINABILITY)

1. **B2G (SaaS Model):** Shahar va viloyat hokimiyatlari, Qurilish vazirligi uchun yillik platforma litsenziyasi va tahliliy panel.
2. **B2B (Bank va Sug'urta):** Qurilish loyihalariga kredit va kafolat beruvchi tijorat banklari uchun xavflarni (delay risks) monitoring qilish uchun API xizmati.
3. **B2B (Pudratchilar va Dasturchilar):** O'z loyihalarini shaffof va zamonaviy ko'rsatish orqali xaridorlar ishonchini oshirish uchun "Verified Construction" belgisi va marketing vidjeti.

---

*Ushbu hujjat dastlabki texnik topshiriq bo'lib, jamoa va investorlar bilan muhokama asosida yangilanishi mumkin.*

# Startup Base (Light Mode) Design System & UI Specification
## "SKDqurilish / UrbanPulse Samarqand" Platformasi uchun Dizayn Yo'riqnomasi

Ushbu hujjat [Startup Base](https://startupbase.uz/) platformasining zamonaviy, toza va yuqori darajadagi **Light Mode UI/UX** dizayn tizimiga asoslangan holda **SKDqurilish / UrbanPulse Samarqand** loyihasi uchun maxsus ishlab chiqildi.

---

## 1. ASOSIY DIZAYN PRINSIPLARI

1. **Faqat Light Mode (Strict Light Theme)**:
   - Tizim butunlay yorug' (light) fonlarda ishlaydi. To'q (dark) rejim va og'ir qora fonlar taqiqlanadi.
   - Fonlar toza oq (`#FFFFFF`) hamda mayin och-kulrang/slatets (`#F8FAFC`, `#F4F6F8`) ranglardan iborat.

2. **Vibrant Lime Green Accent (Yorqin Ohak-Yashil Aksent)**:
   - Asosiy brend aksenti — yorqin hamda zamonaviy ohak-yashil rang (`#82C91E` / `#84CC16`).
   - Bu rang tugmalar, sarlavha tayanch matnlari (highlight badge), kartochka sarlavhalari va faol indikatorlarda qo'llaniladi.

3. **Yuqori Kontrast va Toza Tipografiya**:
   - Barcha sarlavha va matnlar to'q slatets/xrom ranglarda (`#0F172A`, `#1E293B`) bo'lib, oq va och fonda maksimum o'qish qulayligini ta'minlaydi.

4. **Yumaloq Burchaklar (Super Rounded Radius)**:
   - UI komponentlar yumshoq, zamonaviy yumaloq burchaklarga ega:
     - Asosiy blok va kartalar: `24px` – `32px` (`rounded-3xl`)
     - Kartochka va grid bloklari: `16px` (`rounded-2xl`)
     - Tugmalar va belgilash belgilari (badges): To'liq kapsula/pill shakli (`rounded-full`)

---

## 2. RANG PALITRASI (COLOR SYSTEM)

### 2.1. Asosiy Ranglar (Brand Colors)
| Rang nomi | HEX Kodi | Ishlatilish joyi | Tailwind Class |
|---|---|---|---|
| **Primary Lime Green** | `#82C91E` | Asosiy tugmalar, brend aksent, kartochka sarlavhalari | `bg-[#82C91E]`, `text-[#82C91E]` |
| **Lime Accent Hover** | `#65A30D` | Tugmalar ustiga olib borilgandagi (hover) holat | `hover:bg-[#65A30D]` |
| **Highlight Badge Lime** | `#95E616` | H1 sarlavhalardagi ajratilgan matn foni (text highlight) | `bg-[#95E616]` |
| **Light Lime Surface** | `#F7FEE7` | Yengil yashil fonli kartalar va badge fonlari | `bg-lime-50` / `bg-[#F7FEE7]` |

### 2.2. Fon Ranglari (Background Surfaces)
| Rang nomi | HEX Kodi | Ishlatilish joyi | Tailwind Class |
|---|---|---|---|
| **Base Body BG** | `#F8FAFC` | Umumiy web-sahifa foni (och Slate-50) | `bg-[#F8FAFC]` / `bg-slate-50` |
| **Card & Modal Surface** | `#FFFFFF` | Barcha kartochkalar, modallar va dashboard panellari foni | `bg-white` |
| **Border & Divider** | `#E2E8F0` | Nozik ajratuvchi chiziqlar va chegara chegaralari | `border-slate-200` |

### 2.3. Tipografiya Ranglari (Text Colors)
| Rang nomi | HEX Kodi | Ishlatilish joyi | Tailwind Class |
|---|---|---|---|
| **Primary Heading** | `#0F172A` | Asosiy sarlavhalar (H1, H2), muhim ko'rsatkichlar | `text-slate-900` / `text-[#0F172A]` |
| **Secondary Body** | `#334155` | Paragraf matnlari, jadval ma'lumotlari | `text-slate-700` |
| **Muted Caption** | `#64748B` | Subtitrlar, sanalar va yordamchi izohlar | `text-slate-500` |

---

## 3. TIPOGRAFIYA (TYPOGRAPHY)

- **Asosiy shriftlar**: `Plus Jakarta Sans`, `Inter`, yoki `Outfit` (sans-serif).
- **H1 (Hero Heading)**: `text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]`
  - *Highlight sarlavha uslubi*: Sarlavha ichidagi kalit so'z yumaloq yashil markyor foni bilan o'raladi: `<span class="bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-lg">SINGLE DIGITAL PLATFORM</span>`
- **H2 (Section Header)**: `text-3xl font-extrabold text-[#0F172A]`
- **H3 (Card Title)**: `text-lg font-bold text-[#82C91E]` (Startup Base uslubida karta sarlavhalari yashil bo'ladi)
- **Body Text**: `text-sm lg:text-base text-slate-700 leading-relaxed`

---

## 4. UI KOMPONENTLAR ARXITEKTURASI

### 4.1. Header / Navigation Bar
- Oq fonli, toza va minimalistik navbarni o'z ichiga oladi:
  - Chap tomonda: SKDqurilish loyihasi logotipi hamda "Powered by Samarkand GovTech" yozuvi.
  - Markazda: Menyular (`Ecosystem`, `Projects Map`, `InSAR Radar`, `Citizen Portal`, `Gov Dashboard`).
  - O'ng tomonda: Tillar almashtirgichi (`UZ / RU / EN`), Qidiruv tugmasi (`Q`) hamda **"Tizimga kirish" (Login)** tugmasi (`bg-[#82C91E] text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-[#65A30D] shadow-sm transition-all flex items-center gap-2`).

### 4.2. Hero & Grid Cards (Aksent Kartochkalar)
- Grid kartochkalari oq fonda (`bg-white`), yumaloq burchakli (`rounded-2xl`), nozik chegara (`border border-slate-100`) va mayin soya (`shadow-sm hover:shadow-md transition-shadow`) bilan ishlanadi.
- Har bir karta sarlavhasi yorqin yashil (`text-[#82C91E] font-bold`) bo'lib, pastki qismida oqil va aniq tavsif matni joylashadi.

### 4.3. Asosiy Tugmalar (Buttons & Badges)
- **Primary Button**: `bg-[#82C91E] hover:bg-[#65A30D] text-white font-semibold rounded-full px-6 py-3 shadow-sm hover:shadow transition-all`
- **Secondary / Outline Button**: `bg-white border-2 border-[#82C91E] text-[#82C91E] hover:bg-[#82C91E] hover:text-white font-semibold rounded-full px-6 py-3 transition-all`
- **Pill Badge**: `bg-[#95E616] text-[#0F172A] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider`

### 4.4. Floating AI Chatbot Widget
- Ekraning pastki o'ng burchagida suzib yuruvchi **AI Chatbot** va **InSAR Monitor** vidjeti:
  - Oq silindr shaklidagi kapsula (`bg-white rounded-full px-4 py-2.5 border border-slate-200 shadow-lg flex items-center gap-2 text-xs font-semibold text-slate-800 hover:scale-105 transition-transform`).

---

## 5. SKDQURILISH / URBANPULSE UCHUN KO'RINISH (LAYOUT MOCKUP)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 SKDqurilish (Samarqand)    Loyihalar  InSAR Radar  Murojaatlar   [ Login ] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────┐               │
│   │ [ SAMARQAND QURILISH MONITORINGI ] PLATFORMASI          │               │
│   │ Sun'iy yo'ldosh va AI orqali shaffof va xavfsiz shahar  │               │
│   └─────────────────────────────────────────────────────────┘               │
│                                                                             │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│   │ Sentinel-2 AI    │  │ InSAR Monitoring │  │ UNESCO Zone      │         │
│   │ 10m optik tahlil │  │ ±2-5mm deform    │  │ Muhofaza xaritasi│         │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. XULOSA
SKDqurilish platformasidagi barcha yangi frontend komponentlar, xaritalar, dashboardlar va mobil ko'rinishlar **ushbu Light Mode (Startup Base) dizayn yo'riqnomasiga** qat'iy rioya qilgan holda ishlab chiqiladi.

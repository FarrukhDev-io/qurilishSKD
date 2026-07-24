export interface ProjectData {
  id: string;
  name: string;
  category: string;
  contractor: string;
  budget: string;
  status: 'red_flag' | 'unesco_warning' | 'on_schedule';
  statusText: string;
  plannedProgress: number; // %
  actualProgress: number; // %
  aiVelocity: string; // e.g. "+1.8%/hafta"
  startDate: string;
  targetCompletion: string;
  coordinates: [number, number]; // [lat, lng]
  polygon: [number, number][];
  insarDeformation: {
    valueMm: number; // e.g. -8.5
    status: 'normal' | 'warning' | 'danger';
    details: string;
  };
  unescoZone: boolean;
  maxAllowedHeight: number; // meters
  currentHeight: number; // meters
  satelliteData: {
    baselineDate: string;
    latestPassDate: string;
    cloudCover: number; // %
    builtAreaSqM: number;
    cranesDetected: number;
    volumeGrowthPct: number;
  };
  issuesCount: number;
  clusteredIssuesCount: number;
  description: string;
}

export const SAMARQAND_PROJECTS: ProjectData[] = [
  {
    id: 'proj-1',
    name: 'Silk Road Samarkand — Turizm va Kongress Majmuasi (2-bosqich)',
    category: 'Yirik Infratuzilma',
    contractor: 'Enter Engineering Pte. Ltd.',
    budget: '$38.5M',
    status: 'red_flag',
    statusText: 'Red Flag: Kechikish Xavfi (-14%)',
    plannedProgress: 78,
    actualProgress: 64,
    aiVelocity: '+0.8%/hafta (Rejadan 2.1% sekin)',
    startDate: '2025-03-15',
    targetCompletion: '2026-11-30',
    coordinates: [39.6582, 67.0425],
    polygon: [
      [39.6605, 67.0390],
      [39.6610, 67.0450],
      [39.6560, 67.0460],
      [39.6555, 67.0400]
    ],
    insarDeformation: {
      valueMm: -8.5,
      status: 'danger',
      details: 'Sentinel-1 InSAR: B blok poydevorida -8.5mm xavfli cho\'kish aniqlandi'
    },
    unescoZone: false,
    maxAllowedHeight: 45,
    currentHeight: 32,
    satelliteData: {
      baselineDate: '2026-01-10',
      latestPassDate: '2026-07-22 (Sentinel-2A)',
      cloudCover: 1.2,
      builtAreaSqM: 42500,
      cranesDetected: 8,
      volumeGrowthPct: 18.4
    },
    issuesCount: 12,
    clusteredIssuesCount: 4,
    description: 'Samarqand eshigi yaqinidagi 120 gektarli turizm majmuasida 2-bosqich kongress zali va mehmonxonalar qurilishi.'
  },
  {
    id: 'proj-2',
    name: 'Registon Bufer Zonasi — Hunarmandlar Markazi',
    category: 'Madaniy Meros & Turizm',
    contractor: 'Samarqand Obodon Qurilish MCHJ',
    budget: '$12.2M',
    status: 'unesco_warning',
    statusText: '🟡 YUNESKO Ogohlantirish: Balandlik normasi buzilishi',
    plannedProgress: 55,
    actualProgress: 52,
    aiVelocity: '+1.5%/hafta',
    startDate: '2025-06-01',
    targetCompletion: '2027-02-15',
    coordinates: [39.6548, 66.9757],
    polygon: [
      [39.6560, 66.9740],
      [39.6562, 66.9775],
      [39.6535, 66.9780],
      [39.6532, 66.9745]
    ],
    insarDeformation: {
      valueMm: -1.2,
      status: 'normal',
      details: 'InSAR barqaror: zamin tekisligi saqlangan'
    },
    unescoZone: true,
    maxAllowedHeight: 12, // UNESCO max height
    currentHeight: 14.8, // Violated limit!
    satelliteData: {
      baselineDate: '2026-01-10',
      latestPassDate: '2026-07-22 (Sentinel-2B)',
      cloudCover: 0.8,
      builtAreaSqM: 14200,
      cranesDetected: 3,
      volumeGrowthPct: 24.8
    },
    issuesCount: 19,
    clusteredIssuesCount: 5,
    description: 'Tarixiy Registon ansambli bufer zonasida joylashgan milliylik uslubidagi savdo va san\'at majmuasi.'
  },
  {
    id: 'proj-3',
    name: 'Universitet Xiyoboni — Smart Resident Turar-Joy Majmuasi',
    category: 'Turar-Joy Infratuzilmasi',
    contractor: 'Orient Building Group',
    budget: '$24.8M',
    status: 'on_schedule',
    statusText: '🟢 Reja bo\'yicha ketyapti (92% tayyor)',
    plannedProgress: 90,
    actualProgress: 92,
    aiVelocity: '+2.4%/hafta',
    startDate: '2024-11-01',
    targetCompletion: '2026-09-01',
    coordinates: [39.6438, 66.9580],
    polygon: [
      [39.6450, 66.9565],
      [39.6455, 66.9595],
      [39.6425, 66.9600],
      [39.6420, 66.9570]
    ],
    insarDeformation: {
      valueMm: -0.4,
      status: 'normal',
      details: 'InSAR deformatsiya normada'
    },
    unescoZone: false,
    maxAllowedHeight: 36,
    currentHeight: 33.5,
    satelliteData: {
      baselineDate: '2026-01-10',
      latestPassDate: '2026-07-22 (Sentinel-2A)',
      cloudCover: 1.0,
      builtAreaSqM: 28900,
      cranesDetected: 2,
      volumeGrowthPct: 41.2
    },
    issuesCount: 3,
    clusteredIssuesCount: 0,
    description: 'Universitet xiyoboni bo\'yida barpo etilayotgan zamonaviy energiya tejamkor 12 qavatli turar-joy majmuasi.'
  },
  {
    id: 'proj-4',
    name: 'Samarqand Xalqaro Aeroporti — Cargo & Logistika Xabi',
    category: 'Transport & Logistika',
    contractor: 'AirMarakanda Logistics',
    budget: '$28.6M',
    status: 'on_schedule',
    statusText: '🟢 Reja bo\'yicha ketyapti (68% tayyor)',
    plannedProgress: 67,
    actualProgress: 68,
    aiVelocity: '+1.9%/hafta',
    startDate: '2025-04-10',
    targetCompletion: '2027-04-30',
    coordinates: [39.7005, 66.9840],
    polygon: [
      [39.7030, 66.9810],
      [39.7040, 66.9880],
      [39.6980, 66.9890],
      [39.6970, 66.9820]
    ],
    insarDeformation: {
      valueMm: -2.1,
      status: 'warning',
      details: 'Uchish yo\'lagi yaqinida yengil cho\'kish monitoring qilinmoqda'
    },
    unescoZone: false,
    maxAllowedHeight: 22,
    currentHeight: 18,
    satelliteData: {
      baselineDate: '2026-01-10',
      latestPassDate: '2026-07-22 (Sentinel-2A)',
      cloudCover: 0.5,
      builtAreaSqM: 56000,
      cranesDetected: 5,
      volumeGrowthPct: 33.5
    },
    issuesCount: 5,
    clusteredIssuesCount: 2,
    description: 'Xalqaro yuk tashish va sovitgichli omborxonalar majmuasining 1-navbati.'
  }
];

export const EXECUTIVE_STATS = {
  totalProjects: 42,
  monitoredBudget: '$104.1M',
  redFlagsCount: 4,
  unescoWarningsCount: 3,
  aiModelConfidence: '94.2%',
  totalCitizenReports: 148,
  resolvedIssues: 124,
  sentinelSatellitePasses: 154
};

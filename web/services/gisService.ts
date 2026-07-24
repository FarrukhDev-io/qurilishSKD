import { ProjectData } from '../data/samarqandProjects';

export interface UnescoBufferZone {
  name: string;
  description: string;
  maxAllowedHeightMeters: number;
  coordinates: [number, number][];
}

export type FilterStatus = 'all' | 'red_flag' | 'unesco_warning' | 'on_schedule';
export type MapLayerType = 'optical' | 'insar' | 'unesco';

export const UNESCO_BUFFER_ZONE: UnescoBufferZone = {
  name: '🏛 YUNESKO Tarixiy Markaz Bufer Zonasi',
  description: 'Samarqandning Registon, Go\'ri Amir va Shohi Zinda atrofidagi 1-darajali madaniy meros muhofaza hududi',
  maxAllowedHeightMeters: 12,
  coordinates: [
    [39.6580, 66.9710],
    [39.6585, 66.9800],
    [39.6510, 66.9810],
    [39.6500, 66.9720]
  ]
};

export interface GeoJsonPointFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    name: string;
    category: string;
    status: 'red_flag' | 'unesco_warning' | 'on_schedule';
    insarMm: number;
    plannedProgress: number;
    actualProgress: number;
    unescoZone: boolean;
  };
}

export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonPointFeature[];
}

/**
 * Spatial Query & Data Service for PostGIS / GeoJSON Simulation
 * Minimalist & Light Mode Design System Compliant
 */
export class GisService {
  /**
   * Filter project dataset based on spatial status queries
   */
  static filterProjects(projects: ProjectData[], filterStatus: FilterStatus): ProjectData[] {
    if (filterStatus === 'all') return projects;
    return projects.filter((p) => p.status === filterStatus);
  }

  /**
   * Generates a 42+ object dataset for stress-testing Leaflet Canvas Rendering (42+ objects requirement)
   */
  static generateExtendedGisProjects(baseProjects: ProjectData[]): ProjectData[] {
    if (baseProjects.length >= 42) return baseProjects;

    const extended: ProjectData[] = [...baseProjects];
    const baseCount = baseProjects.length;

    // Grid center around Samarqand
    const centerLat = 39.655;
    const centerLng = 66.965;

    const categories = ['Turar-Joy Infratuzilmasi', 'Yol va Transport', 'Madaniy Meros', 'Sanoat Zonasi', 'Tibbiyot Majmuasi'];
    const contractors = ['Samarqand Obodon MCHJ', 'Orient Building', 'Enter Engineering', 'Silk Road Construction', 'Afrosiyob Stroy'];

    for (let i = baseCount + 1; i <= 42; i++) {
      // Create distributed coordinates across Samarqand grid
      const angle = (i * 137.5) * (Math.PI / 180);
      const radius = 0.01 + (i * 0.002);
      const lat = centerLat + radius * Math.cos(angle);
      const lng = centerLng + radius * Math.sin(angle);

      const status: 'red_flag' | 'unesco_warning' | 'on_schedule' =
        i % 7 === 0 ? 'red_flag' : i % 5 === 0 ? 'unesco_warning' : 'on_schedule';

      const unescoZone = status === 'unesco_warning' || (i % 6 === 0);
      const currentHeight = unescoZone ? (status === 'unesco_warning' ? 15.5 : 10.2) : 24;

      const insarVal = status === 'red_flag' ? -7.8 : status === 'unesco_warning' ? -2.4 : -0.5;

      const polyOffset = 0.0015;
      const polygon: [number, number][] = [
        [lat + polyOffset, lng - polyOffset],
        [lat + polyOffset, lng + polyOffset],
        [lat - polyOffset, lng + polyOffset],
        [lat - polyOffset, lng - polyOffset]
      ];

      extended.push({
        id: `proj-${i}`,
        name: `Samarqand Ob'ekti #${i} — ${categories[i % categories.length]}`,
        category: categories[i % categories.length],
        contractor: contractors[i % contractors.length],
        budget: `$${(5 + (i * 0.8)).toFixed(1)}M`,
        status,
        statusText: status === 'red_flag' ? '🔴 Red Flag: Cho\'kish Xavfi' : status === 'unesco_warning' ? '🟡 YUNESKO Balandlik Ogohlantirish' : '🟢 Reja bo\'yicha',
        plannedProgress: Math.min(98, 40 + (i * 1.3)),
        actualProgress: status === 'red_flag' ? Math.max(20, 30 + (i * 1.1) - 12) : Math.min(95, 42 + (i * 1.3)),
        aiVelocity: `+${(1.2 + (i % 3) * 0.4).toFixed(1)}%/hafta`,
        startDate: '2025-01-15',
        targetCompletion: '2026-12-20',
        coordinates: [Number(lat.toFixed(5)), Number(lng.toFixed(5))],
        polygon,
        insarDeformation: {
          valueMm: Number(insarVal.toFixed(1)),
          status: status === 'red_flag' ? 'danger' : status === 'unesco_warning' ? 'warning' : 'normal',
          details: `Sentinel-1 InSAR: Poydevor zamin monitoring ko'rsatkichi ${insarVal}mm`
        },
        unescoZone,
        maxAllowedHeight: 12,
        currentHeight,
        satelliteData: {
          baselineDate: '2026-01-10',
          latestPassDate: '2026-07-23 (Sentinel-2)',
          cloudCover: 0.9,
          builtAreaSqM: 12000 + i * 500,
          cranesDetected: (i % 4) + 1,
          volumeGrowthPct: 15.0 + (i % 20)
        },
        issuesCount: status === 'red_flag' ? 8 : 2,
        clusteredIssuesCount: status === 'red_flag' ? 3 : 0,
        description: `Samarqand shahri GIS xaritasida Sentinel yo'ldosh monitoringi ostidagi ob'ekt #${i}.`
      });
    }

    return extended;
  }

  /**
   * Convert projects to standard GeoJSON FeatureCollection format (PostGIS spatial representation)
   */
  static convertToGeoJson(projects: ProjectData[]): GeoJsonFeatureCollection {
    return {
      type: 'FeatureCollection',
      features: projects.map((p) => ({
        type: 'Feature',
        id: p.id,
        geometry: {
          type: 'Point',
          coordinates: [p.coordinates[1], p.coordinates[0]] // [lng, lat]
        },
        properties: {
          name: p.name,
          category: p.category,
          status: p.status,
          insarMm: p.insarDeformation.valueMm,
          plannedProgress: p.plannedProgress,
          actualProgress: p.actualProgress,
          unescoZone: p.unescoZone
        }
      }))
    };
  }

  /**
   * Color and Light Mode Badge styling for InSAR Radar deformation values (mm)
   */
  static getInsarColor(valueMm: number): { hex: string; label: string; badgeClass: string } {
    if (valueMm <= -5.0) {
      return {
        hex: '#EF4444',
        label: 'Xavfli Cho\'kish (<-5mm)',
        badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200 font-extrabold'
      };
    }
    if (valueMm <= -1.5) {
      return {
        hex: '#F59E0B',
        label: 'O\'rta Deformatsiya (-1.5mm..-5mm)',
        badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200 font-extrabold'
      };
    }
    return {
      hex: '#82C91E',
      label: 'Barqaror (0mm..-1.5mm)',
      badgeClass: 'bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 font-extrabold'
    };
  }
}

export function convertProjectsToGeoJSON(projects: ProjectData[]): GeoJsonFeatureCollection {
  return GisService.convertToGeoJson(projects);
}

export function getLightModeBadgeStyle(status: 'red_flag' | 'unesco_warning' | 'on_schedule') {
  switch (status) {
    case 'red_flag':
      return {
        badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200 font-extrabold shadow-sm',
        label: '🔴 Red Flag (Kechikish)',
        dotColor: '#EF4444',
      };
    case 'unesco_warning':
      return {
        badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200 font-extrabold shadow-sm',
        label: '🟡 YUNESKO Ogoh.',
        dotColor: '#F59E0B',
      };
    case 'on_schedule':
      return {
        badgeClass: 'bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 font-extrabold shadow-sm',
        label: '🟢 Rejada',
        dotColor: '#82C91E',
      };
  }
}

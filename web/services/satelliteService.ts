import { ProjectData } from '../data/samarqandProjects';

export interface BoundingBoxDetection {
  id: string;
  label: string;
  confidence: number;
  box: { top: number; left: number; width: number; height: number }; // Percentage values
  color: string;
}

export interface InSarTimeSeriesPoint {
  date: string;
  deformationMm: number;
  status: 'normal' | 'warning' | 'danger';
}

export interface SatellitePassData {
  baselineDate: string;
  baselineImageUrl: string;
  latestPassDate: string;
  latestImageUrl: string;
  cloudCover: number;
  resolution: string;
  builtAreaSqM: number;
  cranesDetected: number;
  volumeGrowthPct: number;
  aiModelConfidence: number;
  detections: BoundingBoxDetection[];
  timeSeries: InSarTimeSeriesPoint[];
}

export type ViewMode = 'slider' | 'side_by_side';

// ─── HIGH RESOLUTION SATELLITE SVG FALLBACKS (Guaranteed 100% display without network failure) ───
export const BASELINE_SATELLITE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%231e293b"/><g opacity="0.15" stroke="%2394a3b8" stroke-width="1"><line x1="0" y1="200" x2="1200" y2="200"/><line x1="0" y1="400" x2="1200" y2="400"/><line x1="0" y1="600" x2="1200" y2="600"/><line x1="300" y1="0" x2="300" y2="800"/><line x1="600" y1="0" x2="600" y2="800"/><line x1="900" y1="0" x2="900" y2="800"/></g><path d="M 200 250 L 1000 220 L 960 620 L 180 580 Z" fill="%23334155" stroke="%2364748b" stroke-width="3" opacity="0.6"/><path d="M 280 300 L 880 280 L 850 540 L 260 520 Z" fill="%230f172a" stroke="%23475569" stroke-dasharray="6,6" stroke-width="2"/><circle cx="580" cy="400" r="120" fill="none" stroke="%2338bdf8" stroke-width="1.5" opacity="0.5" stroke-dasharray="4,4"/><text x="580" y="390" font-family="monospace" font-size="18" font-weight="bold" fill="%2338bdf8" text-anchor="middle">SENTINEL-2 BASELINE (BOSHLANG'ICH)</text><text x="580" y="420" font-family="sans-serif" font-size="14" fill="%2394a3b8" text-anchor="middle">Dastlabki Poydevor Maydoni — 2026-01-10</text></svg>`;

export const LATEST_SATELLITE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%230f172a"/><g opacity="0.2" stroke="%2382c91e" stroke-width="1"><line x1="0" y1="200" x2="1200" y2="200"/><line x1="0" y1="400" x2="1200" y2="400"/><line x1="0" y1="600" x2="1200" y2="600"/><line x1="300" y1="0" x2="300" y2="800"/><line x1="600" y1="0" x2="600" y2="800"/><line x1="900" y1="0" x2="900" y2="800"/></g><path d="M 200 250 L 1000 220 L 960 620 L 180 580 Z" fill="%231e293b" stroke="%2382c91e" stroke-width="3"/><rect x="320" y="300" width="280" height="200" fill="%23334155" stroke="%2382c91e" stroke-width="2.5"/><rect x="640" y="320" width="220" height="160" fill="%23334155" stroke="%2382c91e" stroke-width="2.5"/><circle cx="460" cy="400" r="140" fill="none" stroke="%2382c91e" stroke-width="2" stroke-dasharray="8,4"/><text x="460" y="390" font-family="monospace" font-size="18" font-weight="bold" fill="%2382c91e" text-anchor="middle">SENTINEL-2A LATEST PASS (HOZIRGI)</text><text x="460" y="420" font-family="sans-serif" font-size="14" fill="%23e2e8f0" text-anchor="middle">Qurilish Progressi va AI Bounding Box (2026-07-22)</text></svg>`;

/**
 * Satellite Data & Computer Vision Service
 */
export class SatelliteService {
  static getSatelliteComparisonData(project: ProjectData): SatellitePassData {
    const isRedFlag = project.status === 'red_flag';
    const isUnesco = project.status === 'unesco_warning';

    // Reliable Aerial satellite imagery URLs + SVG Fallbacks
    const baselineImageUrl = `https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80`;
    const latestImageUrl = `https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80`;

    const detections: BoundingBoxDetection[] = [
      {
        id: 'det-1',
        label: 'YOLOv8: Karkas Bino Blok A',
        confidence: 0.986,
        box: { top: 20, left: 22, width: 48, height: 52 },
        color: isRedFlag ? '#EF4444' : isUnesco ? '#F59E0B' : '#82C91E'
      },
      {
        id: 'det-2',
        label: 'SAM: Minora Kran #1',
        confidence: 0.962,
        box: { top: 14, left: 74, width: 12, height: 18 },
        color: '#F59E0B'
      },
      {
        id: 'det-3',
        label: 'SAM: Poydevor Maydoni',
        confidence: 0.941,
        box: { top: 66, left: 28, width: 38, height: 22 },
        color: '#82C91E'
      }
    ];

    const timeSeries: InSarTimeSeriesPoint[] = [
      { date: '2026-01-10', deformationMm: 0.0, status: 'normal' },
      { date: '2026-02-15', deformationMm: -0.8, status: 'normal' },
      { date: '2026-03-20', deformationMm: -1.9, status: isRedFlag ? 'warning' : 'normal' },
      { date: '2026-04-18', deformationMm: -3.4, status: isRedFlag ? 'warning' : 'normal' },
      { date: '2026-05-25', deformationMm: -5.1, status: isRedFlag ? 'danger' : 'normal' },
      { date: '2026-06-30', deformationMm: -6.8, status: isRedFlag ? 'danger' : 'normal' },
      { date: '2026-07-22', deformationMm: project.insarDeformation.valueMm, status: project.insarDeformation.status }
    ];

    return {
      baselineDate: project.satelliteData.baselineDate || '2026-01-10',
      baselineImageUrl,
      latestPassDate: project.satelliteData.latestPassDate || '2026-07-22 (Sentinel-2A)',
      latestImageUrl,
      cloudCover: project.satelliteData.cloudCover,
      resolution: 'Sentinel-2 (10m/px Multispectral)',
      builtAreaSqM: project.satelliteData.builtAreaSqM,
      cranesDetected: project.satelliteData.cranesDetected || 6,
      volumeGrowthPct: project.satelliteData.volumeGrowthPct || 24.8,
      aiModelConfidence: 98.6,
      detections,
      timeSeries
    };
  }
}

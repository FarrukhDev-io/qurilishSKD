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

/**
 * Satellite Data & Computer Vision Service
 * Minimalist & Light Mode Design System Compliant
 */
export class SatelliteService {
  /**
   * Fetch or compute satellite comparison dataset for a given project
   */
  static getSatelliteComparisonData(project: ProjectData): SatellitePassData {
    const isRedFlag = project.status === 'red_flag';
    const isUnesco = project.status === 'unesco_warning';

    // Aerial satellite imagery URLs
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

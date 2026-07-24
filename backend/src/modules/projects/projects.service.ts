import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectEntity, ProjectStatus } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  // In-memory / PostGIS initial seed data
  private projects: Partial<ProjectEntity>[] = [
    {
      id: 'SKD-001',
      name: 'Silk Road Samarqand — Turizm Markazi Kengaytirilishi',
      district: 'Samarqand Tuman',
      projectType: 'Turizm & Infratuzilma',
      budgetAllocated: 42500000,
      budgetSpent: 28100000,
      plannedProgress: 75,
      aiCalculatedProgress: 54,
      status: ProjectStatus.RED_FLAG,
      delayReason: 'Poydevor beton ishlari jadvaldan 21 kunga kechikmoqda (Sentinel-2 AI tahlili)',
      contractorName: 'Samarkand Tourism Builders MCHJ',
      isUnescoZone: false,
      latitude: 39.6385,
      longitude: 67.0421,
      inSarDeformation: '-4.2mm (Stabil)'
    },
    {
      id: 'SKD-002',
      name: 'Registon Maydoni Bufer Zonasi Obodonlashtirilishi',
      district: 'Siyob Tumani',
      projectType: 'Obodonlashtirish & Madaniy Meros',
      budgetAllocated: 8200000,
      budgetSpent: 6800000,
      plannedProgress: 88,
      aiCalculatedProgress: 86,
      status: ProjectStatus.UNESCO_VIOLATION_RISK,
      delayReason: 'Ruxsat etilgan balandlikdan +2.1m yuqori to\'siq konstruksiyasi aniqlandi',
      contractorName: 'Samarqand Obod Shahar DUK',
      isUnescoZone: true,
      latitude: 39.6548,
      longitude: 66.9758,
      inSarDeformation: '0.0mm (Normada)'
    },
    {
      id: 'SKD-003',
      name: 'Universitet Xiyoboni va Ibn Sino Ko\'chasi Avto-O\'tkazgichi',
      district: 'Bog\'ishamol Tumani',
      projectType: 'Yo\'l va Transport Infratuzilmasi',
      budgetAllocated: 18400000,
      budgetSpent: 14200000,
      plannedProgress: 70,
      aiCalculatedProgress: 72,
      status: ProjectStatus.ON_TRACK,
      delayReason: 'Muntazam sur\'atda bajarilmoqda. AI monitoring ijobiy ko\'rsatkich qayd etdi.',
      contractorName: 'Samarkand Road Infrastructure Group MCHJ',
      isUnescoZone: false,
      latitude: 39.6450,
      longitude: 66.9550,
      inSarDeformation: '-1.1mm (Normada)'
    }
  ];

  async findAll() {
    return this.projects;
  }

  async findOne(id: string) {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Loyiha ID ${id} topilmadi`);
    }
    return project;
  }

  async getExecutiveMetrics() {
    const totalCount = this.projects.length;
    const redFlags = this.projects.filter((p) => p.status === ProjectStatus.RED_FLAG).length;
    const unescoRisks = this.projects.filter((p) => p.isUnescoZone).length;
    const totalBudget = this.projects.reduce((acc, p) => acc + Number(p.budgetAllocated), 0);

    return {
      totalMonitoredProjects: totalCount,
      redFlagAlerts: redFlags,
      unescoViolationRisks: unescoRisks,
      totalBudgetAllocatedUSD: totalBudget,
      aiModelAccuracyPercentage: 94.2,
      sentinelSatelliteSyncStatus: 'ACTIVE_LIVE'
    };
  }
}

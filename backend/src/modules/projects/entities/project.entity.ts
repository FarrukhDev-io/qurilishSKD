import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProjectStatus {
  ON_TRACK = 'ON_TRACK',
  RED_FLAG = 'RED_FLAG',
  UNESCO_VIOLATION_RISK = 'UNESCO_VIOLATION_RISK',
  COMPLETED = 'COMPLETED',
}

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  district: string;

  @Column({ type: 'varchar', length: 100 })
  projectType: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  budgetAllocated: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  budgetSpent: number;

  @Column({ type: 'int', default: 0 })
  plannedProgress: number;

  @Column({ type: 'int', default: 0 })
  aiCalculatedProgress: number;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.ON_TRACK })
  status: ProjectStatus;

  @Column({ type: 'text', nullable: true })
  delayReason: string;

  @Column({ type: 'varchar', length: 255 })
  contractorName: string;

  @Column({ type: 'boolean', default: false })
  isUnescoZone: boolean;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  // GeoJSON Polygon boundary stored in PostGIS SRID 4326
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  boundary: string;

  @Column({ type: 'varchar', length: 50, default: '0.0mm' })
  inSarDeformation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

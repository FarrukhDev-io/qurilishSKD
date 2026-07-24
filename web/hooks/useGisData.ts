'use client';

import { useState, useMemo, useCallback } from 'react';
import { ProjectData } from '../data/samarqandProjects';
import { GisService, FilterStatus, MapLayerType, UNESCO_BUFFER_ZONE } from '../services/gisService';

interface UseGisDataOptions {
  initialProjects?: ProjectData[];
  initialFilter?: FilterStatus;
  initialLayer?: MapLayerType;
  initialSelectedProject?: ProjectData | null;
}

export function useGisData({
  initialProjects = [],
  initialFilter = 'all',
  initialLayer = 'optical',
  initialSelectedProject = null
}: UseGisDataOptions = {}) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(initialFilter);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>(initialLayer);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    initialSelectedProject?.id || (initialProjects.length > 0 ? initialProjects[0].id : null)
  );

  // Memoize 42+ spatial projects dataset for performance & stress-testing Canvas renderer
  const allProjects = useMemo(() => {
    return GisService.generateExtendedGisProjects(initialProjects);
  }, [initialProjects]);

  // Memoize Spatial Query filtering
  const filteredProjects = useMemo(() => {
    return GisService.filterProjects(allProjects, filterStatus);
  }, [allProjects, filterStatus]);

  // Memoize PostGIS GeoJSON representation
  const geoJsonData = useMemo(() => {
    return GisService.convertToGeoJson(filteredProjects);
  }, [filteredProjects]);

  // Currently selected project memoized
  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return filteredProjects[0] || allProjects[0] || null;
    return allProjects.find((p) => p.id === selectedProjectId) || allProjects[0] || null;
  }, [allProjects, filteredProjects, selectedProjectId]);

  // Executive spatial statistics breakdown
  const stats = useMemo(() => {
    const total = allProjects.length;
    const redFlags = allProjects.filter((p) => p.status === 'red_flag').length;
    const unescoWarnings = allProjects.filter((p) => p.status === 'unesco_warning').length;
    const onSchedule = allProjects.filter((p) => p.status === 'on_schedule').length;

    return {
      total,
      redFlags,
      unescoWarnings,
      onSchedule
    };
  }, [allProjects]);

  const selectProject = useCallback((project: ProjectData) => {
    setSelectedProjectId(project.id);
  }, []);

  return {
    filterStatus,
    setFilterStatus,
    activeLayer,
    setActiveLayer,
    allProjects,
    filteredProjects,
    geoJsonData,
    selectedProject,
    selectProject,
    stats,
    unescoBufferZone: UNESCO_BUFFER_ZONE
  };
}

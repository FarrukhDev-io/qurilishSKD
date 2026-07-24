'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { ProjectData } from '../data/samarqandProjects';
import { SatelliteService, ViewMode, SatellitePassData } from '../services/satelliteService';

interface UseSatelliteDataOptions {
  project: ProjectData;
  initialViewMode?: ViewMode;
  initialSliderPosition?: number;
}

export function useSatelliteData({
  project,
  initialViewMode = 'slider',
  initialSliderPosition = 50,
}: UseSatelliteDataOptions) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialSliderPosition);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [showAiOverlay, setShowAiOverlay] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);

  // Loading and error states for heavy satellite images
  const [isLoadingBaseline, setIsLoadingBaseline] = useState<boolean>(true);
  const [isLoadingLatest, setIsLoadingLatest] = useState<boolean>(true);
  const [hasBaselineError, setHasBaselineError] = useState<boolean>(false);
  const [hasLatestError, setHasLatestError] = useState<boolean>(false);

  const isDraggingRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Memoize satellite data calculation
  const satelliteData: SatellitePassData = useMemo(() => {
    return SatelliteService.getSatelliteComparisonData(project);
  }, [project]);

  // Reset loading states when project changes
  useEffect(() => {
    setIsLoadingBaseline(true);
    setIsLoadingLatest(true);
    setHasBaselineError(false);
    setHasLatestError(false);
  }, [project.id]);

  // ⚡ PERFORMANCE AUDIT: 60 FPS Touch & Mouse RAF Drag Handler
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const newPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(newPos);
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDraggingRef.current = true;
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  }, [updatePosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  }, [updatePosition]);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Cleanup RAF animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    sliderPosition,
    setSliderPosition,
    viewMode,
    setViewMode,
    showAiOverlay,
    setShowAiOverlay,
    showBoundingBoxes,
    setShowBoundingBoxes,
    satelliteData,
    containerRef,
    isLoadingBaseline,
    setIsLoadingBaseline,
    isLoadingLatest,
    setIsLoadingLatest,
    hasBaselineError,
    setHasBaselineError,
    hasLatestError,
    setHasLatestError,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}

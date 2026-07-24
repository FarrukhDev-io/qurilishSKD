# SKDqurilish (UrbanPulse Samarqand) — Project Context & Architecture

## System Overview
**SKDqurilish** is an AI and Satellite-powered Smart City & Construction Infrastructure Monitoring Platform developed for Samarkand. It integrates open satellite imagery (Sentinel-2, Landsat, InSAR radar), drone data, and AI Computer Vision to automatically track construction progress, detect delays (Red Flags), protect UNESCO buffer zones, and enable citizen crowd-sourcing.

## Tech Stack
- **Backend**: NestJS (TypeScript, Node.js)
- **Database**: PostgreSQL 16 + PostGIS (Geo-Spatial queries)
- **AI Microservice**: Python 3.11 (FastAPI, Sentinel Hub SDK, PyTorch, YOLOv8)
- **Frontend**: React / Next.js + Leaflet / Mapbox GL JS

## Workspace Directory Structure
- `backend/` — Main NestJS API application (Clean Architecture / Modular DDD)
  - `src/common/` — Filters, Guards, Interceptors, Pipes, Utility Decorators
  - `src/config/` — Environment Validation & Service Config
  - `src/database/` — PostGIS Entities, Migrations, Seeders
  - `src/modules/auth/` — JWT Authentication, RBAC (Hokimiyat, Citizen, Contractor, Admin)
  - `src/modules/projects/` — GeoJSON Construction Sites & Spatial Polygons
  - `src/modules/satellite/` — Sentinel-2 AI Progress Analysis & InSAR Ground Deformation
  - `src/modules/crowd-sourcing/` — Citizen Reports, Geofencing, EXIF Verification, Clustering
  - `src/modules/unesco/` — Heritage Protection Buffer Zone Flagging
- `ai-service/` — Python microservice for satellite image fetching & computer vision model inference

## Core Principles for Gemini & Antigravity IDE
1. Act as a **Senior Staff Software Architect**.
2. Write clean, production-ready NestJS code using TypeScript strict mode.
3. Validate all payloads using `class-validator`.
4. Ensure PostGIS spatial queries are indexed and optimized (`ST_Contains`, `ST_DWithin`, `ST_Buffer`).

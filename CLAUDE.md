# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AeroView is a web-based real-time aircraft tracking application. It's a monorepo with a separate Angular 21 frontend and Spring Boot 4 backend. Development is in early Phase 1 (map, live data, authentication).

## Commands

### Frontend (`frontend/`)
```bash
npm install          # Install dependencies
npm start            # Dev server at localhost:4200
npm run build        # Production build
npm test             # Run unit tests with Vitest
```

### Backend (`backend/`)
```bash
./gradlew bootRun    # Run the application
./gradlew build      # Build and test
./gradlew test       # Run tests only
```
On Windows use `gradlew.bat` instead of `./gradlew`.

## Architecture

### Frontend
Angular 21 with standalone components (no NgModules). Uses signal-based reactivity (`signal()` API) — avoid `@Input`/`@Output` in new components where signals suffice. Styling is SCSS with oklch color tokens. Testing is Vitest + jsdom (not Karma/Jasmine).

Package: `dev.nz3x.backend` → mirrors domain `nz3x.dev`.

Routes are currently empty (`app.routes.ts`). All new pages must be added there as lazy-loaded standalone routes.

### Backend
Spring Boot 4.0.6, Java 25, Gradle with Kotlin DSL. Currently a minimal scaffold — only `spring-boot-starter` is declared. Add starters explicitly as features are built (e.g., `spring-boot-starter-web`, `spring-boot-starter-data-jpa`).

Main class: `backend/src/main/java/dev/nz3x/backend/BackendApplication.java`  
Config: `backend/src/main/resources/application.yaml`

## Key Conventions

- Angular components use the standalone API; never generate with `--no-standalone`.
- Backend package root is `dev.nz3x.backend`; new packages go under it (e.g., `dev.nz3x.backend.flight`, `dev.nz3x.backend.auth`).
- IntelliJ IDEA is the primary IDE (`.idea/` config committed); google-java-format is configured for the backend.

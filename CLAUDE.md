# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev
npm run start:dev        # watch mode (port 3000)
npm run start:debug      # debug + watch

# Build & prod
npm run build            # nest build → dist/
npm run start:prod       # node dist/main

# Test
npm test                 # unit tests (jest)
npm run test:watch       # watch mode
npm run test:cov         # coverage
npm run test:e2e         # end-to-end (test/jest-e2e.json)

# Quality
npm run lint             # eslint --fix
npm run format           # prettier --write

# Database
npx prisma migrate dev   # run migrations
npx prisma studio        # GUI browser
docker-compose up -d     # start postgres on port 5434
```

Swagger UI at `http://localhost:3000/docs`. Frontend at `http://localhost:3000/`.

## Architecture

NestJS REST API backed by PostgreSQL via Prisma. Three resource modules: **Projects**, **Logs**, **Posts**.

### Validation approach

Validation uses **AJV + JSON Schema** — not class-validator DTOs. Each module has a `*.schema.ts` defining `create*Schema` and `update*Schema`. All schemas register centrally in `src/schemas/schema.registry.ts`. Controllers call `validateBySchemaId()` before service calls; errors formatted via `formatAjvErrors()` and thrown as `BadRequestException`.

### Module structure (each feature follows same pattern)

```
src/<feature>/
  <feature>.module.ts
  <feature>.controller.ts   # routes, Swagger decorators, AJV validation
  <feature>.service.ts      # CRUD via PrismaService, throws NotFoundException
  <feature>.schema.ts       # JSON Schema definitions
```

### Database

- Prisma 7+ with `@prisma/adapter-pg` (PostgreSQL adapter pattern)
- `PrismaService` extends `PrismaClient`, connects on `OnModuleInit`, disconnects on `OnModuleDestroy`
- All models use UUID PKs (`@default(uuid())`), `createdAt` timestamps
- `findMany` ordered by `createdAt desc`
- `.env` sets `DATABASE_URL=postgresql://postgres:password@localhost:5434/myrac-db`

### Key files

| File | Role |
|------|------|
| `src/main.ts` | Bootstrap, CORS, global ValidationPipe, Swagger |
| `src/app.module.ts` | Root module wiring all feature modules |
| `src/db/prisma.service.ts` | PrismaClient wrapper |
| `src/schemas/schema.registry.ts` | Central AJV registry |
| `src/common/validators/json-schema.validator.ts` | `validateBySchemaId`, `formatAjvErrors` |
| `prisma/schema.prisma` | DB models: Project, Logs, Post |
| `prisma.config.ts` | Prisma config with dotenv |

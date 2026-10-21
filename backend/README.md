# RX Fire Backend API

Production-ready Node.js backend for the RX Fire geospatial web application.

## Features

- ✅ TypeScript with strict type checking
- ✅ Express.js server with ES Modules
- ✅ CORS configuration for frontend integration
- ✅ Security headers with Helmet
- ✅ Response compression
- ✅ Environment variable management with dotenv
- ✅ Centralized error handling
- ✅ Health check endpoint
- ✅ Structured for future integrations (R analytics, ArcGIS, job processing)

## Project Structure

```
backend/
├── src/
│   ├── routes/          # API route definitions
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic (future integrations)
│   ├── middleware/      # Custom middleware (error handling, etc.)
│   ├── config/          # Configuration management
│   ├── types/           # TypeScript type definitions
│   └── server.ts        # Main application entry point
├── dist/                # Compiled JavaScript output (generated)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── .env.example         # Environment variable template
└── .gitignore          # Git ignore rules
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment file:
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration (optional for basic setup):
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Available Scripts

### Development Mode
Runs the server with hot-reload using tsx:
```bash
npm run dev
```

### Build for Production
Compiles TypeScript to JavaScript:
```bash
npm run build
```

### Start Production Server
Runs the compiled JavaScript:
```bash
npm start
```

### Type Checking
Checks TypeScript types without emitting files:
```bash
npm run type-check
```

## API Endpoints

### Health Check
**GET** `/api/health`

Returns the current health status of the API.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-30T12:00:00.000Z",
  "uptime": 123.456
}
```

## Dependencies

### Production Dependencies
- **express** - Fast, unopinionated web framework
- **cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable loader
- **helmet** - Security middleware for HTTP headers
- **compression** - Response compression middleware

### Development Dependencies
- **typescript** - TypeScript compiler
- **tsx** - TypeScript execution and watch mode
- **@types/express** - TypeScript types for Express
- **@types/cors** - TypeScript types for CORS
- **@types/node** - TypeScript types for Node.js
- **@types/compression** - TypeScript types for compression

## Future Integration Points

This backend is structured to accommodate future integrations:

### 1. Dockerized R Analytics Service
Add service in `src/services/rAnalyticsService.ts`:
- HTTP client to communicate with R service
- Data transformation utilities
- Error handling for R service failures

### 2. ArcGIS Online Feature Layers
Add service in `src/services/arcgisService.ts`:
- ArcGIS REST API integration
- Feature layer querying
- Spatial data processing

### 3. Job Processing
Add service in `src/services/jobService.ts`:
- Queue management (Bull, BullMQ, etc.)
- Background task processing
- Job status tracking

## Development

The server runs on `http://localhost:3000` by default (configurable via `PORT` env variable).

Frontend development server should run on `http://localhost:5173` (default Vite port).

CORS is pre-configured to allow requests from the frontend.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

## License

ISC

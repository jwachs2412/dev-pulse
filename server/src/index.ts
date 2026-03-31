import express from 'express';
import cors from 'cors';
import { entriesRouter } from './routes/entries';

// Create the Express application
const app = express();

// Define the port (use environment variable or default to 3001)
const PORT = process.env.PORT || 3001;

// ─── MIDDLEWARE ───────────────────────────────────────────────
// Middleware runs on EVERY request before it reaches your routes.
// Think of it as a security checkpoint at the entrance of a building.
// Every visitor must pass through before going to their destination.

// Parse JSON request bodies
// Without this, req.body would be undefined when clients send JSON
app.use(express.json());

// Enable CORS - allow the frontend to make requests to this server
// Without this, the browser would block all requests from localhost:5173
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

// ─── ROUTES ──────────────────────────────────────────────────
// Routes define what happens when a request arrives at a specific URL.
// We organize routes in separate files to keep this file clean.
app.use('/api/entries', entriesRouter);

// ─── HEALTH CHECK ────────────────────────────────────────────
// A simple endpoint that confirms the server is running.
// Deployment platforms use this to verify your server is alive.
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── START SERVER ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

# DevPulse - Developer Mood Tracker

A simple web application for developers to track their daily mood, energy level, and reflections.

## Features

- Log daily mood entries with mood, energy level (1-5), and notes
- View history of all mood entries
- Simple mood visualization

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Data**: In-memory storage

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/jwachs2412/dev-pulse.git
cd dev-pulse

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Terminal 1 - Start the backend (from the dev-pulse/ root)
cd server
npm run dev

# Terminal 2 - Start the frontend (from the dev-pulse/ root)
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001d

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | /api/entries | Get all mood entries    |
| POST   | /api/entries | Create a new mood entry |

## What I Learned

This project demonstrates understanding of:

- Client-server architecture
- React component design with TypeScript
- REST API design with Express
- Frontend-backend communication
- Deployment fundamentals

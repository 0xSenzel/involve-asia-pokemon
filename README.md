# Pokémon Application

A full-stack web application for browsing and exploring Pokémon data with a React frontend and Express backend.

## Project Overview

This application consists of two main parts:

### Backend
A production-ready Node.js/Express API that serves Pokémon data from the [PokéAPI](https://pokeapi.co/). The backend includes:
- **REST API Endpoints**: Provides paginated Pokémon listings
- **Data Fetching**: Fetches Pokémon data from the public PokéAPI with caching for performance
- **Error Handling**: Comprehensive error handling and validation middleware
- **CORS Support**: Configured to allow cross-origin requests from the frontend
- **Timeout Management**: Implements fetch timeouts to prevent hanging requests
- **Caching**: Caches Pokémon details to reduce API calls and improve response times

### Frontend
A modern React TypeScript application with a polished UI for displaying Pokémon:
- **React + TypeScript**: Built with modern React and TypeScript for type safety
- **Vite**: Fast build tool for development and production
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Query**: Efficient data fetching and caching
- **Radix UI Components**: Accessible and customizable UI components
- **Responsive Design**: Mobile-friendly layout with sidebar navigation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd involve-asia-pokemon
```

#### 2. Set Up the Backend
```bash
cd backend
npm install
```

#### 3. Set Up the Frontend
```bash
cd frontend
npm install
```

## Running the Application

### Start the Backend
From the `backend` directory:

**Development mode (with auto-reload)**:
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The backend will run on `http://localhost:3000`

Health check endpoint: `http://localhost:3000/health`

### Start the Frontend
From the `frontend` directory:

**Development mode**:
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

### Access the Application
Once both services are running, open your browser and navigate to:
```
http://localhost:8080
```

## API Documentation

### Pokémon Endpoints

#### Get Paginated Pokémon List
```
GET /api/pokemons?page=1&limit=12
```

**Query Parameters**:
- `page` (optional, default: 1): Page number for pagination
- `limit` (optional, default: 20): Number of Pokémon per page

**Response**:
```json
{
  "data": [
    {
      "name": "bulbasaur",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
      "type": [
          "grass",
          "poison"
      ],
      "height": 7,
      "weight": 69
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "totalPages": 111,
    "totalCount": 1025
  }
}
```

## Project Structure

### Backend (`/backend`)
```
src/
├── server.js                    # Express server setup with CORS
├── controllers/
│   └── pokemon.controller.js    # Request handlers for Pokémon endpoints
├── routes/
│   └── pokemon.routes.js        # API route definitions
├── services/
│   └── pokeapi.service.js       # PokéAPI integration with caching
└── middleware/
    ├── errorHandler.js          # Global error handling
    ├── notFoundHandler.js       # 404 handler
    └── validatePagination.js    # Pagination validation
```

### Frontend (`/frontend`)
```
src/
├── pages/
│   ├── Index.tsx                # Main Pokémon listing page
│   └── NotFound.tsx             # 404 page
├── components/
│   ├── Carousel.tsx             # Pokémon carousel component
│   ├── PokemonCard.tsx          # Individual Pokémon card
│   ├── NavLink.tsx              # Navigation component
│   ├── SideImage.tsx            # Side image display
│   ├── StaticBanner.tsx         # Banner component
│   └── ui/                      # Reusable UI components (Radix UI)
├── hooks/
│   ├── use-toast.ts             # Toast notification hook
│   └── use-mobile.tsx           # Mobile detection hook
├── lib/
│   └── utils.ts                 # Utility functions
├── types/
│   └── pokemon.ts               # TypeScript types
└── App.tsx                      # Main application component
```
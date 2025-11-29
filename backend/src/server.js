import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemon.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080'
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', pokemonRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Pokemon API: http://localhost:${PORT}/api/pokemons?page=1&limit=10`);
});

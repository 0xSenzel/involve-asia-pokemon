import express from 'express';
import { getPokemonList } from '../controllers/pokemon.controller.js';
import { validatePagination } from '../middleware/validatePagination.js';

const router = express.Router();

router.get('/pokemons', validatePagination, getPokemonList);

export default router;

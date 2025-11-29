import { fetchPokemonList, fetchPokemonDetails } from '../services/pokeapi.service.js';

const MAX_CONCURRENT_REQUESTS = 5;

async function executeWithConcurrency(tasks, maxConcurrent) {
  const results = [];
  const executing = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const promise = Promise.resolve().then(() => task()).then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });

    results.push(promise);

    if (tasks.length >= maxConcurrent) {
      executing.push(promise);

      if (executing.length >= maxConcurrent) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
}

export async function getPokemonList(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const pokemonList = await fetchPokemonList(limit, offset);

    const detailsTasks = pokemonList.results.map(pokemon => () =>
      fetchPokemonDetails(pokemon.url)
    );

    const pokemonDetails = await executeWithConcurrency(detailsTasks, MAX_CONCURRENT_REQUESTS);

    const formattedData = pokemonDetails.map(pokemon => ({
      name: pokemon.name,
      image: pokemon.sprites?.other?.['official-artwork']?.front_default || null,
      types: pokemon.types.map(type => type.type.name),
      height: pokemon.height,
      weight: pokemon.weight
    }));

    res.json({
      pagination: {
        page,
        limit,
        totalCount: pokemonList.count,
        totalPages: Math.ceil(pokemonList.count / limit)
      },
      data: formattedData
    });
  } catch (error) {
    next(error);
  }
}

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const FETCH_TIMEOUT = 5000;
const detailsCache = new Map();

function createFetchWithTimeout(url, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

export async function fetchPokemonList(limit, offset) {
  const url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await createFetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`PokeAPI request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('PokeAPI request timeout');
    }
    throw error;
  }
}

export async function fetchPokemonDetails(url) {
  if (detailsCache.has(url)) {
    return detailsCache.get(url);
  }

  try {
    const response = await createFetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`Pokemon details request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    detailsCache.set(url, data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Pokemon details request timeout');
    }
    throw error;
  }
}

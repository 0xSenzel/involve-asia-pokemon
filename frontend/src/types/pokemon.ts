export interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

export interface PokemonResponse {
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  data: Pokemon[];
}

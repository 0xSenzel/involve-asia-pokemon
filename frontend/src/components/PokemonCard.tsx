import { Badge } from "@/components/ui/badge";

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  grass: "bg-green-500/20 text-green-700 border-green-500/30",
  poison: "bg-purple-500/20 text-purple-700 border-purple-500/30",
  fire: "bg-orange-500/20 text-orange-700 border-orange-500/30",
  water: "bg-blue-500/20 text-blue-700 border-blue-500/30",
  bug: "bg-lime-500/20 text-lime-700 border-lime-500/30",
  flying: "bg-indigo-500/20 text-indigo-700 border-indigo-500/30",
  electric: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  normal: "bg-gray-500/20 text-gray-700 border-gray-500/30",
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 overflow-hidden border border-border">
      <div className="aspect-square bg-secondary/50 flex items-center justify-center p-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg capitalize mb-2 text-foreground">
          {pokemon.name}
        </h3>
        <div className="flex flex-wrap gap-1 mb-3">
          {pokemon.types.map((type) => (
            <Badge
              key={type}
              variant="outline"
              className={typeColors[type] || typeColors.normal}
            >
              {type}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Height:</span>
            <span className="font-medium text-foreground">{pokemon.height / 10}m</span>
          </div>
          <div className="flex justify-between">
            <span>Weight:</span>
            <span className="font-medium text-foreground">{pokemon.weight / 10}kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

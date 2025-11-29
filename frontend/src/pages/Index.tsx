import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@/components/Carousel";
import { StaticBanner } from "@/components/StaticBanner";
import { SideImage } from "@/components/SideImage";
import { PokemonCard } from "@/components/PokemonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { PokemonResponse } from "@/types/pokemon";
import { toast } from "sonner";

const API_URL = "http://localhost:3000/api/pokemons";

const Index = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 12;

  const { data, isLoading, error } = useQuery<PokemonResponse>({
    queryKey: ["pokemons", page, searchQuery],
    queryFn: async () => {
      const url = new URL(API_URL);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", limit.toString());
      if (searchQuery) {
        url.searchParams.append("search", searchQuery);
      }
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load Pokemon. Make sure the API is running on localhost:3000");
    }
  }, [error]);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 mb-8">
          <div className="h-[300px] md:h-[400px]">
            <Carousel />
          </div>
          <div className="grid grid-rows-2 gap-4 h-[300px] md:h-[400px]">
            <StaticBanner
              image="https://images.unsplash.com/photo-1643725173053-ed68676f1878?w=800&h=400&fit=crop"
              alt="Static banner 1"
            />
            <StaticBanner
              image="https://images.unsplash.com/photo-1627693685101-687bf0eb1222?w=800&h=400&fit=crop"
              alt="Static banner 2"
            />
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-6">
          {/* Left Static Image */}
          <div className="hidden md:block">
            <div className="sticky top-6">
              <SideImage
                image="https://images.unsplash.com/photo-1542779283-429940ce8336?w=400&h=600&fit=crop"
                alt="Side decoration"
              />
            </div>
          </div>

          {/* Center Pokemon List */}
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="sticky top-0 z-10 bg-card rounded-xl shadow-card p-4 mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Search Pokemon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="bg-gradient-primary">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Pokemon Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl h-[320px] animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-8 text-center">
                <p className="text-destructive font-medium">Failed to load Pokemon</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Please ensure the API is running on localhost:3000
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                  {data?.data.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                  ))}
                </div>

                {/* Pagination */}
                {data && (
                  <div className="flex items-center justify-center gap-4 py-6">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {data.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                      disabled={page === data.pagination.totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Static Image */}
          <div className="hidden md:block">
            <div className="sticky top-6">
              <SideImage
                image="https://images.unsplash.com/photo-1678736424589-29540f17cffa?w=400&h=600&fit=crop"
                alt="Side decoration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

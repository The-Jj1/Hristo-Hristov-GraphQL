
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/queries";
import { CharactersResponse, CharacterFilter } from "@/types/rickAndMorty";
import CharacterCard from "./CharacterCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, Loader2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CharactersListProps {
  onViewCharacter: (id: string) => void;
}

const CharactersList = ({ onViewCharacter }: CharactersListProps) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<CharacterFilter>({});
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { loading, error, data, refetch } = useQuery<CharactersResponse>(GET_CHARACTERS, {
    variables: { page, filter: filters },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== filters.name) {
        setFilters(prev => ({ ...prev, name: searchTerm || undefined }));
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, filters.name]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading characters",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleFilterChange = (key: keyof CharacterFilter, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === "all" ? undefined : value
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPage(1);
  };

  const characters = data?.characters?.results || [];
  const info = data?.characters?.info;
  const hasActiveFilters = Object.values(filters).some(value => value !== undefined) || searchTerm;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <CardTitle>Characters Explorer</CardTitle>
            </div>
            {info && (
              <Badge variant="outline">
                {info.count} total characters
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search characters by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="alive">Alive</SelectItem>
                  <SelectItem value="dead">Dead</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="genderless">Genderless</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Species..."
                value={filters.species || ""}
                onChange={(e) => handleFilterChange("species", e.target.value)}
              />

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="flex-1"
                >
                  Clear Filters
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => refetch()}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && !data && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading characters...</span>
          </div>
        </div>
      )}

      {characters.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onViewDetails={onViewCharacter}
              />
            ))}
          </div>

          {info && info.pages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={!info.prev || loading}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {page} of {info.pages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setPage(prev => prev + 1)}
                disabled={!info.next || loading}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}

      {!loading && characters.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No characters found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CharactersList;


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Character } from "@/types/rickAndMorty";
import { Eye, MapPin, Globe } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  onViewDetails: (id: string) => void;
}

const CharacterCard = ({ character, onViewDetails }: CharacterCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-green-100 text-green-800 border-green-200";
      case "Dead":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={character.image}
              alt={character.name}
              className="w-16 h-16 rounded-lg object-cover border-2 border-border"
              loading="lazy"
            />
            <div className="absolute -top-1 -right-1">
              <Badge className={getStatusColor(character.status)} variant="outline">
                {character.status}
              </Badge>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight truncate">{character.name}</h3>
            <p className="text-sm text-muted-foreground">{character.species}</p>
            {character.type && (
              <p className="text-xs text-muted-foreground italic">{character.type}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Badge variant="secondary">{character.gender}</Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Origin</p>
                <p className="text-muted-foreground text-xs">{character.origin.name}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground text-xs">{character.location.name}</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => onViewDetails(character.id)}
            className="w-full mt-4"
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;

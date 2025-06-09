
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CharactersList from "@/components/CharactersList";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("characters");

  const handleViewCharacter = (id: string) => {
    toast({
      title: "Character Details",
      description: `Viewing character ${id} - Feature coming soon!`,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "characters":
        return <CharactersList onViewCharacter={handleViewCharacter} />;
      case "episodes":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Episodes Explorer</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "locations":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Locations Explorer</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case "analytics":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Data Analytics</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ApolloProvider client={apolloClient}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Index;

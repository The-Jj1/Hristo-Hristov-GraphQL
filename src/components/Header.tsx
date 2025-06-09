
import { Button } from "@/components/ui/button";
import { Database, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">GraphQL Explorer</h1>
                <p className="text-sm text-muted-foreground">Rick and Morty API Browser</p>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </header>
  );
};

export default Header;

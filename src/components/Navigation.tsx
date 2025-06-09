
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Tv, MapPin, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "characters", label: "Characters", icon: Users, description: "Browse all characters" },
    { id: "episodes", label: "Episodes", icon: Tv, description: "Explore episodes" },
    { id: "locations", label: "Locations", icon: MapPin, description: "Discover locations" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "Data insights" },
  ];

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4">Explore API</h3>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left h-auto p-3",
                activeTab === tab.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{tab.label}</div>
                  <div className={cn(
                    "text-xs opacity-70",
                    activeTab === tab.id ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {tab.description}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default Navigation;

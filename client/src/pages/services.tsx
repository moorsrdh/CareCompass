import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Service } from "@shared/schema";
import AppHeader from "@/components/app-header";
import SearchFilters from "@/components/search-filters";
import ServiceCard from "@/components/service-card";
import EmergencyFAB from "@/components/emergency-fab";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: activeCategory 
      ? ["/api/services/category", activeCategory]
      : searchQuery 
      ? ["/api/services/search", searchQuery]
      : ["/api/services"],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory(null);
  };

  const handleCategoryFilter = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
      setSearchQuery("");
    }
  };

  const filteredServices = services || [];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <AppHeader />
      <SearchFilters
        searchQuery={searchQuery}
        onSearch={handleSearch}
        activeCategory={activeCategory}
        onCategoryFilter={handleCategoryFilter}
      />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            <span>{filteredServices.length}</span> Services Near You
          </h2>
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
            className="flex items-center space-x-2"
          >
            {viewMode === "list" ? (
              <>
                <Map className="w-4 h-4" />
                <span>Map View</span>
              </>
            ) : (
              <>
                <List className="w-4 h-4" />
                <span>List View</span>
              </>
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Map className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-lg font-medium">No services found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </main>

      <EmergencyFAB />

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 md:hidden">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4 text-primary">
            <List className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Services</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-muted-foreground">
            <Map className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Map</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

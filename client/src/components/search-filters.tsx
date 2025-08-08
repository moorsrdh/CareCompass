import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  activeCategory: string | null;
  onCategoryFilter: (category: string) => void;
}

const categories = [
  { id: "food", label: "Food & Meals", icon: "🍽️" },
  { id: "shelter", label: "Shelter", icon: "🏠" },
  { id: "clothing", label: "Clothing", icon: "👕" },
  { id: "hygiene", label: "Hygiene", icon: "🚿" },
  { id: "healthcare", label: "Healthcare", icon: "❤️" },
  { id: "social", label: "Social Services", icon: "👥" },
  { id: "employment", label: "Employment", icon: "💼" },
  { id: "community", label: "Community & Faith", icon: "⛪" },
];

export default function SearchFilters({
  searchQuery,
  onSearch,
  activeCategory,
  onCategoryFilter,
}: SearchFiltersProps) {
  return (
    <section className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-4 pl-12 text-lg border-2 rounded-xl focus:border-primary"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Current Location
          </label>
          <div className="flex items-center space-x-2">
            <MapPin className="text-primary w-4 h-4" />
            <span className="text-foreground font-medium">Downtown San Francisco</span>
            <Button variant="link" size="sm" className="text-primary underline p-0">
              Update
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Service Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "secondary"}
                onClick={() => onCategoryFilter(category.id)}
                className={cn(
                  "px-4 py-3 rounded-full text-sm font-medium shadow-md transition-colors",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
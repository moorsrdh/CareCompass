import { type Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Phone, Navigation, Clock, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
}

const categoryColors = {
  food: "border-secondary",
  shelter: "border-warning",
  clothing: "border-purple",
  hygiene: "border-primary",
  healthcare: "border-destructive",
  social: "border-purple",
  employment: "border-secondary",
  community: "border-primary",
} as const;

const categoryIcons = {
  food: "🍽️",
  shelter: "🏠",
  clothing: "👕",
  hygiene: "🚿",
  healthcare: "❤️",
  social: "👥",
  employment: "💼",
  community: "⛪",
} as const;

const categoryBgColors = {
  food: "bg-secondary/10",
  shelter: "bg-warning/10",
  clothing: "bg-purple/10",
  hygiene: "bg-primary/10",
  healthcare: "bg-destructive/10",
  social: "bg-purple/10",
  employment: "bg-secondary/10",
  community: "bg-primary/10",
} as const;

const categoryTextColors = {
  food: "text-secondary",
  shelter: "text-warning",
  clothing: "text-purple",
  hygiene: "text-primary",
  healthcare: "text-destructive",
  social: "text-purple",
  employment: "text-secondary",
  community: "text-primary",
} as const;

const distanceBadgeColors = {
  food: "bg-secondary text-secondary-foreground",
  shelter: "bg-warning text-warning-foreground",
  clothing: "bg-purple text-purple-foreground",
  hygiene: "bg-primary text-primary-foreground",
  healthcare: "bg-destructive text-destructive-foreground",
  social: "bg-purple text-purple-foreground",
  employment: "bg-secondary text-secondary-foreground",
  community: "bg-primary text-primary-foreground",
} as const;

export default function ServiceCard({ service }: ServiceCardProps) {
  const categoryKey = service.category as keyof typeof categoryColors;
  
  const handleCall = () => {
    window.location.href = `tel:${service.phone}`;
  };

  const handleDirections = () => {
    const encodedAddress = encodeURIComponent(service.address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className={cn(
      "bg-card rounded-xl shadow-md p-6 border-l-4",
      categoryColors[categoryKey]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-3 rounded-full",
            categoryBgColors[categoryKey]
          )}>
            <span className="text-lg">
              {categoryIcons[categoryKey]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-card-foreground">
              {service.name}
            </h3>
            <p className="text-muted-foreground capitalize">
              {service.category === 'social' ? 'Social Services' : 
               service.category === 'community' ? 'Community & Faith' : 
               service.category}
            </p>
          </div>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          distanceBadgeColors[categoryKey]
        )}>
          {service.distance} mi
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="text-muted-foreground w-4 h-4 flex-shrink-0" />
          <span className="text-card-foreground text-sm">
            {service.address}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="text-muted-foreground w-4 h-4 flex-shrink-0" />
          <span className="text-card-foreground text-sm">
            <strong className={cn(
              service.status === "Open Now" ? "text-secondary" : 
              service.status === "Limited Space" ? "text-destructive" : "text-muted-foreground"
            )}>
              {service.status}
            </strong>
            <span className="ml-2">- {service.hours}</span>
          </span>
        </div>
        <div className="flex items-start space-x-3">
          <Info className="text-muted-foreground w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="text-card-foreground text-sm">
            {service.description}
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={handleCall}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Now
        </Button>
        <Button
          variant="secondary"
          onClick={handleDirections}
          className="flex-1"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Directions
        </Button>
      </div>
    </div>
  );
}
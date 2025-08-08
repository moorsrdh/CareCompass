import { Phone, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AppHeader() {
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Services",
      description: "Dial 911 for immediate emergency assistance",
      variant: "destructive",
    });
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HeartHandshake className="text-primary text-2xl" />
            <div>
              <h1 className="text-xl font-bold text-foreground">HelpFinder</h1>
              <p className="text-xs text-muted-foreground">Free & Open Access</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full shadow-lg"
            onClick={handleEmergencyCall}
          >
            <Phone className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
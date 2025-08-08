import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function EmergencyFAB() {
  const { toast } = useToast();

  const handleEmergencyClick = () => {
    toast({
      title: "Emergency Services",
      description: "For immediate help, dial 911. For crisis support, call 988 (Suicide & Crisis Lifeline)",
      variant: "destructive",
    });
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 md:bottom-6">
      <Button
        size="icon"
        onClick={handleEmergencyClick}
        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-14 h-14"
      >
        <AlertTriangle className="w-6 h-6" />
      </Button>
    </div>
  );
}

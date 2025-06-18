
import { Badge } from "@/components/ui/badge";
import { Palette } from "lucide-react";
import ThemeCustomization from "@/components/ThemeCustomization";

interface DesignPanelProps {
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
}

const DesignPanel = ({
  backgroundTheme,
  setBackgroundTheme
}: DesignPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">Design e Tema</h2>
        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
          Fase 4
        </Badge>
      </div>

      <ThemeCustomization 
        backgroundTheme={backgroundTheme}
        setBackgroundTheme={setBackgroundTheme}
      />
    </div>
  );
};

export default DesignPanel;

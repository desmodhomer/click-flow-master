
import { Settings, User, Image, Palette, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomizerSidebarProps {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
}

const CustomizerSidebar = ({ activeTab, setActiveTab }: CustomizerSidebarProps) => {
  const tabs = [
    { id: "basic", name: "Base", icon: Settings, description: "Configurazione di base" },
    { id: "profile", name: "Profilo", icon: User, description: "Informazioni personali" },
    { id: "images", name: "Immagini", icon: Image, description: "Foto e sfondi" },
    { id: "design", name: "Design", icon: Palette, description: "Temi e colori" },
    { id: "buttons", name: "Pulsanti", icon: MousePointer, description: "Design dei pulsanti" }
  ];

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-2">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-12 h-12 p-0 flex flex-col items-center justify-center text-xs hover:bg-gray-800",
              activeTab === tab.id 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "text-gray-400 hover:text-white"
            )}
            title={tab.description}
          >
            <IconComponent className="h-5 w-5 mb-1" />
            <span className="text-[10px] leading-none">{tab.name}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CustomizerSidebar;

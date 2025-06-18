
import { Button } from "@/components/ui/button";
import { Settings, User, Image as ImageIcon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomizerSidebarProps {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
}

const CustomizerSidebar = ({ activeTab, setActiveTab }: CustomizerSidebarProps) => {
  const tabs = [
    { id: "basic", label: "Configurazione", icon: Settings },
    { id: "profile", label: "Profilo", icon: User },
    { id: "images", label: "Immagini", icon: ImageIcon },
    { id: "design", label: "Design", icon: Palette },
  ];

  return (
    <div className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col py-4">
      <div className="space-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-12 h-12 mx-2 p-0 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors",
              activeTab === tab.id && "text-white bg-blue-600 hover:bg-blue-700"
            )}
            title={tab.label}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{tab.label.charAt(0)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CustomizerSidebar;

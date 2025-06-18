
import { Button } from "@/components/ui/button";
import { Settings, User, Image as ImageIcon, Palette, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomizerSidebarProps {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
}

const CustomizerSidebar = ({ activeTab, setActiveTab }: CustomizerSidebarProps) => {
  const tabs = [
    { 
      id: "basic", 
      label: "Configurazione", 
      icon: Settings, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    { 
      id: "profile", 
      label: "Profilo", 
      icon: User, 
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    { 
      id: "images", 
      label: "Immagini", 
      icon: ImageIcon, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    { 
      id: "design", 
      label: "Design", 
      icon: Palette, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col py-6 shadow-sm">
      <div className="space-y-3">
        {tabs.map((tab) => (
          <div key={tab.id} className="px-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-12 h-12 p-0 flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 group rounded-xl",
                activeTab === tab.id 
                  ? `${tab.bgColor} ${tab.color} ${tab.borderColor} border shadow-md` 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
              title={tab.label}
            >
              <tab.icon className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeTab === tab.id ? "scale-110" : "group-hover:scale-105"
              )} />
              {activeTab === tab.id && (
                <ChevronRight className="h-3 w-3 absolute -right-1 opacity-60" />
              )}
            </Button>
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-6 px-2">
        <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
            style={{ 
              width: activeTab ? `${((tabs.findIndex(t => t.id === activeTab) + 1) / tabs.length) * 100}%` : '0%' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizerSidebar;

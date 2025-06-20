
import { Button } from "@/components/ui/button";
import { PanelLeft, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

interface CustomizerHeaderProps {
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

const CustomizerHeader = ({ isPanelOpen, onTogglePanel }: CustomizerHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePanel}
          className="text-gray-600 hover:text-gray-900"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        
        {isPanelOpen && (
          <h1 className="text-lg font-semibold text-gray-900">
            Link Customizer
          </h1>
        )}
      </div>

      {isPanelOpen && (
        <Button variant="outline" size="sm" asChild>
          <Link to="/user-links">
            <BarChart3 className="h-4 w-4 mr-2" />
            Le tue pagine
          </Link>
        </Button>
      )}
    </div>
  );
};

export default CustomizerHeader;

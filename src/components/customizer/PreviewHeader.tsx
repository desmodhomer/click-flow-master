
import { Eye, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewHeaderProps {
  viewMode: 'mobile' | 'desktop';
  onViewModeChange: (mode: 'mobile' | 'desktop') => void;
}

const PreviewHeader = ({ viewMode, onViewModeChange }: PreviewHeaderProps) => {
  return (
    <div className="pb-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <Eye className="h-5 w-5 text-gray-600" />
            <span>Anteprima Live</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Device Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              onClick={() => onViewModeChange('mobile')}
              className="h-8 px-3 text-xs"
            >
              <Smartphone className="h-3 w-3 mr-1" />
              Mobile
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              onClick={() => onViewModeChange('desktop')}
              className="h-8 px-3 text-xs"
            >
              <Monitor className="h-3 w-3 mr-1" />
              Desktop
            </Button>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {viewMode === 'mobile' ? (
              <>
                <Smartphone className="h-4 w-4" />
                <span>Mobile (375×812px)</span>
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4" />
                <span>Desktop (1200×800px)</span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        {viewMode === 'mobile' 
          ? 'Dimensioni reali iPhone 12/13/14 - Visualizzazione 1:1'
          : 'Visualizzazione desktop ottimizzata - Larghezza massima 1200px'
        }
      </p>
    </div>
  );
};

export default PreviewHeader;

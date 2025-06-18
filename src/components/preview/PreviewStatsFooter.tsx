
import { BarChart3, Calendar, ExternalLink } from "lucide-react";

const PreviewStatsFooter = () => {
  return (
    <div className="px-4 mb-2">
      {/* Footer più compatto e moderno */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4">
        {/* Stats section più piccola */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">0</div>
              <div className="text-xs text-gray-500">visite</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">Attivo</span>
          </div>
        </div>
        
        {/* Branding più elegante */}
        <div className="pt-3 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400 mb-2">
            Powered by
          </p>
          <div className="text-purple-600 font-bold text-sm flex items-center justify-center gap-2">
            <span className="text-lg">🔗</span>
            lnkfire.dev
            <ExternalLink className="h-3 w-3 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStatsFooter;

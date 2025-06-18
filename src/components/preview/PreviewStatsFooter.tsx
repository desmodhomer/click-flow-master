
import { BarChart3, Calendar, ExternalLink } from "lucide-react";

const PreviewStatsFooter = () => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-sm text-gray-500">visite totali</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Attivo</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 mb-3 font-medium">
          Powered by
        </p>
        <div className="text-blue-600 font-bold text-sm flex items-center justify-center gap-2">
          <span className="text-xl">🔗</span>
          lnkfire.dev
          <ExternalLink className="h-3 w-3 opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default PreviewStatsFooter;

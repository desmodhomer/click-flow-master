
import { Eye, Smartphone } from "lucide-react";

const PreviewHeader = () => {
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
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Smartphone className="h-4 w-4" />
            <span>Mobile (375×812px)</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Dimensioni reali iPhone 12/13/14 - Visualizzazione 1:1
      </p>
    </div>
  );
};

export default PreviewHeader;

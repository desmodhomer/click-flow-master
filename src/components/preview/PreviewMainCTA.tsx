
import { ExternalLink } from "lucide-react";

const PreviewMainCTA = () => {
  return (
    <div className="px-4 mb-3">
      {/* Button principale più pulito */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="text-center">          
          {/* Button principale minimalista */}
          <div className="w-full h-12 bg-white/90 text-gray-900 text-sm font-medium shadow-lg rounded-xl flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visita il Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMainCTA;

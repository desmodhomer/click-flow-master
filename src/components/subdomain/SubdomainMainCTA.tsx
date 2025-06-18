
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Play } from "lucide-react";

interface SubdomainMainCTAProps {
  onVisitLink: () => void;
  onShare: () => void;
}

const SubdomainMainCTA = ({ onVisitLink, onShare }: SubdomainMainCTAProps) => {
  return (
    <div className="space-y-3">
      {/* Main CTA Card - More Compact */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-200/50 overflow-hidden">
        <div className="h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-base mb-1">
            Contenuto Principale
          </h3>
          <p className="text-gray-600 text-xs mb-3">
            Clicca per accedere al contenuto
          </p>
          <Button 
            onClick={onVisitLink}
            className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 rounded-lg text-sm"
          >
            <ExternalLink className="mr-2 h-3 w-3" />
            Apri Link
          </Button>
        </div>
      </div>

      {/* Share Button - More Compact */}
      <Button 
        onClick={onShare}
        variant="outline"
        className="w-full h-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-gray-50 transition-all duration-200 rounded-lg text-sm"
      >
        <Share2 className="mr-2 h-3 w-3" />
        Condividi Profilo
      </Button>
    </div>
  );
};

export default SubdomainMainCTA;

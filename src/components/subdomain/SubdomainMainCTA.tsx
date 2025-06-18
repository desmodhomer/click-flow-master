
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Play } from "lucide-react";

interface SubdomainMainCTAProps {
  onVisitLink: () => void;
  onShare: () => void;
}

const SubdomainMainCTA = ({ onVisitLink, onShare }: SubdomainMainCTAProps) => {
  return (
    <div className="space-y-4">
      {/* Main CTA Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
              <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-lg mb-1">
            Contenuto Principale
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Clicca per accedere al contenuto
          </p>
          <Button 
            onClick={onVisitLink}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Apri Link
          </Button>
        </div>
      </div>

      {/* Share Button */}
      <Button 
        onClick={onShare}
        variant="outline"
        className="w-full h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-gray-50 transition-all duration-300 rounded-xl"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Condividi Profilo
      </Button>
    </div>
  );
};

export default SubdomainMainCTA;


import { Button } from "@/components/ui/button";
import { ExternalLink, Share2 } from "lucide-react";

interface SubdomainMainCTAProps {
  onVisitLink: () => void;
  onShare: () => void;
}

const SubdomainMainCTA = ({ onVisitLink, onShare }: SubdomainMainCTAProps) => {
  return (
    <div className="bg-white/96 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20">
      <div className="text-center space-y-10">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
          <ExternalLink className="h-12 w-12 text-white" />
        </div>
        
        <h3 className="text-4xl font-bold text-gray-800">
          Scopri di più
        </h3>
        
        <p className="text-gray-600 text-xl leading-relaxed max-w-md mx-auto">
          Clicca il pulsante qui sotto per visitare il link principale
        </p>
        
        <Button 
          onClick={onVisitLink}
          className="w-full h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 rounded-3xl"
          size="lg"
        >
          <ExternalLink className="mr-4 h-8 w-8" />
          Visita il Link
          <div className="ml-4 w-5 h-5 bg-white rounded-full animate-pulse"></div>
        </Button>
        
        <Button 
          onClick={onShare}
          variant="outline"
          className="w-full h-16 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-2xl text-lg"
        >
          <Share2 className="mr-3 h-6 w-6" />
          Condividi questo profilo
        </Button>
      </div>
    </div>
  );
};

export default SubdomainMainCTA;

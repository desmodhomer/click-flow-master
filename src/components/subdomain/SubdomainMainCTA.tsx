
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2 } from "lucide-react";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

interface SubdomainMainCTAProps {
  customButtons?: CustomButton[];
  onShare: () => void;
}

const SubdomainMainCTA = ({ customButtons = [], onShare }: SubdomainMainCTAProps) => {
  const handleButtonClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white/96 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 w-full">
      <div className="text-center space-y-6 sm:space-y-8">
        {customButtons.length > 0 ? (
          <>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <ExternalLink className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            
            <div className="space-y-4 w-full">
              {customButtons.map((button) => (
                <Button 
                  key={button.id}
                  onClick={() => handleButtonClick(button.url)}
                  className="w-full h-16 sm:h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 rounded-3xl"
                  size="lg"
                >
                  <ExternalLink className="mr-3 sm:mr-4 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="truncate">{button.text || 'Pulsante'}</span>
                  <div className="ml-3 sm:ml-4 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full animate-pulse flex-shrink-0"></div>
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <ExternalLink className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 break-words">
              Nessun pulsante configurato
            </h3>
            
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-md mx-auto break-words">
              Il proprietario di questa pagina deve ancora configurare i pulsanti
            </p>
          </>
        )}
        
        <Button 
          onClick={onShare}
          variant="outline"
          className="w-full h-14 sm:h-16 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-2xl text-base sm:text-lg"
        >
          <Share2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
          <span className="truncate">Condividi questo profilo</span>
        </Button>
      </div>
    </div>
  );
};

export default SubdomainMainCTA;

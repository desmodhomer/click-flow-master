
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
    <div className="bg-white/96 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20">
      <div className="text-center space-y-8">
        {customButtons.length > 0 ? (
          <>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <ExternalLink className="h-12 w-12 text-white" />
            </div>
            
            <div className="space-y-4">
              {customButtons.map((button) => (
                <Button 
                  key={button.id}
                  onClick={() => handleButtonClick(button.url)}
                  className="w-full h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 rounded-3xl"
                  size="lg"
                >
                  <ExternalLink className="mr-4 h-6 w-6" />
                  {button.text || 'Pulsante'}
                  <div className="ml-4 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <ExternalLink className="h-12 w-12 text-white" />
            </div>
            
            <h3 className="text-4xl font-bold text-gray-800">
              Nessun pulsante configurato
            </h3>
            
            <p className="text-gray-600 text-xl leading-relaxed max-w-md mx-auto">
              Il proprietario di questa pagina deve ancora configurare i pulsanti
            </p>
          </>
        )}
        
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

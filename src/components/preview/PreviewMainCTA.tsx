
import { ExternalLink } from "lucide-react";

const PreviewMainCTA = () => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <ExternalLink className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800">
          Scopri di più
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          Clicca il pulsante qui sotto per visitare il link principale
        </p>
        
        <div className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold shadow-xl rounded-2xl flex items-center justify-center">
          <ExternalLink className="mr-3 h-6 w-6" />
          Visita il Link
          <div className="ml-3 w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMainCTA;


import { ExternalLink } from "lucide-react";

const PreviewMainCTA = () => {
  return (
    <div className="px-4 mb-4">
      {/* Card principale più moderna e compatta */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
        <div className="text-center space-y-4">
          {/* Icon più grande e colorata */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <ExternalLink className="h-8 w-8 text-white" />
          </div>
          
          {/* Titolo più grande */}
          <h3 className="text-xl font-bold text-gray-800">
            Scopri di più
          </h3>
          
          {/* Descrizione più compatta */}
          <p className="text-gray-600 text-sm leading-relaxed">
            Clicca per visitare il link principale
          </p>
          
          {/* Button principale più moderno */}
          <div className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-xl rounded-2xl flex items-center justify-center cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visita il Link
            <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMainCTA;

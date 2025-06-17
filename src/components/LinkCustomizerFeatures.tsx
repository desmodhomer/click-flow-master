
import { Shield, BarChart3, Sparkles } from "lucide-react";

const LinkCustomizerFeatures = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 text-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
        </div>
        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Sicurezza Garantita</h3>
        <p className="text-gray-300 text-xs sm:text-sm">SSL integrato e protezione anti-spam</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 text-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
        </div>
        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Analytics Avanzate</h3>
        <p className="text-gray-300 text-xs sm:text-sm">Traccia click e performance in tempo reale</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
        </div>
        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Branding Professionale</h3>
        <p className="text-gray-300 text-xs sm:text-sm">Sottodomini personalizzati e memorabili</p>
      </div>
    </div>
  );
};

export default LinkCustomizerFeatures;

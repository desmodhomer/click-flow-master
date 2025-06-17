
import { Shield, BarChart3, Sparkles } from "lucide-react";

const LinkCustomizerFeatures = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-blue-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Sicurezza Garantita</h3>
        <p className="text-gray-300 text-sm">SSL integrato e protezione anti-spam</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-purple-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Analytics Avanzate</h3>
        <p className="text-gray-300 text-sm">Traccia click e performance in tempo reale</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-green-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-6 w-6 text-green-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Branding Professionale</h3>
        <p className="text-gray-300 text-sm">Sottodomini personalizzati e memorabili</p>
      </div>
    </div>
  );
};

export default LinkCustomizerFeatures;


import { Monitor } from "lucide-react";

const EmptyPreviewState = () => {
  return (
    <div className="h-full flex items-center justify-center p-12">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Monitor className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Inizia a Personalizzare</h3>
        <p className="text-gray-500 max-w-md">
          Usa la barra laterale per configurare il tuo link personalizzato e vedrai l'anteprima apparire qui in tempo reale
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Pronto per la personalizzazione</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyPreviewState;

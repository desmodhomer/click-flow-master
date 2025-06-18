
import { Palette } from "lucide-react";

const ButtonDesignHeader = () => {
  return (
    <div className="text-center pb-4 border-b border-gray-100">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
        <Palette className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Gestione Pulsanti</h3>
      <p className="text-sm text-gray-500 mt-1">Aggiungi e personalizza i tuoi pulsanti</p>
    </div>
  );
};

export default ButtonDesignHeader;

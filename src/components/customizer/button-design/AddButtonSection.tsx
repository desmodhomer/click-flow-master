
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";

interface AddButtonSectionProps {
  onAddButton: () => void;
}

const AddButtonSection = ({ onAddButton }: AddButtonSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-xl p-8">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Plus className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-gray-900">Crea un nuovo pulsante</h4>
          <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
            Aggiungi pulsanti personalizzati per i tuoi link preferiti e crea la tua pagina unica
          </p>
        </div>
        <Button 
          onClick={onAddButton} 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-0"
        >
          <Plus className="h-5 w-5 mr-3" />
          Aggiungi Pulsante
        </Button>
      </div>
    </div>
  );
};

export default AddButtonSection;

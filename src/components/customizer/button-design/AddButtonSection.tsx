
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";

interface AddButtonSectionProps {
  onAddButton: () => void;
}

const AddButtonSection = ({ onAddButton }: AddButtonSectionProps) => {
  return (
    <div className="flex items-center justify-center min-h-[300px] w-full">
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-all duration-300 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Plus className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-gray-900">Crea un nuovo pulsante</h4>
            <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
              Aggiungi pulsanti personalizzati per i tuoi link preferiti e crea la tua pagina unica
            </p>
          </div>
          <div className="flex justify-center w-full">
            <Button 
              onClick={onAddButton} 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 text-base shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border-0 rounded-xl"
            >
              <Plus className="h-5 w-5 mr-2" strokeWidth={2.5} />
              Aggiungi Pulsante
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddButtonSection;

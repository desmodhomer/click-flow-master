
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";

interface AddButtonSectionProps {
  onAddButton: () => void;
}

const AddButtonSection = ({ onAddButton }: AddButtonSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-xl p-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
          <Plus className="h-8 w-8 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Crea un nuovo pulsante</h4>
          <p className="text-sm text-gray-600 mb-4">Aggiungi pulsanti personalizzati per i tuoi link</p>
        </div>
        <Button 
          onClick={onAddButton} 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Aggiungi Pulsante
        </Button>
      </div>
    </div>
  );
};

export default AddButtonSection;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Edit3 } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";

interface ButtonListProps {
  customButtons: CustomButton[];
  onUpdateButton: (id: string, field: keyof CustomButton, value: string) => void;
  onRemoveButton: (id: string) => void;
}

const ButtonList = ({ customButtons, onUpdateButton, onRemoveButton }: ButtonListProps) => {
  if (customButtons.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h4 className="text-base font-semibold text-gray-800">I tuoi Pulsanti</h4>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
          {customButtons.length} {customButtons.length === 1 ? 'pulsante' : 'pulsanti'}
        </span>
      </div>

      <div className="space-y-3">
        {customButtons.map((button, index) => (
          <div key={button.id} className="relative group">
            <div className="p-4 border border-gray-200 rounded-xl space-y-4 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-800">Pulsante {index + 1}</span>
                </div>
                <Button 
                  onClick={() => onRemoveButton(button.id)} 
                  size="sm" 
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    <Edit3 className="inline h-3 w-3 mr-1" />
                    Testo del pulsante
                  </Label>
                  <Input
                    placeholder="Es. Visita il sito"
                    value={button.text}
                    onChange={(e) => onUpdateButton(button.id, 'text', e.target.value)}
                    className="h-9 text-sm border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    🔗 URL di destinazione
                  </Label>
                  <Input
                    placeholder="https://esempio.com"
                    value={button.url}
                    onChange={(e) => onUpdateButton(button.id, 'url', e.target.value)}
                    className="h-9 text-sm border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;

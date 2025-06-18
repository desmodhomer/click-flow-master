
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">I tuoi Pulsanti ({customButtons.length})</h4>
      </div>

      <div className="space-y-3">
        {customButtons.map((button, index) => (
          <div key={button.id} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Pulsante {index + 1}</span>
              <Button 
                onClick={() => onRemoveButton(button.id)} 
                size="sm" 
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-600">Testo del pulsante</Label>
                <Input
                  placeholder="Visita il sito"
                  value={button.text}
                  onChange={(e) => onUpdateButton(button.id, 'text', e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600">URL di destinazione</Label>
                <Input
                  placeholder="https://esempio.com"
                  value={button.url}
                  onChange={(e) => onUpdateButton(button.id, 'url', e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;

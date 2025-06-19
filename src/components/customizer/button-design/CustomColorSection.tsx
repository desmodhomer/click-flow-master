
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

interface CustomColorSectionProps {
  customButtons: any[];
  selectedButtonId: string;
  onCustomColorUpdate: (customColorCode: string) => void;
}

const CustomColorSection = ({
  customButtons,
  selectedButtonId,
  onCustomColorUpdate
}: CustomColorSectionProps) => {
  const [showAdvancedColor, setShowAdvancedColor] = useState(false);
  const [customColorCode, setCustomColorCode] = useState('#ffffff');

  const handleCustomColorSubmit = () => {
    console.log('Applicando colore personalizzato:', customColorCode);
    onCustomColorUpdate(customColorCode);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">Colore Personalizzato</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedColor(!showAdvancedColor)}
          className="h-8 px-2"
        >
          <Palette className="h-3 w-3 mr-1" />
          {showAdvancedColor ? 'Nascondi' : 'Mostra'}
        </Button>
      </div>

      {showAdvancedColor && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="colorPicker" className="text-xs text-gray-600">
              Seleziona colore
            </Label>
            <div className="flex gap-2">
              <input
                id="colorPicker"
                type="color"
                value={customColorCode}
                onChange={(e) => setCustomColorCode(e.target.value)}
                className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                type="text"
                value={customColorCode}
                onChange={(e) => setCustomColorCode(e.target.value)}
                placeholder="#ffffff"
                className="flex-1 h-8 text-xs"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div 
              className="w-8 h-8 rounded border border-gray-300" 
              style={{ backgroundColor: customColorCode }}
            ></div>
            <Button
              onClick={handleCustomColorSubmit}
              size="sm"
              className="flex-1 h-8 text-xs"
            >
              Applica Colore
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomColorSection;

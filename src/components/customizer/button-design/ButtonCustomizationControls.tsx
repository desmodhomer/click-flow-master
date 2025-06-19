
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Square, Circle, CornerRightUp, Palette } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";
import { useState } from "react";

interface ButtonCustomizationControlsProps {
  customButtons: CustomButton[];
  selectedButtonId: string;
  onSelectedButtonChange: (value: string) => void;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
  currentStyle: string;
  currentColor: string;
  currentSize: string;
  currentSpacing: number;
}

const ButtonCustomizationControls = ({
  customButtons,
  selectedButtonId,
  onSelectedButtonChange,
  onButtonDesignUpdate,
  currentStyle,
  currentColor,
  currentSize,
  currentSpacing
}: ButtonCustomizationControlsProps) => {
  const [showAdvancedColor, setShowAdvancedColor] = useState(false);
  const [customColorCode, setCustomColorCode] = useState('#ffffff');

  const buttonStyles = [
    { id: 'rounded', name: 'Arrotondato', class: 'rounded-xl', icon: CornerRightUp },
    { id: 'square', name: 'Quadrato', class: 'rounded-none', icon: Square },
    { id: 'pill', name: 'Pillola', class: 'rounded-full', icon: Circle }
  ];

  // Colori base (senza gradienti)
  const buttonColors = [
    { id: 'white', name: 'Bianco', class: 'bg-white/90 text-gray-900 hover:bg-white', color: '#ffffff' },
    { id: 'black', name: 'Nero', class: 'bg-gray-900 text-white hover:bg-gray-800', color: '#111827' },
    { id: 'gray', name: 'Grigio', class: 'bg-gray-600 text-white hover:bg-gray-700', color: '#4b5563' },
    { id: 'red', name: 'Rosso', class: 'bg-red-600 text-white hover:bg-red-700', color: '#dc2626' },
    { id: 'orange', name: 'Arancione', class: 'bg-orange-600 text-white hover:bg-orange-700', color: '#ea580c' },
    { id: 'yellow', name: 'Giallo', class: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600', color: '#eab308' },
    { id: 'green', name: 'Verde', class: 'bg-green-600 text-white hover:bg-green-700', color: '#16a34a' },
    { id: 'teal', name: 'Verde Acqua', class: 'bg-teal-600 text-white hover:bg-teal-700', color: '#0d9488' },
    { id: 'blue', name: 'Blu', class: 'bg-blue-600 text-white hover:bg-blue-700', color: '#2563eb' },
    { id: 'indigo', name: 'Indaco', class: 'bg-indigo-600 text-white hover:bg-indigo-700', color: '#4f46e5' },
    { id: 'purple', name: 'Viola', class: 'bg-purple-600 text-white hover:bg-purple-700', color: '#9333ea' },
    { id: 'pink', name: 'Rosa', class: 'bg-pink-600 text-white hover:bg-pink-700', color: '#db2777' }
  ];

  // Colori gradiente separati
  const gradientColors = [
    { id: 'gradient-blue', name: 'Blu-Viola', class: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700', color: 'linear-gradient(to right, #2563eb, #9333ea)' },
    { id: 'gradient-orange', name: 'Arancione-Rosso', class: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600', color: 'linear-gradient(to right, #f97316, #ef4444)' },
    { id: 'gradient-green', name: 'Verde-Teal', class: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600', color: 'linear-gradient(to right, #22c55e, #14b8a6)' },
    { id: 'gradient-pink', name: 'Rosa-Viola', class: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600', color: 'linear-gradient(to right, #ec4899, #a855f7)' }
  ];

  const buttonSizes = [
    { id: 'tiny', name: '1 - Piccolissimo', height: 'h-6' },
    { id: 'small', name: '2 - Piccolo', height: 'h-8' },
    { id: 'medium', name: '3 - Medio', height: 'h-10' },
    { id: 'large', name: '4 - Grande', height: 'h-12' },
    { id: 'xlarge', name: '5 - Grandissimo', height: 'h-14' }
  ];

  const handleCustomColorSubmit = () => {
    const customColorId = `custom-${Date.now()}`;
    console.log('Applicando colore personalizzato:', customColorCode, 'con ID:', customColorId);
    
    // Aggiorna il colore usando la funzione principale
    onButtonDesignUpdate('color', customColorId);
    
    // Salva il codice colore personalizzato direttamente sui pulsanti
    if (selectedButtonId === "all") {
      customButtons.forEach(button => {
        (button as any).customColorCode = customColorCode;
      });
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      if (selectedButton) {
        (selectedButton as any).customColorCode = customColorCode;
      }
    }
    
    console.log('Colore personalizzato applicato con successo');
  };

  const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
  };

  return (
    <>
      {/* Selezione pulsante da modificare */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Personalizza Design</h4>
        <Select value={selectedButtonId} onValueChange={onSelectedButtonChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i pulsanti</SelectItem>
            {customButtons.map((button, index) => (
              <SelectItem key={button.id} value={button.id}>
                Pulsante {index + 1}: {button.text || 'Senza titolo'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Forma del pulsante */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Forma</h4>
        <div className="grid grid-cols-3 gap-2">
          {buttonStyles.map((style) => {
            const IconComponent = style.icon;
            return (
              <Button
                key={style.id}
                variant={currentStyle === style.id ? "default" : "outline"}
                size="sm"
                onClick={() => onButtonDesignUpdate('style', style.id)}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs">{style.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Dimensione del pulsante */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Dimensione</h4>
        <div className="grid grid-cols-1 gap-2">
          {buttonSizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSize === size.id ? "default" : "outline"}
              size="sm"
              onClick={() => onButtonDesignUpdate('size', size.id)}
              className="justify-start"
            >
              <span className="text-sm">{size.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Spaziatura tra pulsanti */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Spaziatura</h4>
        <div className="px-2">
          <Slider
            value={[currentSpacing]}
            onValueChange={(value) => onButtonDesignUpdate('spacing', value[0])}
            max={6}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 - Minima</span>
            <span>6 - Massima</span>
          </div>
        </div>
      </div>

      {/* Colori Base */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Colori Base</h4>
        <div className="grid grid-cols-2 gap-2">
          {buttonColors.map((color) => (
            <Button
              key={color.id}
              variant={currentColor === color.id ? "default" : "outline"}
              size="sm"
              onClick={() => onButtonDesignUpdate('color', color.id)}
              className="w-full justify-start h-10"
            >
              <div 
                className="w-5 h-5 rounded mr-2 border border-gray-200" 
                style={{ backgroundColor: color.color }}
              ></div>
              <span className="text-xs">{color.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Colori Gradiente */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Colori Gradiente</h4>
        <div className="grid grid-cols-1 gap-2">
          {gradientColors.map((color) => (
            <Button
              key={color.id}
              variant={currentColor === color.id ? "default" : "outline"}
              size="sm"
              onClick={() => onButtonDesignUpdate('color', color.id)}
              className="w-full justify-start h-10"
            >
              <div 
                className="w-5 h-5 rounded mr-2 border border-gray-200" 
                style={{ background: color.color }}
              ></div>
              <span className="text-xs">{color.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Colore Personalizzato */}
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
    </>
  );
};

export default ButtonCustomizationControls;

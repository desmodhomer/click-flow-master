
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Square, Circle, CornerRightUp } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";

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
  const buttonStyles = [
    { id: 'rounded', name: 'Arrotondato', class: 'rounded-xl', icon: CornerRightUp },
    { id: 'square', name: 'Quadrato', class: 'rounded-none', icon: Square },
    { id: 'pill', name: 'Pillola', class: 'rounded-full', icon: Circle }
  ];

  const buttonColors = [
    { id: 'white', name: 'Bianco', class: 'bg-white/90 text-gray-900 hover:bg-white' },
    { id: 'black', name: 'Nero', class: 'bg-gray-900 text-white hover:bg-gray-800' },
    { id: 'blue', name: 'Blu', class: 'bg-blue-600 text-white hover:bg-blue-700' },
    { id: 'gradient-blue', name: 'Gradiente Blu', class: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' },
    { id: 'gradient-orange', name: 'Gradiente Arancione', class: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' }
  ];

  const buttonSizes = [
    { id: 'tiny', name: '1 - Piccolissimo', height: 'h-6' },
    { id: 'small', name: '2 - Piccolo', height: 'h-8' },
    { id: 'medium', name: '3 - Medio', height: 'h-10' },
    { id: 'large', name: '4 - Grande', height: 'h-12' },
    { id: 'xlarge', name: '5 - Grandissimo', height: 'h-14' }
  ];

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

      {/* Colore del pulsante */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Colore</h4>
        <div className="space-y-2">
          {buttonColors.map((color) => (
            <Button
              key={color.id}
              variant={currentColor === color.id ? "default" : "outline"}
              size="sm"
              onClick={() => onButtonDesignUpdate('color', color.id)}
              className="w-full justify-start"
            >
              <div className={`w-4 h-4 rounded mr-2 ${color.class.split(' ')[0]}`}></div>
              {color.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ButtonCustomizationControls;


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Square, Circle, RoundedCorner } from "lucide-react";
import { CustomButton } from "./ConfigurationPanel";

interface ButtonDesignPanelProps {
  customButtons: CustomButton[];
  setCustomButtons: (buttons: CustomButton[]) => void;
}

const ButtonDesignPanel = ({ customButtons, setCustomButtons }: ButtonDesignPanelProps) => {
  const buttonStyles = [
    { id: 'rounded', name: 'Arrotondato', class: 'rounded-xl', icon: RoundedCorner },
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

  const updateButtonDesign = (property: string, value: string) => {
    const updatedButtons = customButtons.map(button => ({
      ...button,
      [property]: value
    }));
    setCustomButtons(updatedButtons);
  };

  const currentButton = customButtons[0];
  const currentStyle = currentButton?.style || 'rounded';
  const currentColor = currentButton?.color || 'white';

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Palette className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Design Pulsanti</h3>
        <p className="text-sm text-gray-500 mt-1">Personalizza l'aspetto dei tuoi pulsanti</p>
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
                onClick={() => updateButtonDesign('style', style.id)}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs">{style.name}</span>
              </Button>
            );
          })}
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
              onClick={() => updateButtonDesign('color', color.id)}
              className="w-full justify-start"
            >
              <div className={`w-4 h-4 rounded mr-2 ${color.class.split(' ')[0]}`}></div>
              {color.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Anteprima */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Anteprima</h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          {currentButton && (
            <div 
              className={`w-full h-12 flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium shadow-lg ${
                buttonStyles.find(s => s.id === currentStyle)?.class || 'rounded-xl'
              } ${
                buttonColors.find(c => c.id === currentColor)?.class || 'bg-white/90 text-gray-900 hover:bg-white'
              }`}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {currentButton.text || 'Pulsante'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonDesignPanel;

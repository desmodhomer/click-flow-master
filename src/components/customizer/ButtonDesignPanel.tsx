import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Square, Circle, CornerRightUp, ExternalLink, ChevronDown, ALargeSmall, Minus, Plus } from "lucide-react";
import { CustomButton } from "./ConfigurationPanel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ButtonDesignPanelProps {
  customButtons: CustomButton[];
  setCustomButtons: (buttons: CustomButton[]) => void;
}

const ButtonDesignPanel = ({ customButtons, setCustomButtons }: ButtonDesignPanelProps) => {
  const [selectedButtonId, setSelectedButtonId] = useState<string>("all");
  
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
    { id: 'tiny', name: 'Piccolissimo', height: 'h-8' },
    { id: 'small', name: 'Piccolo', height: 'h-9' },
    { id: 'medium', name: 'Medio', height: 'h-11' },
    { id: 'large', name: 'Grande', height: 'h-13' }
  ];

  const updateButtonDesign = (property: string, value: string | number) => {
    if (selectedButtonId === "all") {
      // Modifica tutti i pulsanti
      const updatedButtons = customButtons.map(button => ({
        ...button,
        [property]: value
      }));
      setCustomButtons(updatedButtons);
    } else {
      // Modifica solo il pulsante selezionato
      const updatedButtons = customButtons.map(button => 
        button.id === selectedButtonId 
          ? { ...button, [property]: value }
          : button
      );
      setCustomButtons(updatedButtons);
    }
  };

  const getCurrentButtonStyle = () => {
    if (selectedButtonId === "all") {
      // Se tutti i pulsanti hanno lo stesso stile, mostralo, altrimenti mostra il default
      const firstButtonStyle = customButtons[0]?.style || 'rounded';
      const allSameStyle = customButtons.every(btn => btn.style === firstButtonStyle);
      return allSameStyle ? firstButtonStyle : 'rounded';
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.style || 'rounded';
    }
  };

  const getCurrentButtonColor = () => {
    if (selectedButtonId === "all") {
      // Se tutti i pulsanti hanno lo stesso colore, mostralo, altrimenti mostra il default
      const firstButtonColor = customButtons[0]?.color || 'white';
      const allSameColor = customButtons.every(btn => btn.color === firstButtonColor);
      return allSameColor ? firstButtonColor : 'white';
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.color || 'white';
    }
  };

  const getCurrentButtonSize = () => {
    if (selectedButtonId === "all") {
      const firstButtonSize = customButtons[0]?.size || 'medium';
      const allSameSize = customButtons.every(btn => btn.size === firstButtonSize);
      return allSameSize ? firstButtonSize : 'medium';
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.size || 'medium';
    }
  };

  const getCurrentButtonSpacing = () => {
    if (selectedButtonId === "all") {
      const firstButtonSpacing = customButtons[0]?.spacing || 3;
      const allSameSpacing = customButtons.every(btn => btn.spacing === firstButtonSpacing);
      return allSameSpacing ? firstButtonSpacing : 3;
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.spacing || 3;
    }
  };

  const currentStyle = getCurrentButtonStyle();
  const currentColor = getCurrentButtonColor();
  const currentSize = getCurrentButtonSize();
  const currentSpacing = getCurrentButtonSpacing();

  if (customButtons.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Design Pulsanti</h3>
          <p className="text-sm text-gray-500 mt-1">Aggiungi prima dei pulsanti per personalizzarne il design</p>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-500">Nessun pulsante disponibile per la personalizzazione</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Palette className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Design Pulsanti</h3>
        <p className="text-sm text-gray-500 mt-1">Personalizza l'aspetto dei tuoi pulsanti</p>
      </div>

      {/* Selezione pulsante da modificare */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Modifica</h4>
        <Select value={selectedButtonId} onValueChange={setSelectedButtonId}>
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

      {/* Dimensione del pulsante */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Dimensione</h4>
        <div className="grid grid-cols-2 gap-2">
          {buttonSizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSize === size.id ? "default" : "outline"}
              size="sm"
              onClick={() => updateButtonDesign('size', size.id)}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <ALargeSmall className="h-3 w-3" />
              <span className="text-xs">{size.name}</span>
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
            onValueChange={(value) => updateButtonDesign('spacing', value[0])}
            max={6}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Minima</span>
            <span>Massima</span>
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
          <div className={`space-y-${currentSpacing}`}>
            {selectedButtonId === "all" ? (
              // Mostra tutti i pulsanti se "all" è selezionato
              customButtons.map((button, index) => {
                const sizeClass = buttonSizes.find(s => s.id === button.size)?.height || 'h-11';
                return (
                  <div 
                    key={button.id}
                    className={`w-full ${sizeClass} flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium shadow-lg ${
                      buttonStyles.find(s => s.id === button.style)?.class || 'rounded-xl'
                    } ${
                      buttonColors.find(c => c.id === button.color)?.class || 'bg-white/90 text-gray-900 hover:bg-white'
                    }`}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {button.text || `Pulsante ${index + 1}`}
                  </div>
                );
              })
            ) : (
              // Mostra solo il pulsante selezionato
              (() => {
                const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
                if (!selectedButton) return null;
                const sizeClass = buttonSizes.find(s => s.id === selectedButton.size)?.height || 'h-11';
                return (
                  <div 
                    className={`w-full ${sizeClass} flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium shadow-lg ${
                      buttonStyles.find(s => s.id === selectedButton.style)?.class || 'rounded-xl'
                    } ${
                      buttonColors.find(c => c.id === selectedButton.color)?.class || 'bg-white/90 text-gray-900 hover:bg-white'
                    }`}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {selectedButton.text || 'Pulsante'}
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDesignPanel;

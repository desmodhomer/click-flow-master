
import { ExternalLink } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";

interface ButtonPreviewProps {
  customButtons: CustomButton[];
  selectedButtonId: string;
  currentSpacing: number;
}

const ButtonPreview = ({ customButtons, selectedButtonId, currentSpacing }: ButtonPreviewProps) => {
  const buttonStyles = [
    { id: 'rounded', name: 'Arrotondato', class: 'rounded-xl' },
    { id: 'square', name: 'Quadrato', class: 'rounded-none' },
    { id: 'pill', name: 'Pillola', class: 'rounded-full' }
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

  const getButtonSpacing = (spacing?: number, index?: number, isLast?: boolean) => {
    const spacingValues = {
      1: '4px',
      2: '8px', 
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px'
    };
    
    const spacingValue = spacing || 3;
    const marginBottom = spacingValues[spacingValue as keyof typeof spacingValues] || '12px';
    
    // Non applicare margin-bottom all'ultimo elemento
    return isLast ? {} : { marginBottom };
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Anteprima</h4>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div>
          {selectedButtonId === "all" ? (
            // Mostra tutti i pulsanti se "all" è selezionato
            customButtons.map((button, index) => {
              const sizeClass = buttonSizes.find(s => s.id === button.size)?.height || 'h-10';
              return (
                <div 
                  key={button.id}
                  className={`w-full ${sizeClass} flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium shadow-lg ${
                    buttonStyles.find(s => s.id === button.style)?.class || 'rounded-xl'
                  } ${
                    buttonColors.find(c => c.id === button.color)?.class || 'bg-white/90 text-gray-900 hover:bg-white'
                  }`}
                  style={getButtonSpacing(button.spacing || currentSpacing, index, index === customButtons.length - 1)}
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
              const sizeClass = buttonSizes.find(s => s.id === selectedButton.size)?.height || 'h-10';
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
  );
};

export default ButtonPreview;

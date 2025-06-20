
import { ExternalLink } from "lucide-react";
import { CustomButton } from "../customizer/ConfigurationPanel";

interface PreviewMainCTAProps {
  customButtons: CustomButton[];
}

const PreviewMainCTA = ({ customButtons }: PreviewMainCTAProps) => {
  const buttonStyles = [
    { id: 'rounded', name: 'Arrotondato', class: 'rounded-xl' },
    { id: 'square', name: 'Quadrato', class: 'rounded-none' },
    { id: 'pill', name: 'Pillola', class: 'rounded-full' }
  ];

  const buttonColors = [
    { id: 'white', name: 'Bianco', class: 'bg-white/90 text-gray-900 hover:bg-white' },
    { id: 'black', name: 'Nero', class: 'bg-gray-900 text-white hover:bg-gray-800' },
    { id: 'gray', name: 'Grigio', class: 'bg-gray-600 text-white hover:bg-gray-700' },
    { id: 'red', name: 'Rosso', class: 'bg-red-600 text-white hover:bg-red-700' },
    { id: 'orange', name: 'Arancione', class: 'bg-orange-600 text-white hover:bg-orange-700' },
    { id: 'yellow', name: 'Giallo', class: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' },
    { id: 'green', name: 'Verde', class: 'bg-green-600 text-white hover:bg-green-700' },
    { id: 'teal', name: 'Verde Acqua', class: 'bg-teal-600 text-white hover:bg-teal-700' },
    { id: 'blue', name: 'Blu', class: 'bg-blue-600 text-white hover:bg-blue-700' },
    { id: 'indigo', name: 'Indaco', class: 'bg-indigo-600 text-white hover:bg-indigo-700' },
    { id: 'purple', name: 'Viola', class: 'bg-purple-600 text-white hover:bg-purple-700' },
    { id: 'pink', name: 'Rosa', class: 'bg-pink-600 text-white hover:bg-pink-700' },
    { id: 'gradient-blue', name: 'Gradiente Blu-Viola', class: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' },
    { id: 'gradient-orange', name: 'Gradiente Arancione-Rosso', class: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' },
    { id: 'gradient-green', name: 'Gradiente Verde-Teal', class: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600' },
    { id: 'gradient-pink', name: 'Gradiente Rosa-Viola', class: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600' }
  ];

  const buttonSizes = [
    { id: 'tiny', name: '1 - Piccolissimo', height: 'h-6' },
    { id: 'small', name: '2 - Piccolo', height: 'h-8' },
    { id: 'medium', name: '3 - Medio', height: 'h-10' },
    { id: 'large', name: '4 - Grande', height: 'h-12' },
    { id: 'xlarge', name: '5 - Grandissimo', height: 'h-14' }
  ];

  const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
  };

  const getSpacingClass = (spacingValue: number) => {
    const spacingClasses = {
      1: 'mb-1',
      2: 'mb-2', 
      3: 'mb-3',
      4: 'mb-4',
      5: 'mb-5',
      6: 'mb-6'
    };
    
    return spacingClasses[spacingValue as keyof typeof spacingClasses] || 'mb-3';
  };

  const getButtonClasses = (button: CustomButton) => {
    const sizeClass = buttonSizes.find(s => s.id === button.size)?.height || 'h-10';
    const styleClass = buttonStyles.find(s => s.id === button.style)?.class || 'rounded-xl';
    
    const baseClasses = `w-full ${sizeClass} flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium shadow-lg ${styleClass}`;
    
    if (button.color && button.color.startsWith('custom-') && (button as any).customColorCode) {
      const customColorCode = (button as any).customColorCode;
      const textColor = isLightColor(customColorCode) ? 'text-gray-900' : 'text-white';
      return `${baseClasses} ${textColor} hover:opacity-90`;
    }
    
    const colorClass = buttonColors.find(c => c.id === button.color)?.class || 'bg-white/90 text-gray-900 hover:bg-white';
    return `${baseClasses} ${colorClass}`;
  };

  const getButtonStyle = (button: CustomButton) => {
    if (button.color && button.color.startsWith('custom-') && (button as any).customColorCode) {
      const customColorCode = (button as any).customColorCode;
      return {
        backgroundColor: customColorCode
      };
    }
    
    return {};
  };

  if (!customButtons || customButtons.length === 0) {
    return null;
  }

  // Usa la spaziatura del primo pulsante per tutti (o default)
  const globalSpacing = customButtons[0]?.spacing || 3;

  return (
    <div className="px-4 mb-6">
      {customButtons.map((button, index) => (
        <div key={button.id} className={index < customButtons.length - 1 ? getSpacingClass(globalSpacing) : ''}>
          <button
            className={getButtonClasses(button)}
            style={getButtonStyle(button)}
          >
            <div className="font-semibold">
              {button.text || `Pulsante ${index + 1}`}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default PreviewMainCTA;

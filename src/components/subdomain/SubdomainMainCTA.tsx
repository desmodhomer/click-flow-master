
import { ExternalLink, Share2 } from "lucide-react";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

interface SubdomainMainCTAProps {
  customButtons?: CustomButton[];
  onShare: () => void;
}

const SubdomainMainCTA = ({ customButtons = [], onShare }: SubdomainMainCTAProps) => {
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
    { id: 'tiny', name: '1 - Piccolissimo', height: 'h-6', padding: 'px-3 py-1', text: 'text-xs' },
    { id: 'small', name: '2 - Piccolo', height: 'h-8', padding: 'px-4 py-2', text: 'text-sm' },
    { id: 'medium', name: '3 - Medio', height: 'h-10', padding: 'px-6 py-3', text: 'text-base' },
    { id: 'large', name: '4 - Grande', height: 'h-12', padding: 'px-8 py-4', text: 'text-lg' },
    { id: 'xlarge', name: '5 - Grandissimo', height: 'h-14', padding: 'px-10 py-5', text: 'text-xl' }
  ];

  const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
  };

  const getButtonSpacing = (spacing?: number) => {
    const spacingValues = {
      1: 'mb-1',
      2: 'mb-2', 
      3: 'mb-3',
      4: 'mb-4',
      5: 'mb-5',
      6: 'mb-6'
    };
    
    const spacingValue = spacing || 3;
    return spacingValues[spacingValue as keyof typeof spacingValues] || 'mb-3';
  };

  const getButtonStyle = (button: CustomButton) => {
    // Gestisce i colori personalizzati
    if (button.color && button.color.startsWith('custom-') && (button as any).customColorCode) {
      const customColorCode = (button as any).customColorCode;
      return {
        backgroundColor: customColorCode
      };
    }
    
    return {};
  };

  const getButtonClasses = (button: CustomButton, index: number, isLast: boolean) => {
    const sizeData = buttonSizes.find(s => s.id === button.size) || buttonSizes[2]; // default medium
    const styleClass = buttonStyles.find(s => s.id === button.style)?.class || 'rounded-xl';
    const spacingClass = !isLast ? getButtonSpacing(button.spacing) : '';
    
    const baseClasses = `w-full ${sizeData.height} flex items-center justify-center cursor-pointer transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ${styleClass} ${spacingClass} ${sizeData.text}`;
    
    // Gestisce i colori personalizzati
    if (button.color && button.color.startsWith('custom-') && (button as any).customColorCode) {
      const customColorCode = (button as any).customColorCode;
      const textColor = isLightColor(customColorCode) ? 'text-gray-900' : 'text-white';
      return `${baseClasses} ${textColor} hover:opacity-90`;
    }
    
    const colorClass = buttonColors.find(c => c.id === button.color)?.class || 'bg-white/90 text-gray-900 hover:bg-white';
    return `${baseClasses} ${colorClass}`;
  };

  const handleButtonClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-2">
      {/* Custom Buttons - stesso stile di PreviewMainCTA */}
      {customButtons && customButtons.length > 0 && (
        <div className="space-y-2">
          {customButtons.map((button, index) => (
            <div
              key={button.id}
              className={getButtonClasses(button, index, index === customButtons.length - 1)}
              style={getButtonStyle(button)}
              onClick={() => handleButtonClick(button.url)}
            >
              <span className="flex items-center justify-center gap-2">
                {button.text || `Button ${index + 1}`}
                {button.url && <ExternalLink className="h-4 w-4" />}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {/* Share Button - stile minimalista */}
      <div 
        onClick={onShare}
        className="w-full h-10 flex items-center justify-center cursor-pointer transition-all duration-200 font-medium bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 text-white text-sm mt-4"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Condividi questo profilo
      </div>
    </div>
  );
};

export default SubdomainMainCTA;

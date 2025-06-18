
import { ExternalLink } from "lucide-react";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

interface PreviewMainCTAProps {
  customButtons?: CustomButton[];
}

const PreviewMainCTA = ({ customButtons = [] }: PreviewMainCTAProps) => {
  // Don't render anything if there are no buttons
  if (customButtons.length === 0) {
    return null;
  }

  const getButtonClasses = (button: CustomButton) => {
    const styleClasses = {
      'rounded': 'rounded-xl',
      'square': 'rounded-none', 
      'pill': 'rounded-full'
    };

    const colorClasses = {
      'white': 'bg-white/90 text-gray-900 hover:bg-white',
      'black': 'bg-gray-900 text-white hover:bg-gray-800',
      'gray': 'bg-gray-600 text-white hover:bg-gray-700',
      'red': 'bg-red-600 text-white hover:bg-red-700',
      'orange': 'bg-orange-600 text-white hover:bg-orange-700',
      'yellow': 'bg-yellow-500 text-gray-900 hover:bg-yellow-600',
      'green': 'bg-green-600 text-white hover:bg-green-700',
      'teal': 'bg-teal-600 text-white hover:bg-teal-700',
      'blue': 'bg-blue-600 text-white hover:bg-blue-700',
      'indigo': 'bg-indigo-600 text-white hover:bg-indigo-700',
      'purple': 'bg-purple-600 text-white hover:bg-purple-700',
      'pink': 'bg-pink-600 text-white hover:bg-pink-700',
      'gradient-blue': 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
      'gradient-orange': 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600',
      'gradient-green': 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600',
      'gradient-pink': 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
    };

    const sizeClasses = {
      'tiny': 'h-6',
      'small': 'h-8',
      'medium': 'h-10',
      'large': 'h-12',
      'xlarge': 'h-14'
    };

    const baseClasses = 'w-full text-sm font-medium shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200';
    const styleClass = styleClasses[button.style as keyof typeof styleClasses] || 'rounded-xl';
    const sizeClass = sizeClasses[button.size as keyof typeof sizeClasses] || 'h-10';

    // Handle custom colors
    if (button.color && button.color.startsWith('custom-')) {
      const customColorCode = (button as any).customColorCode || '#ffffff';
      const textColor = isLightColor(customColorCode) ? 'text-gray-900' : 'text-white';
      return `${baseClasses} ${styleClass} ${sizeClass} ${textColor} hover:opacity-90`;
    }

    const colorClass = colorClasses[button.color as keyof typeof colorClasses] || 'bg-white/90 text-gray-900 hover:bg-white';
    return `${baseClasses} ${styleClass} ${colorClass} ${sizeClass}`;
  };

  const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
  };

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

  const getButtonStyle = (button: CustomButton) => {
    const spacing = getButtonSpacing(button.spacing || 3, 0, customButtons.length === 1);
    
    // Handle custom colors
    if (button.color && button.color.startsWith('custom-')) {
      const customColorCode = (button as any).customColorCode || '#ffffff';
      return {
        ...spacing,
        backgroundColor: customColorCode
      };
    }
    
    return spacing;
  };

  // Use spacing from first button or default to 3
  const spacing = customButtons[0]?.spacing || 3;

  return (
    <div className="px-4 mb-3">
      {customButtons.map((button, index) => (
        <div 
          key={button.id} 
          className={getButtonClasses(button)}
          style={getButtonStyle(button)}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          {button.text || 'Pulsante'}
        </div>
      ))}
    </div>
  );
};

export default PreviewMainCTA;

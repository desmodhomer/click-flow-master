
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
      'blue': 'bg-blue-600 text-white hover:bg-blue-700',
      'gradient-blue': 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
      'gradient-orange': 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
    };

    const sizeClasses = {
      'tiny': 'h-8',
      'small': 'h-9',
      'medium': 'h-11',
      'large': 'h-13'
    };

    const baseClasses = 'w-full text-sm font-medium shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200';
    const styleClass = styleClasses[button.style as keyof typeof styleClasses] || 'rounded-xl';
    const colorClass = colorClasses[button.color as keyof typeof colorClasses] || 'bg-white/90 text-gray-900 hover:bg-white';
    const sizeClass = sizeClasses[button.size as keyof typeof sizeClasses] || 'h-11';

    return `${baseClasses} ${styleClass} ${colorClass} ${sizeClass}`;
  };

  const getSpacingClass = (spacing?: number) => {
    const spacingClasses = {
      1: 'space-y-1',
      2: 'space-y-2',
      3: 'space-y-3',
      4: 'space-y-4',
      5: 'space-y-5',
      6: 'space-y-6'
    };
    
    const spacingValue = spacing || 3;
    return spacingClasses[spacingValue as keyof typeof spacingClasses] || 'space-y-3';
  };

  // Use spacing from first button or default to 3
  const spacing = customButtons[0]?.spacing || 3;

  return (
    <div className={`px-4 mb-3 ${getSpacingClass(spacing)}`}>
      {customButtons.map((button) => (
        <div key={button.id} className={getButtonClasses(button)}>
          <ExternalLink className="mr-2 h-4 w-4" />
          {button.text || 'Pulsante'}
        </div>
      ))}
    </div>
  );
};

export default PreviewMainCTA;

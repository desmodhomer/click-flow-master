import { ExternalLink } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  GoogleIcon,
  WhatsAppIcon,
  YouTubeIcon,
  PinterestIcon,
  LinkedInIcon,
  SpotifyIcon,
  VimeoIcon,
  DribbbleIcon,
  BehanceIcon,
  StackOverflowIcon,
  SkypeIcon,
  TumblrIcon,
  SnapchatIcon
} from "./SocialPlatformIcons";

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

  const socialIcons = {
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    google: GoogleIcon,
    whatsapp: WhatsAppIcon,
    youtube: YouTubeIcon,
    pinterest: PinterestIcon,
    linkedin: LinkedInIcon,
    spotify: SpotifyIcon,
    vimeo: VimeoIcon,
    dribbble: DribbbleIcon,
    behance: BehanceIcon,
    stackoverflow: StackOverflowIcon,
    skype: SkypeIcon,
    tumblr: TumblrIcon,
    snapchat: SnapchatIcon
  };

  const getButtonIcon = (button: CustomButton) => {
    if (!button.icon || !socialIcons[button.icon as keyof typeof socialIcons]) {
      return null;
    }
    return socialIcons[button.icon as keyof typeof socialIcons];
  };

  const getButtonStyle = (button: CustomButton, index: number, isLast: boolean) => {
    const spacing = getButtonSpacing(button.spacing || currentSpacing, index, isLast);
    
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

  const getButtonClasses = (button: CustomButton) => {
    const sizeClass = buttonSizes.find(s => s.id === button.size)?.height || 'h-10';
    const styleClass = buttonStyles.find(s => s.id === button.style)?.class || 'rounded-xl';
    
    const baseClasses = `w-full ${sizeClass} flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium shadow-lg ${styleClass}`;
    
    // Handle custom colors
    if (button.color && button.color.startsWith('custom-')) {
      const customColorCode = (button as any).customColorCode || '#ffffff';
      const textColor = isLightColor(customColorCode) ? 'text-gray-900' : 'text-white';
      return `${baseClasses} ${textColor} hover:opacity-90`;
    }
    
    const colorClass = buttonColors.find(c => c.id === button.color)?.class || 'bg-white/90 text-gray-900 hover:bg-white';
    return `${baseClasses} ${colorClass}`;
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Anteprima</h4>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div>
          {selectedButtonId === "all" ? (
            // Mostra tutti i pulsanti se "all" è selezionato
            customButtons.map((button, index) => {
              const IconComponent = getButtonIcon(button);
              return (
                <div 
                  key={button.id}
                  className={getButtonClasses(button)}
                  style={getButtonStyle(button, index, index === customButtons.length - 1)}
                >
                  {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                  {button.text || `Pulsante ${index + 1}`}
                </div>
              );
            })
          ) : (
            // Mostra solo il pulsante selezionato
            (() => {
              const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
              if (!selectedButton) return null;
              const IconComponent = getButtonIcon(selectedButton);
              return (
                <div 
                  className={getButtonClasses(selectedButton)}
                  style={getButtonStyle(selectedButton, 0, true)}
                >
                  {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
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

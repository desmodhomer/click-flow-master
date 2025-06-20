
import { Signal, Wifi, Battery } from "lucide-react";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileMockupProps {
  title: string;
  description: string;
  displayName?: string;
  bio?: string;
  backgroundTheme?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  customBackgroundUrl?: string;
  socialLinks?: SocialLink[];
  customSlug?: string;
  customButtons?: CustomButton[];
}

const MobileMockup = ({
  title,
  description,
  displayName,
  bio,
  backgroundTheme = 'gradient-blue',
  profileImageUrl,
  coverImageUrl,
  customBackgroundUrl,
  socialLinks = [],
  customSlug,
  customButtons = []
}: MobileMockupProps) => {
  // Get background style logic - stessa di SubdomainBackgroundUtils
  const getBackgroundStyle = () => {
    if (customBackgroundUrl) {
      return {
        backgroundImage: `url(${customBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    // Handle custom colors
    if (backgroundTheme.startsWith('custom-')) {
      const customColor = backgroundTheme.replace('custom-', '');
      return {
        backgroundColor: customColor
      };
    }
    
    const themeStyles: Record<string, string> = {
      'gradient-blue': 'from-blue-400 via-blue-600 to-purple-600',
      'gradient-purple': 'from-purple-400 via-pink-500 to-red-500',
      'gradient-green': 'from-green-400 via-teal-500 to-blue-500',
      'gradient-orange': 'from-yellow-400 via-orange-500 to-red-500',
      'dark': 'from-gray-800 via-gray-900 to-black',
      'dark-solid': 'bg-gray-900',
      'white-solid': 'bg-white',
      'minimal': 'from-gray-50 via-white to-gray-100'
    };
    
    // Handle solid colors
    if (backgroundTheme === 'dark-solid') {
      return { 
        className: 'bg-gray-900' 
      };
    }
    
    if (backgroundTheme === 'white-solid') {
      return { 
        className: 'bg-white' 
      };
    }
    
    return { 
      className: `bg-gradient-to-br ${themeStyles[backgroundTheme] || themeStyles['gradient-blue']}` 
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex items-center justify-center p-2">
      {/* Mobile Preview Frame - Dimensioni ridotte */}
      <div className="relative">
        {/* Ombra del telefono */}
        <div className="absolute inset-0 bg-black/15 rounded-[16px] transform translate-y-1 translate-x-0.5 blur-md scale-105"></div>
        
        {/* Frame del telefono - Ridotto da 280x580 a 240x480 */}
        <div className="relative w-[240px] h-[480px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[16px] p-[6px] shadow-xl hover:scale-105 transition-transform duration-300">
          
          {/* Schermo interno */}
          <div className="w-full h-full bg-black rounded-[12px] overflow-hidden relative">
            
            {/* Notch moderno */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60px] h-[6px] bg-black rounded-b-[3px] z-50"></div>
            
            {/* Status Bar */}
            <div className="absolute top-[8px] left-0 right-0 px-3 flex items-center justify-between text-white text-[8px] font-medium z-40">
              <div className="flex items-center gap-1">
                <div className="w-[4px] h-[4px] bg-gray-600 rounded-full"></div>
                <div className="w-[8px] h-[1px] bg-gray-700 rounded-full"></div>
                <div className="ml-1 font-semibold">12:30</div>
              </div>
              <div className="flex items-center gap-1">
                <Signal className="h-1.5 w-1.5" />
                <Wifi className="h-1.5 w-1.5" />
                <Battery className="h-1.5 w-1.5" />
              </div>
            </div>
            
            {/* Safari Browser UI */}
            <div className="absolute top-[24px] left-0 right-0 bg-gray-50 px-2 py-0.5 flex items-center gap-1 border-b border-gray-200 z-30">
              <div className="flex-1 bg-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[7px] truncate">
                    {customSlug ? `${customSlug}.lnkfire.dev` : 'tuolink.lnkfire.dev'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Website Content - Altezza ridotta */}
            <div className="absolute top-[42px] left-0 right-0 bottom-[20px] overflow-hidden">
              <ScrollArea className="h-full">
                <div 
                  className={`min-h-full ${backgroundStyle.className || ''}`} 
                  style={backgroundStyle}
                >
                  {/* Hero Section compatta */}
                  <div className="py-2 px-2">
                    <PreviewHeroSection
                      profileImageUrl={profileImageUrl}
                      displayName={displayName}
                      title={title}
                      bio={bio}
                      description={description}
                      coverImageUrl={coverImageUrl}
                      collapsed={true}
                      backgroundTheme={backgroundTheme}
                    />
                  </div>

                  {/* Social Links Section compatta */}
                  <div className="px-2 mb-2">
                    <PreviewSocialLinks 
                      socialLinks={socialLinks} 
                      backgroundTheme={backgroundTheme}
                    />
                  </div>
                  
                  {/* Main CTA Section compatta */}
                  <div className="px-2 mb-2">
                    <PreviewMainCTA 
                      customButtons={customButtons}
                      backgroundTheme={backgroundTheme}
                    />
                  </div>
                  
                  {/* Footer compatto */}
                  <div className="px-2 pb-2">
                    <PreviewStatsFooter />
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            {/* Home indicator iOS */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[80px] h-[3px] bg-white rounded-full opacity-80"></div>
          </div>
          
          {/* Riflesso sullo schermo */}
          <div className="absolute inset-[6px] rounded-[12px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Volume buttons - Ridimensionati */}
        <div className="absolute left-[-1px] top-[80px] w-[1px] h-[20px] bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-1px] top-[110px] w-[1px] h-[20px] bg-gray-700 rounded-l-sm"></div>
        
        {/* Power button - Ridimensionato */}
        <div className="absolute right-[-1px] top-[95px] w-[1px] h-[20px] bg-gray-700 rounded-r-sm"></div>
      </div>
    </div>
  );
};

export default MobileMockup;

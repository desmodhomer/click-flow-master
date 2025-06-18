
import { Signal, Wifi, Battery } from "lucide-react";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import { SocialLink } from "@/types/customLink";
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
  customSlug
}: MobileMockupProps) => {
  // Get background style logic
  const getBackgroundStyle = () => {
    if (customBackgroundUrl) {
      return {
        backgroundImage: `url(${customBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    const themeStyles: Record<string, string> = {
      'gradient-blue': 'from-blue-400 via-blue-600 to-purple-600',
      'gradient-purple': 'from-purple-400 via-pink-500 to-red-500',
      'gradient-green': 'from-green-400 via-teal-500 to-blue-500',
      'gradient-orange': 'from-yellow-400 via-orange-500 to-red-500',
      'dark-solid': 'from-gray-800 via-gray-900 to-black',
      'white-solid': 'from-gray-50 via-white to-gray-100'
    };
    
    return { 
      className: `bg-gradient-to-br ${themeStyles[backgroundTheme] || themeStyles['gradient-blue']}` 
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex items-center justify-center p-4">
      {/* Mobile Preview Frame - Dimensioni ridotte per adattarsi alla pagina */}
      <div className="relative">
        {/* Ombra del telefono */}
        <div className="absolute inset-0 bg-black/15 rounded-[24px] transform translate-y-2 translate-x-1 blur-lg scale-105"></div>
        
        {/* Frame del telefono - Dimensioni ottimizzate per la pagina (240x480) */}
        <div className="relative w-[240px] h-[480px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[24px] p-[10px] shadow-xl hover:scale-105 transition-transform duration-300">
          
          {/* Schermo interno */}
          <div className="w-full h-full bg-black rounded-[20px] overflow-hidden relative">
            
            {/* Notch moderno sottilissimo - solo una piccola pillola */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60px] h-[6px] bg-black rounded-b-[3px] z-50"></div>
            
            {/* Status Bar - fotocamera e sensori alla stessa altezza dell'orario */}
            <div className="absolute top-[8px] left-0 right-0 px-3 flex items-center justify-between text-white text-[9px] font-medium z-40">
              <div className="flex items-center gap-1">
                {/* Fotocamera */}
                <div className="w-[4px] h-[4px] bg-gray-600 rounded-full"></div>
                {/* Sensore */}
                <div className="w-[8px] h-[1px] bg-gray-700 rounded-full"></div>
                <div className="ml-2 font-semibold">12:30</div>
              </div>
              <div className="flex items-center gap-1 mr-1">
                <Signal className="h-1.5 w-1.5" />
                <Wifi className="h-1.5 w-1.5" />
                <Battery className="h-1.5 w-1.5" />
              </div>
            </div>
            
            {/* Safari Browser UI ultra compatto */}
            <div className="absolute top-[24px] left-0 right-0 bg-gray-50 px-2 py-0.5 flex items-center gap-1 border-b border-gray-200 z-30">
              <div className="flex-1 bg-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[8px] truncate">
                    {customSlug ? `${customSlug}.lnkfire.dev` : 'tuolink.lnkfire.dev'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Website Content - Area scrollabile ottimizzata */}
            <ScrollArea className="h-[calc(100%-42px)] mt-[42px]">
              <div 
                className={`min-h-full ${backgroundStyle.className || ''}`} 
                style={backgroundStyle}
              >
                {/* Hero Section compatta */}
                <PreviewHeroSection
                  profileImageUrl={profileImageUrl}
                  displayName={displayName}
                  title={title}
                  bio={bio}
                  description={description}
                  coverImageUrl={coverImageUrl}
                  collapsed={true}
                />

                {/* Main Content compatto */}
                <div className="relative z-10 px-2 pb-4 space-y-2">
                  <div className="max-w-full mx-auto space-y-2">
                    {/* Social Links Section */}
                    <PreviewSocialLinks socialLinks={socialLinks} />
                    
                    {/* Main CTA Section */}
                    <PreviewMainCTA />
                    
                    {/* Stats and Footer */}
                    <PreviewStatsFooter />
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            {/* Home indicator iOS più piccolo */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[80px] h-[3px] bg-white rounded-full opacity-80"></div>
          </div>
          
          {/* Riflesso sullo schermo */}
          <div className="absolute inset-[10px] rounded-[20px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Volume buttons più piccoli */}
        <div className="absolute left-[-2px] top-[80px] w-[2px] h-[30px] bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-2px] top-[120px] w-[2px] h-[30px] bg-gray-700 rounded-l-sm"></div>
        
        {/* Power button */}
        <div className="absolute right-[-2px] top-[100px] w-[2px] h-[30px] bg-gray-700 rounded-r-sm"></div>
      </div>
    </div>
  );
};

export default MobileMockup;


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
    <div className="h-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex items-center justify-center p-6">
      {/* Mobile Preview Frame con dimensioni ottimizzate */}
      <div className="relative">
        {/* Ombra del telefono */}
        <div className="absolute inset-0 bg-black/20 rounded-[36px] transform translate-y-4 translate-x-2 blur-xl scale-105"></div>
        
        {/* Frame del telefono - Dimensioni ottimizzate 300x600 */}
        <div className="relative w-[300px] h-[600px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[36px] p-[15px] shadow-2xl hover:scale-105 transition-transform duration-300">
          
          {/* Schermo interno */}
          <div className="w-full h-full bg-black rounded-[30px] overflow-hidden relative">
            
            {/* Notch più realistico */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[15px] z-50 flex items-center justify-center gap-2">
              <div className="w-[10px] h-[10px] bg-gray-700 rounded-full shadow-inner"></div>
              <div className="w-[40px] h-[5px] bg-gray-700 rounded-full"></div>
            </div>
            
            {/* Status Bar */}
            <div className="absolute top-[40px] left-0 right-0 px-5 flex items-center justify-between text-white text-sm font-medium z-40">
              <div className="ml-2 font-semibold">12:30</div>
              <div className="flex items-center gap-1 mr-2">
                <Signal className="h-3 w-3" />
                <Wifi className="h-3 w-3" />
                <Battery className="h-3 w-3" />
              </div>
            </div>
            
            {/* Safari Browser UI compatto */}
            <div className="absolute top-[70px] left-0 right-0 bg-gray-50 px-3 py-2 flex items-center gap-2 border-b border-gray-200 z-30">
              <div className="flex-1 bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[10px]">
                    {customSlug ? `${customSlug}.lnkfire.dev` : 'tuolink.lnkfire.dev'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Website Content - Area scrollabile con ScrollArea */}
            <ScrollArea className="h-[calc(100%-110px)] mt-[110px]">
              <div 
                className={`min-h-full ${backgroundStyle.className || ''}`} 
                style={backgroundStyle}
              >
                {/* Hero Section */}
                <PreviewHeroSection
                  profileImageUrl={profileImageUrl}
                  displayName={displayName}
                  title={title}
                  bio={bio}
                  description={description}
                  coverImageUrl={coverImageUrl}
                />

                {/* Main Content compatto */}
                <div className="relative z-10 px-3 pb-6 space-y-3">
                  <div className="max-w-full mx-auto space-y-3">
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
            
            {/* Home indicator iOS */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full opacity-80"></div>
          </div>
          
          {/* Riflesso sullo schermo */}
          <div className="absolute inset-[15px] rounded-[30px] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Volume buttons */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[50px] bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-3px] top-[180px] w-[3px] h-[50px] bg-gray-700 rounded-l-sm"></div>
        
        {/* Power button */}
        <div className="absolute right-[-3px] top-[150px] w-[3px] h-[50px] bg-gray-700 rounded-r-sm"></div>
      </div>
    </div>
  );
};

export default MobileMockup;

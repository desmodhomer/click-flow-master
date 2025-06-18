
import { Signal, Wifi, Battery } from "lucide-react";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import { SocialLink } from "@/types/customLink";

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
      {/* Mobile Preview Frame con dimensioni realistiche iPhone */}
      <div className="relative scale-75 lg:scale-90 xl:scale-100">
        {/* Ombra del telefono più realistica */}
        <div className="absolute inset-0 bg-black/25 rounded-[3.5rem] transform translate-y-6 translate-x-3 blur-2xl scale-105"></div>
        
        {/* Frame del telefono - Dimensioni iPhone reali */}
        <div className="relative w-[375px] h-[812px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[3.5rem] p-[3px] shadow-2xl">
          
          {/* Schermo interno con proporzioni corrette */}
          <div className="w-full h-full bg-black rounded-[3.2rem] overflow-hidden relative">
            
            {/* Dynamic Island / Notch più realistico */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-full z-50 shadow-lg border border-gray-800"></div>
            
            {/* Status Bar iPhone-style */}
            <div className="relative h-12 bg-black flex items-center justify-between px-8 pt-3 text-white text-sm font-medium z-40">
              {/* Left side - Time */}
              <div className="text-white font-semibold text-[17px]">
                9:41
              </div>
              
              {/* Right side - Status icons */}
              <div className="flex items-center gap-1">
                <Signal className="h-4 w-4" />
                <Wifi className="h-4 w-4" />
                <Battery className="h-4 w-4" />
              </div>
            </div>
            
            {/* Safari Browser UI più accurato */}
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              <div className="flex-1 bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xs">
                    {customSlug ? `${customSlug}.lnkfire.dev` : 'tuolink.lnkfire.dev'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Website Content - Area scrollabile con dimensioni corrette */}
            <div 
              className={`h-[calc(100%-96px)] overflow-y-auto ${backgroundStyle.className || ''}`} 
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

              {/* Main Content con padding mobile-first */}
              <div className="relative z-10 px-4 pb-8 space-y-4">
                <div className="max-w-full mx-auto space-y-4">
                  {/* Social Links Section */}
                  <PreviewSocialLinks socialLinks={socialLinks} />
                  
                  {/* Main CTA Section */}
                  <PreviewMainCTA />
                  
                  {/* Stats and Footer */}
                  <PreviewStatsFooter />
                </div>
              </div>
            </div>
            
            {/* Home indicator iOS accurato */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-white rounded-full opacity-90"></div>
          </div>
          
          {/* Riflesso realistico sullo schermo */}
          <div className="absolute inset-[3px] rounded-[3.2rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          
          {/* Highlight sui bordi del telefono */}
          <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>
        </div>

        {/* Volume buttons */}
        <div className="absolute left-[-2px] top-24 w-1 h-8 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-2px] top-36 w-1 h-8 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-2px] top-48 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
        
        {/* Power button */}
        <div className="absolute right-[-2px] top-40 w-1 h-12 bg-gray-700 rounded-r-sm"></div>
      </div>
    </div>
  );
};

export default MobileMockup;

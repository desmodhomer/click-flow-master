
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";

interface DesktopMockupProps {
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

const DesktopMockup = ({
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
}: DesktopMockupProps) => {
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
    <div className="h-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex items-center justify-center p-4">
      {/* Desktop Browser Frame */}
      <div className="relative w-full max-w-4xl">
        {/* Browser Shadow */}
        <div className="absolute inset-0 bg-black/10 rounded-lg transform translate-y-2 translate-x-1 blur-lg"></div>
        
        {/* Browser Window */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Browser Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
            {/* Browser Controls */}
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Address Bar */}
            <div className="flex-1 bg-white rounded-md px-3 py-1.5 border border-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span className="text-sm text-gray-700">
                  {customSlug ? `${customSlug}.lnkfire.dev` : 'tuolink.lnkfire.dev'}
                </span>
              </div>
            </div>
            
            {/* Browser Actions */}
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          {/* Website Content - con altezza limitata */}
          <div className="h-[480px] overflow-hidden">
            <ScrollArea className="h-full">
              <div 
                className={`min-h-full ${backgroundStyle.className || ''}`} 
                style={backgroundStyle}
              >
                {/* Hero Section compatta */}
                <div className="py-6 px-4">
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

                {/* Contenuto principale in container compatto */}
                <div className="max-w-md mx-auto px-4 pb-8">
                  {/* Social Links Section */}
                  <div className="mb-4">
                    <PreviewSocialLinks 
                      socialLinks={socialLinks} 
                      backgroundTheme={backgroundTheme}
                    />
                  </div>
                  
                  {/* Main CTA Section */}
                  <div className="mb-4">
                    <PreviewMainCTA 
                      customButtons={customButtons}
                      backgroundTheme={backgroundTheme}
                    />
                  </div>
                  
                  {/* Stats and Footer */}
                  <PreviewStatsFooter />
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMockup;

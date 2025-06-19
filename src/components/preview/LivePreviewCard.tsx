
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";
import PreviewHeroSection from "./PreviewHeroSection";
import PreviewSocialLinks from "./PreviewSocialLinks";
import PreviewMainCTA from "./PreviewMainCTA";
import PreviewStatsFooter from "./PreviewStatsFooter";

interface LivePreviewCardProps {
  title: string;
  description: string;
  displayName?: string;
  bio?: string;
  backgroundTheme?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  customBackgroundUrl?: string;
  socialLinks?: SocialLink[];
  customButtons?: CustomButton[];
}

const LivePreviewCard = ({
  title,
  description,
  displayName,
  bio,
  backgroundTheme = 'gradient-blue',
  profileImageUrl,
  coverImageUrl,
  customBackgroundUrl,
  socialLinks = [],
  customButtons = []
}: LivePreviewCardProps) => {
  // Use exact same background logic as SubdomainHandler
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
      'dark': 'from-gray-800 via-gray-900 to-black',
      'minimal': 'from-gray-50 via-white to-gray-100'
    };
    
    return { 
      className: `bg-gradient-to-br ${themeStyles[backgroundTheme] || themeStyles['gradient-blue']}` 
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          Anteprima Live - Esattamente come apparirà
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Replica fedele del sottodominio che vedranno i visitatori
        </p>
      </CardHeader>
      <CardContent>
        {/* Live Preview Window */}
        <div className="bg-black/30 rounded-lg p-2 border border-white/10">
          <div 
            className={`min-h-[600px] rounded-lg overflow-hidden relative ${backgroundStyle.className || ''}`} 
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

            {/* Main Content */}
            <div className="relative z-10 px-6 pb-16">
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Social Links Section */}
                <PreviewSocialLinks socialLinks={socialLinks} />
                
                {/* Main CTA Section */}
                <PreviewMainCTA customButtons={customButtons} />
                
                {/* Stats and Footer */}
                <PreviewStatsFooter />
              </div>
            </div>
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="mt-4 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
          <p className="text-green-300 text-sm text-center">
            ✨ Anteprima aggiornata in tempo reale - Le modifiche al form si riflettono qui immediatamente
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePreviewCard;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialLink } from "@/types/customLink";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import LinkActionsCard from "@/components/preview/LinkActionsCard";

interface PreviewPanelProps {
  generatedLink: string;
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

const PreviewPanel = ({ 
  generatedLink, 
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
}: PreviewPanelProps) => {
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
      'dark': 'from-gray-800 via-gray-900 to-black',
      'minimal': 'from-gray-50 via-white to-gray-100'
    };
    
    return { 
      className: `bg-gradient-to-br ${themeStyles[backgroundTheme] || themeStyles['gradient-blue']}` 
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="space-y-6">
      {/* Actions Card */}
      <LinkActionsCard 
        generatedLink={generatedLink}
        customSlug={customSlug}
      />

      {/* Live Preview */}
      {(title || displayName || generatedLink) && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Anteprima Live
            </CardTitle>
            <p className="text-sm text-gray-600">
              Replica fedele del sottodominio che vedranno i visitatori
            </p>
          </CardHeader>
          <CardContent>
            {/* Live Preview Window */}
            <div className="bg-gray-100 rounded-lg p-3 border">
              <div 
                className={`min-h-[500px] rounded-md overflow-hidden relative ${backgroundStyle.className || ''}`} 
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
                <div className="relative z-10 px-4 pb-12">
                  <div className="max-w-lg mx-auto space-y-6">
                    {/* Social Links Section */}
                    <PreviewSocialLinks socialLinks={socialLinks} />
                    
                    {/* Main CTA Section */}
                    <PreviewMainCTA />
                    
                    {/* Stats and Footer */}
                    <PreviewStatsFooter />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Update Indicator */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm text-center">
                ✨ Anteprima aggiornata in tempo reale
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!title && !displayName && !generatedLink && (
        <Card className="bg-white shadow-lg">
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun link generato</h3>
              <p className="text-sm">
                Compila il form per vedere l'anteprima del tuo link personalizzato
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreviewPanel;

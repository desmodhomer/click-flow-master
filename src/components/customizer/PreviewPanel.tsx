
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialLink } from "@/types/customLink";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import LinkActionsCard from "@/components/preview/LinkActionsCard";
import { Eye, Smartphone, Monitor, Signal, Wifi, Battery } from "lucide-react";

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
      'dark-solid': 'from-gray-800 via-gray-900 to-black',
      'white-solid': 'from-gray-50 via-white to-gray-100'
    };
    
    return { 
      className: `bg-gradient-to-br ${themeStyles[backgroundTheme] || themeStyles['gradient-blue']}` 
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="space-y-6 h-full">
      {/* Actions Card */}
      {generatedLink && (
        <LinkActionsCard 
          generatedLink={generatedLink}
          customSlug={customSlug}
        />
      )}

      {/* Live Preview */}
      <Card className="bg-white shadow-xl border-0 flex-1 flex flex-col">
        <CardHeader className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <Eye className="h-5 w-5 text-gray-600" />
                <span>Anteprima Live</span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Replica fedele di come vedranno la pagina i tuoi visitatori
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
          {(title || displayName || generatedLink) ? (
            <div className="h-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex items-center justify-center p-8">
              {/* Mobile Preview Frame con notch e dettagli realistici */}
              <div className="relative">
                {/* Ombra del telefono */}
                <div className="absolute inset-0 bg-black/20 rounded-[3rem] transform translate-y-4 translate-x-2 blur-xl"></div>
                
                {/* Frame del telefono */}
                <div className="relative w-80 h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  {/* Schermo interno */}
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    
                    {/* Status Bar realistico */}
                    <div className="relative h-10 bg-black flex items-center justify-between px-6 text-white text-sm font-medium">
                      {/* Notch simulation */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                      
                      {/* Left side - Time */}
                      <div className="text-white font-semibold">
                        9:41
                      </div>
                      
                      {/* Right side - Status icons */}
                      <div className="flex items-center gap-1">
                        <Signal className="h-4 w-4" />
                        <Wifi className="h-4 w-4" />
                        <Battery className="h-4 w-4" />
                        <div className="text-xs">100%</div>
                      </div>
                    </div>
                    
                    {/* Browser Address Bar */}
                    <div className="bg-gray-100 px-4 py-2 flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-600 font-mono">
                        {customSlug ? `${customSlug}.lnkfire.dev` : 'tuolink.lnkfire.dev'}
                      </div>
                    </div>
                    
                    {/* Website Content */}
                    <div 
                      className={`h-full overflow-y-auto ${backgroundStyle.className || ''}`} 
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

                      {/* Main Content con spaziatura migliorata */}
                      <div className="relative z-10 px-4 pb-12 space-y-4">
                        <div className="max-w-lg mx-auto space-y-4">
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
                  
                  {/* Home indicator iOS */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-80"></div>
                </div>

                {/* Riflesso sullo schermo */}
                <div className="absolute inset-2 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Monitor className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Inizia a Personalizzare</h3>
                <p className="text-gray-500 max-w-md">
                  Usa la barra laterale per configurare il tuo link personalizzato e vedrai l'anteprima apparire qui in tempo reale
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Pronto per la personalizzazione</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Update Indicator */}
      {(title || displayName || generatedLink) && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-green-700 text-sm font-medium">
              ✨ Anteprima aggiornata in tempo reale
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;

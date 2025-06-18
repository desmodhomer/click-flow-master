
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Eye, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BACKGROUND_THEMES, SocialLink, SOCIAL_PLATFORMS } from "@/types/customLink";

interface LinkPreviewProps {
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
}

const LinkPreview = ({ 
  generatedLink, 
  title, 
  description,
  displayName,
  bio,
  backgroundTheme = 'gradient-blue',
  profileImageUrl,
  coverImageUrl,
  customBackgroundUrl,
  socialLinks = []
}: LinkPreviewProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: "Copiato!",
        description: "Link copiato negli appunti",
      });
    } catch (err) {
      toast({
        title: "Errore",
        description: "Impossibile copiare il link",
        variant: "destructive",
      });
    }
  };

  const openLink = () => {
    window.open(generatedLink, '_blank');
  };

  const openPreview = () => {
    // Directly open the generated link
    if (generatedLink) {
      window.open(generatedLink, '_blank', 'width=400,height=700,scrollbars=yes,resizable=yes');
      
      toast({
        title: "Anteprima aperta!",
        description: "Si è aperta una finestra con l'anteprima del tuo link",
      });
    }
  };

  const selectedTheme = BACKGROUND_THEMES.find(theme => theme.id === backgroundTheme) || BACKGROUND_THEMES[0];

  if (!generatedLink) {
    return (
      <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Anteprima Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-white/60" />
            </div>
            <p className="text-gray-300 text-lg mb-2">Nessun link generato</p>
            <p className="text-gray-400 text-sm">
              Compila il form per vedere l'anteprima del tuo link personalizzato
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fixed background style determination to match exactly what SubdomainHandler uses
  const getBackgroundStyle = () => {
    console.log('Current backgroundTheme:', backgroundTheme);
    console.log('Custom background URL:', customBackgroundUrl);
    
    if (customBackgroundUrl) {
      return {
        backgroundImage: `url(${customBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    // Use exact same mapping as SubdomainHandler
    const themeStyles: Record<string, string> = {
      'gradient-blue': 'bg-gradient-to-br from-blue-50 to-purple-50',
      'gradient-purple': 'bg-gradient-to-br from-purple-50 to-pink-50',
      'gradient-green': 'bg-gradient-to-br from-green-50 to-blue-50',
      'gradient-orange': 'bg-gradient-to-br from-orange-50 to-red-50',
      'dark-solid': 'bg-gray-900',
      'white-solid': 'bg-white'
    };
    
    return { className: themeStyles[backgroundTheme] || themeStyles['gradient-blue'] };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="space-y-6">
      {/* Link Generated Card */}
      <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Link Generato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-black/20 rounded-lg border border-white/10">
            <p className="text-white font-mono text-sm break-all mb-3">
              {generatedLink}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copia Link
              </Button>
              <Button
                onClick={openPreview}
                variant="outline"
                size="sm"
                className="bg-blue-600/20 border-blue-400/30 text-blue-200 hover:bg-blue-600/30"
              >
                <Monitor className="mr-2 h-4 w-4" />
                Anteprima
              </Button>
              <Button
                onClick={openLink}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Apri Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Live Preview Card */}
      <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">
            Anteprima Live - Come apparirà il tuo link
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Anteprima fedele alla pagina che vedranno i tuoi visitatori
          </p>
        </CardHeader>
        <CardContent>
          {/* Live Preview Window */}
          <div className="bg-black/30 rounded-lg p-6 border border-white/10">
            <div 
              className={`min-h-[600px] flex items-center justify-center p-4 rounded-lg overflow-hidden relative ${backgroundStyle.className || ''}`} 
              style={backgroundStyle}
            >
              {/* Cover Image Overlay */}
              {coverImageUrl && (
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                  style={{ backgroundImage: `url(${coverImageUrl})` }}
                />
              )}
              
              <div className="relative z-10 max-w-lg mx-auto w-full">
                <Card className="shadow-2xl backdrop-blur-sm bg-white/90">
                  {/* Header Section - Matching SubdomainHandler exactly */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white rounded-t-lg relative">
                    {profileImageUrl && (
                      <div className="flex justify-center mb-4">
                        <img 
                          src={profileImageUrl} 
                          alt="Profile" 
                          className="w-20 h-20 rounded-full border-4 border-white object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="text-center">
                      {displayName && (
                        <h2 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                          <ExternalLink className="h-5 w-5" />
                          {displayName}
                        </h2>
                      )}
                      
                      <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                        <ExternalLink className="h-6 w-6" />
                        {title || "Link Personalizzato"}
                      </h1>
                      
                      {description && (
                        <p className="text-blue-100 leading-relaxed mb-2">
                          {description}
                        </p>
                      )}
                      
                      {bio && (
                        <p className="text-blue-50 text-sm leading-relaxed">
                          {bio}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Social Links Preview */}
                      {socialLinks.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            I miei social
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {socialLinks.slice(0, 4).map((social, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="justify-start text-xs"
                              >
                                {social.display_text || social.platform}
                              </Button>
                            ))}
                          </div>
                          {socialLinks.length > 4 && (
                            <p className="text-gray-500 text-xs text-center">
                              +{socialLinks.length - 4} altri link social
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Main CTA Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        size="lg"
                        disabled
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Visita Link
                      </Button>
                      
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <span>0 click totali</span>
                      </div>
                      
                      <div className="pt-4 border-t text-center">
                        <p className="text-xs text-muted-foreground mb-2">
                          Powered by
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          disabled
                        >
                          🔗 lnkfire.dev
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
    </div>
  );
};

export default LinkPreview;

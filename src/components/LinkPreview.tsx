
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Eye, Monitor, Heart, Globe, BarChart3, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/customLink";

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
    if (generatedLink) {
      window.open(generatedLink, '_blank', 'width=400,height=700,scrollbars=yes,resizable=yes');
      
      toast({
        title: "Anteprima aperta!",
        description: "Si è aperta una finestra con l'anteprima del tuo link",
      });
    }
  };

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

      {/* Enhanced Live Preview Card - Exact replica of SubdomainHandler */}
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
              {/* Hero Section with Cover Image - Exact replica */}
              <div className="relative">
                {/* Cover Image Overlay */}
                {coverImageUrl && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${coverImageUrl})` }}
                  />
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Hero Content */}
                <div className="relative z-10 px-6 py-16 text-center text-white">
                  {/* Profile Image */}
                  {profileImageUrl && (
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img 
                          src={profileImageUrl} 
                          alt="Profile" 
                          className="w-32 h-32 rounded-full border-4 border-white/80 object-cover shadow-2xl"
                        />
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                          <Heart className="h-5 w-5 text-white" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Name and Title */}
                  {displayName && (
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
                      {displayName}
                    </h1>
                  )}
                  
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-blue-100 drop-shadow">
                    {title || "Link Personalizzato"}
                  </h2>
                  
                  {/* Bio */}
                  {bio && (
                    <p className="text-lg sm:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow">
                      {bio}
                    </p>
                  )}
                  
                  {/* Description */}
                  {description && (
                    <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed drop-shadow">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 px-6 pb-16">
                <div className="max-w-2xl mx-auto space-y-8">
                  
                  {/* Social Links Section */}
                  {socialLinks && socialLinks.length > 0 && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
                        <Globe className="h-6 w-6 text-blue-600" />
                        I miei social
                      </h3>
                      <div className="grid gap-4">
                        {socialLinks.map((social, index) => (
                          <div
                            key={index}
                            className="h-16 justify-start bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200/50 transition-all duration-300 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-4 w-full">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                                {social.platform.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 text-left">
                                <div className="font-semibold text-gray-800 text-lg">
                                  {social.display_text || social.platform}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Clicca per visitare il mio {social.platform}
                                </div>
                              </div>
                              <ExternalLink className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Main CTA Section */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <ExternalLink className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800">
                        Scopri di più
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        Clicca il pulsante qui sotto per visitare il link principale
                      </p>
                      
                      <div className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold shadow-xl rounded-2xl flex items-center justify-center">
                        <ExternalLink className="mr-3 h-6 w-6" />
                        Visita il Link
                        <div className="ml-3 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats and Footer */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-800">0</div>
                          <div className="text-sm text-gray-500">visite totali</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Attivo</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 text-center">
                      <p className="text-xs text-gray-500 mb-3 font-medium">
                        Powered by
                      </p>
                      <div className="text-blue-600 font-bold text-sm flex items-center justify-center gap-2">
                        <span className="text-xl">🔗</span>
                        lnkfire.dev
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </div>
                    </div>
                  </div>
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
    </div>
  );
};

export default LinkPreview;

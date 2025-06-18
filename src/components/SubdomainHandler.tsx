
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BarChart3, User, Globe, Heart, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/customLink";

interface CustomLink {
  id: string;
  slug: string;
  destination_url: string;
  title: string | null;
  description: string | null;
  display_name: string | null;
  bio: string | null;
  background_theme: string;
  profile_image_url: string | null;
  cover_image_url: string | null;
  custom_background_url: string | null;
  social_links: SocialLink[] | null;
  click_count: number;
}

const SubdomainHandler = () => {
  const [link, setLink] = useState<CustomLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadLinkData = async () => {
      // Extract subdomain from current hostname
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      
      // Check if we're on a subdomain of lnkfire.dev
      if (parts.length === 3 && parts[1] === 'lnkfire' && parts[2] === 'dev') {
        const slug = parts[0];
        
        try {
          const { data, error } = await supabase
            .from('custom_links')
            .select('*')
            .eq('slug', slug)
            .single();

          if (error || !data) {
            setNotFound(true);
          } else {
            // Properly type cast the social_links from Json to SocialLink[]
            const typedData: CustomLink = {
              ...data,
              social_links: Array.isArray(data.social_links) ? (data.social_links as unknown as SocialLink[]) : null
            };
            setLink(typedData);
          }
        } catch (error) {
          console.error('Error loading link:', error);
          setNotFound(true);
        }
      } else {
        // Not a subdomain, this component shouldn't be rendered
        setNotFound(true);
      }
      
      setLoading(false);
    };

    loadLinkData();
  }, []);

  const handleVisitLink = async () => {
    if (!link) return;

    try {
      // Increment click count
      await supabase
        .from('custom_links')
        .update({ click_count: link.click_count + 1 })
        .eq('id', link.id);

      // Redirect to destination URL
      window.location.href = link.destination_url;
    } catch (error) {
      console.error('Error updating click count:', error);
      // Still redirect even if analytics fails
      window.location.href = link.destination_url;
    }
  };

  const getBackgroundStyle = () => {
    if (!link) return {};
    
    if (link.custom_background_url) {
      return {
        backgroundImage: `url(${link.custom_background_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    const themeStyles: Record<string, string> = {
      'gradient-blue': 'bg-gradient-to-br from-blue-50 to-purple-50',
      'gradient-purple': 'bg-gradient-to-br from-purple-50 to-pink-50',
      'gradient-green': 'bg-gradient-to-br from-green-50 to-blue-50',
      'gradient-orange': 'bg-gradient-to-br from-orange-50 to-red-50',
      'dark': 'bg-gray-900',
      'minimal': 'bg-white'
    };
    
    return { className: themeStyles[link.background_theme] || themeStyles['gradient-blue'] };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (notFound || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h1 className="text-2xl font-bold mb-2">Link non trovato</h1>
            <p className="text-muted-foreground mb-6">
              Questo link personalizzato non esiste o è stato rimosso.
            </p>
            <Button 
              onClick={() => window.location.href = 'https://lnkfire.dev'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Crea il tuo link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative ${backgroundStyle.className || ''}`} style={backgroundStyle}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75"></div>
      </div>

      {/* Cover Image Overlay */}
      {link.cover_image_url && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${link.cover_image_url})` }}
        />
      )}
      
      <div className="relative z-10 max-w-lg mx-auto w-full">
        <Card className="shadow-2xl backdrop-blur-sm bg-white/95 border-0 overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            {/* Profile Image with enhanced styling */}
            {link.profile_image_url && (
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-lg scale-110"></div>
                  <img 
                    src={link.profile_image_url} 
                    alt="Profile" 
                    className="relative w-24 h-24 rounded-full border-4 border-white/50 object-cover shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-3 border-white flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center relative">
              {link.display_name && (
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{link.display_name}</span>
                  </div>
                </div>
              )}
              
              <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                {link.title || "Link Personalizzato"}
              </h1>
              
              {link.description && (
                <p className="text-blue-100 leading-relaxed mb-3 text-lg">
                  {link.description}
                </p>
              )}
              
              {link.bio && (
                <p className="text-blue-50 text-sm leading-relaxed bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  {link.bio}
                </p>
              )}
            </div>
          </div>
          
          <CardContent className="p-8 space-y-6">
            {/* Social Links with improved design */}
            {link.social_links && link.social_links.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-blue-600" />
                  I miei social
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {link.social_links.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      onClick={() => window.open(social.url, '_blank')}
                      className="justify-start h-14 text-left bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
                          {social.platform.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{social.display_text || social.platform}</div>
                          <div className="text-xs text-gray-500 truncate">Clicca per visitare</div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Enhanced Main CTA Button */}
            <div className="space-y-4">
              <Button 
                onClick={handleVisitLink}
                className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <ExternalLink className="mr-3 h-6 w-6" />
                Visita Link
                <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </Button>

              {/* Share button */}
              <Button 
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: link.title || 'Link Personalizzato',
                      text: link.description || '',
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link copiato!",
                      description: "Il link è stato copiato negli appunti"
                    });
                  }
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Condividi questo link
              </Button>
            </div>
            
            {/* Enhanced Stats Section */}
            <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200/50">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">{link.click_count}</span>
                <span className="text-sm">click totali</span>
              </div>
            </div>
            
            {/* Enhanced Footer */}
            <div className="pt-6 border-t border-gray-200 text-center space-y-3">
              <p className="text-xs text-gray-500 font-medium">
                Powered by
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://lnkfire.dev', '_blank')}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold transition-all duration-300 group"
              >
                <span className="text-lg mr-2 group-hover:scale-110 transition-transform">🔗</span>
                lnkfire.dev
                <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubdomainHandler;

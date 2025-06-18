
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BarChart3, User, Globe } from "lucide-react";
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
            setLink(data);
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
    <div className={`min-h-screen flex items-center justify-center p-4 ${backgroundStyle.className || ''}`} style={backgroundStyle}>
      {/* Cover Image */}
      {link.cover_image_url && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${link.cover_image_url})` }}
        />
      )}
      
      <div className="relative z-10 max-w-lg mx-auto">
        <Card className="shadow-2xl backdrop-blur-sm bg-white/90">
          {/* Header con eventuale immagine di profilo */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white rounded-t-lg relative">
            {link.profile_image_url && (
              <div className="flex justify-center mb-4">
                <img 
                  src={link.profile_image_url} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
              </div>
            )}
            
            <div className="text-center">
              {link.display_name && (
                <h2 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  <User className="h-5 w-5" />
                  {link.display_name}
                </h2>
              )}
              
              <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <ExternalLink className="h-6 w-6" />
                {link.title || "Link Personalizzato"}
              </h1>
              
              {link.description && (
                <p className="text-blue-100 leading-relaxed mb-2">
                  {link.description}
                </p>
              )}
              
              {link.bio && (
                <p className="text-blue-50 text-sm leading-relaxed">
                  {link.bio}
                </p>
              )}
            </div>
          </div>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Social Links */}
              {link.social_links && link.social_links.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    I miei social
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {link.social_links.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(social.url, '_blank')}
                        className="justify-start"
                      >
                        {social.platform}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Main CTA Button */}
              <Button 
                onClick={handleVisitLink}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Visita Link
              </Button>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                <span>{link.click_count} click totali</span>
              </div>
              
              <div className="pt-4 border-t text-center">
                <p className="text-xs text-muted-foreground mb-2">
                  Powered by
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://lnkfire.dev', '_blank')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  🔗 lnkfire.dev
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubdomainHandler;


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, BarChart3, User, Globe, Heart, Share2, MapPin, Calendar } from "lucide-react";
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

  const handleSocialClick = async (socialLink: SocialLink) => {
    window.open(socialLink.url, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: link?.title || 'Link Personalizzato',
        text: link?.description || '',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiato!",
        description: "Il link è stato copiato negli appunti"
      });
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
      'gradient-blue': 'from-blue-400 via-blue-600 to-purple-600',
      'gradient-purple': 'from-purple-400 via-pink-500 to-red-500',
      'gradient-green': 'from-green-400 via-teal-500 to-blue-500',
      'gradient-orange': 'from-yellow-400 via-orange-500 to-red-500',
      'dark': 'from-gray-800 via-gray-900 to-black',
      'minimal': 'from-gray-50 via-white to-gray-100'
    };
    
    return { 
      className: `bg-gradient-to-br ${themeStyles[link.background_theme] || themeStyles['gradient-blue']}` 
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (notFound || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="text-6xl mb-6">🔗</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Link non trovato</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Questo link personalizzato non esiste o è stato rimosso.
          </p>
          <Button 
            onClick={() => window.location.href = 'https://lnkfire.dev'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Crea il tuo link
          </Button>
        </div>
      </div>
    );
  }

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className={`min-h-screen ${backgroundStyle.className || 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600'}`} style={backgroundStyle}>
      {/* Hero Section with Cover Image */}
      <div className="relative">
        {/* Cover Image Overlay */}
        {link.cover_image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${link.cover_image_url})` }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-6 py-16 text-center text-white">
          {/* Profile Image */}
          {link.profile_image_url && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={link.profile_image_url} 
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
          {link.display_name && (
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
              {link.display_name}
            </h1>
          )}
          
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-blue-100 drop-shadow">
            {link.title || "Link Personalizzato"}
          </h2>
          
          {/* Bio */}
          {link.bio && (
            <p className="text-lg sm:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow">
              {link.bio}
            </p>
          )}
          
          {/* Description */}
          {link.description && (
            <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed drop-shadow">
              {link.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          
          {/* Social Links Section */}
          {link.social_links && link.social_links.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
                <Globe className="h-6 w-6 text-blue-600" />
                I miei social
              </h3>
              <div className="grid gap-4">
                {link.social_links.map((social, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSocialClick(social)}
                    variant="outline"
                    size="lg"
                    className="h-16 justify-start bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-100 hover:to-purple-100 border-2 border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold group-hover:scale-110 transition-transform shadow-lg">
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
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Main CTA Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
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
              
              <Button 
                onClick={handleVisitLink}
                className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
                size="lg"
              >
                <ExternalLink className="mr-3 h-6 w-6" />
                Visita il Link
                <div className="ml-3 w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </Button>
              
              <Button 
                onClick={handleShare}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Condividi questo profilo
              </Button>
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
                  <div className="text-2xl font-bold text-gray-800">{link.click_count}</div>
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://lnkfire.dev', '_blank')}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold transition-all duration-300 group rounded-xl"
              >
                <span className="text-xl mr-2 group-hover:scale-110 transition-transform">🔗</span>
                lnkfire.dev
                <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubdomainHandler;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SocialLink } from "@/types/customLink";
import { Link } from "react-router-dom";
import PreviewHeroSection from "@/components/preview/PreviewHeroSection";
import PreviewSocialLinks from "@/components/preview/PreviewSocialLinks";
import PreviewMainCTA from "@/components/preview/PreviewMainCTA";
import PreviewStatsFooter from "@/components/preview/PreviewStatsFooter";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

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
  custom_buttons: CustomButton[] | null;
  click_count: number;
}

const PreviewPage = () => {
  const { slug } = useParams();
  const [link, setLink] = useState<CustomLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadLinkData = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('custom_links')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          const typedData: CustomLink = {
            ...data,
            social_links: Array.isArray(data.social_links) ? (data.social_links as unknown as SocialLink[]) : null,
            custom_buttons: Array.isArray(data.custom_buttons) ? (data.custom_buttons as unknown as CustomButton[]) : null
          };
          setLink(typedData);
        }
      } catch (error) {
        console.error('Error loading link:', error);
        setNotFound(true);
      }
      
      setLoading(false);
    };

    loadLinkData();
  }, [slug]);

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
    
    // Handle custom colors
    if (link.background_theme.startsWith('custom-')) {
      const customColor = link.background_theme.replace('custom-', '');
      return {
        backgroundColor: customColor
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
      className: `bg-gradient-to-br ${themeStyles[link.background_theme] || themeStyles['gradient-blue']}` 
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento preview...</p>
        </div>
      </div>
    );
  }

  if (notFound || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="text-6xl mb-6">🔗</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Preview non disponibile</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Questo slug non esiste o non è stato ancora creato.
          </p>
          <Link to="/link-customizer">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna al Customizer
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="min-h-screen relative">
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white px-4 py-2 text-center text-sm font-medium">
        🔍 MODALITÀ PREVIEW - Questa è l'anteprima di sviluppo
        <Link to="/link-customizer" className="ml-4 underline hover:no-underline">
          Torna al Customizer
        </Link>
      </div>

      {/* Main Content using the same components as the customizer */}
      <div className={`pt-12 min-h-screen ${backgroundStyle.className || 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600'}`} style={backgroundStyle}>
        {/* Hero Section */}
        <PreviewHeroSection
          profileImageUrl={link.profile_image_url || undefined}
          displayName={link.display_name || undefined}
          title={link.title || "Link Personalizzato"}
          bio={link.bio || undefined}
          description={link.description || ""}
          coverImageUrl={link.cover_image_url || undefined}
        />

        {/* Main Content */}
        <div className="relative z-10 px-6 pb-20">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Social Links Section */}
            <PreviewSocialLinks socialLinks={link.social_links || []} />
            
            {/* Main CTA Section with custom buttons */}
            <PreviewMainCTA customButtons={link.custom_buttons || []} />
            
            {/* Stats and Footer */}
            <PreviewStatsFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;


import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/customLink";
import { supabase } from "@/integrations/supabase/client";
import SubdomainLoader, { CustomLink } from "./subdomain/SubdomainLoader";
import SubdomainLoadingState from "./subdomain/SubdomainLoadingState";
import SubdomainNotFound from "./subdomain/SubdomainNotFound";
import SubdomainHeroSection from "./subdomain/SubdomainHeroSection";
import SubdomainSocialLinks from "./subdomain/SubdomainSocialLinks";
import SubdomainMainCTA from "./subdomain/SubdomainMainCTA";
import SubdomainStatsFooter from "./subdomain/SubdomainStatsFooter";
import { getBackgroundStyle } from "./subdomain/SubdomainBackgroundUtils";

const SubdomainHandler = () => {
  const [link, setLink] = useState<CustomLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleVisitLink = async () => {
    if (!link) return;

    try {
      await supabase
        .from('custom_links')
        .update({ click_count: link.click_count + 1 })
        .eq('id', link.id);

      window.location.href = link.destination_url;
    } catch (error) {
      console.error('Error updating click count:', error);
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

  if (loading) {
    return <SubdomainLoadingState />;
  }

  if (notFound || !link) {
    return <SubdomainNotFound />;
  }

  const backgroundStyle = getBackgroundStyle(link);

  return (
    <>
      <SubdomainLoader 
        onLinkLoaded={setLink}
        onNotFound={() => setNotFound(true)}
        onLoading={setLoading}
      />
      
      <div className={`min-h-screen ${backgroundStyle.className || 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600'}`} style={backgroundStyle}>
        {/* Hero Section */}
        <SubdomainHeroSection link={link} />

        {/* Main Content - Mobile Optimized Compact Layout */}
        <div className="relative z-10 px-4 pb-6 -mt-2">
          <div className="max-w-xs mx-auto space-y-3">
            
            {/* Social Links Section */}
            {link.social_links && link.social_links.length > 0 && (
              <SubdomainSocialLinks 
                socialLinks={link.social_links}
                onSocialClick={handleSocialClick}
              />
            )}
            
            {/* Main CTA Section */}
            <SubdomainMainCTA 
              onVisitLink={handleVisitLink}
              onShare={handleShare}
            />
            
            {/* Stats and Footer */}
            <SubdomainStatsFooter clickCount={link.click_count} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubdomainHandler;


import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/customLink";
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

  const handleLinkLoaded = useCallback((loadedLink: CustomLink | null) => {
    console.log('SubdomainHandler: Link loaded callback:', loadedLink);
    setLink(loadedLink);
    setNotFound(false);
  }, []);

  const handleNotFound = useCallback(() => {
    console.log('SubdomainHandler: Not found callback');
    setNotFound(true);
    setLink(null);
  }, []);

  const handleLoading = useCallback((isLoading: boolean) => {
    console.log('SubdomainHandler: Loading state changed:', isLoading);
    setLoading(isLoading);
  }, []);

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

  console.log('SubdomainHandler: Current state - loading:', loading, 'notFound:', notFound, 'link:', !!link);

  if (loading) {
    return (
      <>
        <SubdomainLoader 
          onLinkLoaded={handleLinkLoaded}
          onNotFound={handleNotFound}
          onLoading={handleLoading}
        />
        <SubdomainLoadingState />
      </>
    );
  }

  if (notFound || !link) {
    return <SubdomainNotFound />;
  }

  const backgroundStyle = getBackgroundStyle(link);

  return (
    <div className={`min-h-screen ${backgroundStyle.className || 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600'}`} style={backgroundStyle}>
      <SubdomainHeroSection link={link} />

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-12">
          
          {/* Social Links Section */}
          {link.social_links && link.social_links.length > 0 && (
            <SubdomainSocialLinks 
              socialLinks={link.social_links}
              onSocialClick={handleSocialClick}
            />
          )}
          
          {/* Main CTA Section */}
          <SubdomainMainCTA 
            customButtons={link.custom_buttons}
            onShare={handleShare}
          />
          
          {/* Stats and Footer */}
          <SubdomainStatsFooter clickCount={link.click_count} />
        </div>
      </div>
    </div>
  );
};

export default SubdomainHandler;

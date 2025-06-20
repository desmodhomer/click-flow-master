
import { useState, useCallback, useRef } from "react";
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
  const callbacksExecuted = useRef({
    linkLoaded: false,
    notFound: false
  });

  const handleLinkLoaded = useCallback((loadedLink: CustomLink | null) => {
    if (callbacksExecuted.current.linkLoaded) {
      console.log('SubdomainHandler: Link loaded callback already executed, ignoring');
      return;
    }
    
    console.log('SubdomainHandler: Link loaded callback:', loadedLink);
    callbacksExecuted.current.linkLoaded = true;
    setLink(loadedLink);
    setNotFound(false);
    setLoading(false);
  }, []);

  const handleNotFound = useCallback(() => {
    if (callbacksExecuted.current.notFound) {
      console.log('SubdomainHandler: Not found callback already executed, ignoring');
      return;
    }
    
    console.log('SubdomainHandler: Not found callback');
    callbacksExecuted.current.notFound = true;
    setNotFound(true);
    setLink(null);
    setLoading(false);
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

  // Mostra sempre il loader mentre carica, ma solo se non abbiamo già i dati
  if (loading && !link && !notFound) {
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
      {/* Hero Section */}
      <SubdomainHeroSection link={link} />

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-2xl mx-auto space-y-8">
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

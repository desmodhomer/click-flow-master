
import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/customLink";
import SubdomainLoader, { CustomLink } from "./subdomain/SubdomainLoader";
import SubdomainLoadingState from "./subdomain/SubdomainLoadingState";
import SubdomainNotFound from "./subdomain/SubdomainNotFound";
import PreviewHeroSection from "./preview/PreviewHeroSection";
import PreviewSocialLinks from "./preview/PreviewSocialLinks";
import PreviewMainCTA from "./preview/PreviewMainCTA";
import PreviewStatsFooter from "./preview/PreviewStatsFooter";
import { getBackgroundStyle } from "./subdomain/SubdomainBackgroundUtils";

const SubdomainHandler = () => {
  const [link, setLink] = useState<CustomLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  const initialized = useRef(false);

  const handleLinkLoaded = useCallback((loadedLink: CustomLink | null) => {
    if (initialized.current) return;
    
    console.log('SubdomainHandler: Link loaded callback:', loadedLink);
    setLink(loadedLink);
    setNotFound(false);
    initialized.current = true;
  }, []);

  const handleNotFound = useCallback(() => {
    if (initialized.current) return;
    
    console.log('SubdomainHandler: Not found callback');
    setNotFound(true);
    setLink(null);
    initialized.current = true;
  }, []);

  const handleLoading = useCallback((isLoading: boolean) => {
    console.log('SubdomainHandler: Loading state changed:', isLoading);
    setLoading(isLoading);
  }, []);

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
  );
};

export default SubdomainHandler;

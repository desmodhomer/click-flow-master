
import { useState } from "react";
import SubdomainLoader from "./subdomain/SubdomainLoader";
import SubdomainHeroSection from "./subdomain/SubdomainHeroSection";
import SubdomainLoadingState from "./subdomain/SubdomainLoadingState";
import SubdomainNotFound from "./subdomain/SubdomainNotFound";
import SubdomainSocialLinks from "./subdomain/SubdomainSocialLinks";
import SubdomainMainCTA from "./subdomain/SubdomainMainCTA";
import SubdomainStatsFooter from "./subdomain/SubdomainStatsFooter";
import { getBackgroundStyle } from "./subdomain/SubdomainBackgroundUtils";
import { CustomLink } from "./subdomain/SubdomainLoader";

const SubdomainHandler = () => {
  const [linkData, setLinkData] = useState<CustomLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('🏠 SubdomainHandler: Rendering with state:', {
    linkData: linkData?.slug || 'null',
    loading,
    notFound,
    error,
    hostname: window.location.hostname
  });

  const handleLinkLoaded = (link: CustomLink | null) => {
    console.log('📥 SubdomainHandler: handleLinkLoaded called with:', link?.slug || 'null');
    setLinkData(link);
    setLoading(false);
    setNotFound(false);
    if (!link) {
      console.log('❌ SubdomainHandler: No link data received, setting notFound to true');
      setNotFound(true);
    }
  };

  const handleNotFound = () => {
    console.log('🚫 SubdomainHandler: handleNotFound called');
    setNotFound(true);
    setLoading(false);
    setError('Link non trovato o slug non valido');
  };

  const handleLoading = (isLoading: boolean) => {
    console.log('⏳ SubdomainHandler: handleLoading called with:', isLoading);
    setLoading(isLoading);
  };

  const handleSocialClick = (social: any) => {
    console.log('🔗 Social link clicked:', social);
    window.open(social.url, '_blank');
  };

  const handleMainCTAClick = () => {
    if (linkData?.destination_url) {
      console.log('🎯 Main CTA clicked, redirecting to:', linkData.destination_url);
      window.open(linkData.destination_url, '_blank');
    }
  };

  const backgroundStyle = getBackgroundStyle(linkData);

  return (
    <div className="min-h-screen" style={backgroundStyle.backgroundImage ? backgroundStyle : undefined}>
      {/* Applica il background gradient se non è un'immagine custom */}
      {!backgroundStyle.backgroundImage && (
        <div className={`min-h-screen ${backgroundStyle.className || 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600'}`}>
          <SubdomainPageContent 
            loading={loading}
            notFound={notFound}
            linkData={linkData}
            error={error}
            onSocialClick={handleSocialClick}
            onMainCTAClick={handleMainCTAClick}
          />
        </div>
      )}
      
      {/* Per background con immagine custom */}
      {backgroundStyle.backgroundImage && (
        <SubdomainPageContent 
          loading={loading}
          notFound={notFound}
          linkData={linkData}
          error={error}
          onSocialClick={handleSocialClick}
          onMainCTAClick={handleMainCTAClick}
        />
      )}

      {/* Il SubdomainLoader è sempre presente e attivo */}
      <SubdomainLoader
        onLinkLoaded={handleLinkLoaded}
        onNotFound={handleNotFound}
        onLoading={handleLoading}
      />
    </div>
  );
};

interface SubdomainPageContentProps {
  loading: boolean;
  notFound: boolean;
  linkData: CustomLink | null;
  error: string | null;
  onSocialClick: (social: any) => void;
  onMainCTAClick: () => void;
}

const SubdomainPageContent = ({ 
  loading, 
  notFound, 
  linkData, 
  error, 
  onSocialClick, 
  onMainCTAClick 
}: SubdomainPageContentProps) => {
  if (loading) {
    console.log('⏳ SubdomainHandler: Rendering loading state');
    return <SubdomainLoadingState />;
  }

  if (notFound && !loading) {
    console.log('🚫 SubdomainHandler: Rendering not found state');
    return <SubdomainNotFound error={error} />;
  }

  if (linkData && !loading && !notFound) {
    console.log('✅ SubdomainHandler: Rendering complete page for:', linkData.slug);
    return (
      <div className="flex flex-col min-h-screen">
        <SubdomainHeroSection link={linkData} />
        
        {linkData.social_links && linkData.social_links.length > 0 && (
          <SubdomainSocialLinks 
            socialLinks={linkData.social_links} 
            onSocialClick={onSocialClick}
          />
        )}
        
        <SubdomainMainCTA 
          link={linkData}
          onClick={onMainCTAClick}
        />
        
        <SubdomainStatsFooter 
          clickCount={linkData.click_count}
          slug={linkData.slug}
        />
      </div>
    );
  }

  return null;
};

export default SubdomainHandler;

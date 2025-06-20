
import { useState } from "react";
import SubdomainLoader from "./subdomain/SubdomainLoader";
import SubdomainHeroSection from "./subdomain/SubdomainHeroSection";
import SubdomainLoadingState from "./subdomain/SubdomainLoadingState";
import SubdomainNotFound from "./subdomain/SubdomainNotFound";
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
    setNotFound(false); // Reset notFound quando troviamo dati
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

  return (
    <div className="min-h-screen">
      {/* Il SubdomainLoader è sempre presente e attivo */}
      <SubdomainLoader
        onLinkLoaded={handleLinkLoaded}
        onNotFound={handleNotFound}
        onLoading={handleLoading}
      />
      
      {/* Condizioni di rendering */}
      {loading && (
        <>
          {console.log('⏳ SubdomainHandler: Rendering loading state')}
          <SubdomainLoadingState />
        </>
      )}

      {notFound && !loading && (
        <>
          {console.log('🚫 SubdomainHandler: Rendering not found state')}
          <SubdomainNotFound error={error} />
        </>
      )}

      {linkData && !loading && !notFound && (
        <>
          {console.log('✅ SubdomainHandler: Rendering hero section for:', linkData.slug)}
          <SubdomainHeroSection link={linkData} />
        </>
      )}
    </div>
  );
};

export default SubdomainHandler;

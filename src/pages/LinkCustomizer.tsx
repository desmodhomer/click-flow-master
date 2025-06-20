
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";
import LinkCustomizerForm from "@/components/LinkCustomizerForm";
import PreviewPanel from "@/components/customizer/PreviewPanel";
import { useLinkCustomizerState } from "@/hooks/useLinkCustomizerState";
import { useLinkGeneration } from "@/components/customizer/LinkGenerationHandler";
import { useLinkLoader } from "@/hooks/useLinkLoader";

const LinkCustomizerPage = () => {
  const [searchParams] = useSearchParams();
  const editLinkId = searchParams.get('edit');

  const {
    customSlug,
    setCustomSlug,
    title,
    setTitle,
    description,
    setDescription,
    displayName,
    setDisplayName,
    bio,
    setBio,
    backgroundTheme,
    setBackgroundTheme,
    profileImageUrl,
    setProfileImageUrl,
    coverImageUrl,
    setCoverImageUrl,
    customBackgroundUrl,
    setCustomBackgroundUrl,
    socialLinks,
    setSocialLinks,
    customButtons,
    setCustomButtons,
    activeTab,
    setActiveTab,
  } = useLinkCustomizerState();

  const [generatedLink, setGeneratedLink] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { linkData, loading: loadingLink } = useLinkLoader(editLinkId);

  // Carica i dati del link esistente quando disponibili
  useEffect(() => {
    if (linkData) {
      setCustomSlug(linkData.customSlug);
      setTitle(linkData.title);
      setDescription(linkData.description);
      setDisplayName(linkData.displayName);
      setBio(linkData.bio);
      setBackgroundTheme(linkData.backgroundTheme);
      setProfileImageUrl(linkData.profileImageUrl);
      setCoverImageUrl(linkData.coverImageUrl);
      setCustomBackgroundUrl(linkData.customBackgroundUrl);
      setSocialLinks(linkData.socialLinks);
      setCustomButtons(linkData.customButtons);
      
      // Imposta il link generato se stiamo modificando
      if (linkData.customSlug) {
        setGeneratedLink(`https://${linkData.customSlug}.lnkfire.dev`);
      }
    }
  }, [linkData]);

  const handleLinkGenerated = (link: string) => {
    console.log('Link generated:', link);
    setGeneratedLink(link);
  };

  const handlePanelStateChange = (isOpen: boolean) => {
    setIsPanelOpen(isOpen);
  };

  const { handleGenerate } = useLinkGeneration({
    customSlug,
    title,
    description,
    displayName,
    bio,
    backgroundTheme,
    profileImageUrl,
    coverImageUrl,
    customBackgroundUrl,
    socialLinks,
    customButtons,
    onLinkGenerated: handleLinkGenerated,
    setIsGenerating,
    editLinkId, // Passo l'ID del link da modificare
  });

  if (loadingLink) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Caricamento link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Pulsante Generate Link in alto a destra */}
      <div className="absolute top-6 right-6 z-50">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || customButtons.length === 0}
          size="lg"
          className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2 h-10 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editLinkId ? 'Aggiornamento...' : 'Generazione...'}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {editLinkId ? 'Aggiorna Link' : 'Genera Link'}
              <ExternalLink className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="flex h-screen">
        {/* Form Panel */}
        <div className={cn(
          "transition-all duration-500 ease-in-out shadow-xl",
          isPanelOpen ? "w-[420px]" : "w-16"
        )}>
          <LinkCustomizerForm
            onLinkGenerated={handleLinkGenerated}
            customSlug={customSlug}
            setCustomSlug={setCustomSlug}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            displayName={displayName}
            setDisplayName={setDisplayName}
            bio={bio}
            setBio={setBio}
            backgroundTheme={backgroundTheme}
            setBackgroundTheme={setBackgroundTheme}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
            profileImageUrl={profileImageUrl}
            setProfileImageUrl={setProfileImageUrl}
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
            customBackgroundUrl={customBackgroundUrl}
            setCustomBackgroundUrl={setCustomBackgroundUrl}
            customButtons={customButtons}
            setCustomButtons={setCustomButtons}
            onPanelStateChange={handlePanelStateChange}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Preview Panel - Ora occupa tutto lo spazio rimanente */}
        <div className="flex-1 p-6 pt-20 overflow-hidden bg-white">
          <PreviewPanel
            generatedLink={generatedLink}
            title={title}
            description={description}
            displayName={displayName}
            bio={bio}
            backgroundTheme={backgroundTheme}
            profileImageUrl={profileImageUrl}
            coverImageUrl={coverImageUrl}
            customBackgroundUrl={customBackgroundUrl}
            socialLinks={socialLinks}
            customSlug={customSlug}
            customButtons={customButtons}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkCustomizerPage;

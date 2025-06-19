
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";
import LinkCustomizerForm from "@/components/LinkCustomizerForm";
import PreviewPanel from "@/components/customizer/PreviewPanel";
import { useLinkCustomizerState } from "@/hooks/useLinkCustomizerState";

const LinkCustomizerPage = () => {
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

  const handleLinkGenerated = (link: string) => {
    console.log('Link generated:', link);
    setGeneratedLink(link);
  };

  const handlePanelStateChange = (isOpen: boolean) => {
    setIsPanelOpen(isOpen);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsGenerating(false);
  };

  return (
    <div className="relative flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Pulsante Generate Link in alto a destra */}
      <div className="absolute top-4 right-4 z-50">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || customButtons.length === 0}
          size="sm"
          className="bg-black hover:bg-gray-800 text-white font-medium px-4 h-8 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Generazione...
            </>
          ) : (
            <>
              <Sparkles className="mr-1 h-3 w-3" />
              Genera
              <ExternalLink className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </div>

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

      {/* Preview Panel - Expands when sidebar is collapsed */}
      <div className={cn(
        "p-6 overflow-hidden bg-white transition-all duration-500 ease-in-out",
        "flex-1"
      )}>
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
  );
};

export default LinkCustomizerPage;

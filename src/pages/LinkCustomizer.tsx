
import { useState } from "react";
import { cn } from "@/lib/utils";
import LinkCustomizerForm from "@/components/LinkCustomizerForm";
import PreviewPanel from "@/components/customizer/PreviewPanel";
import { SocialLink } from "@/types/customLink";

const LinkCustomizerPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [backgroundTheme, setBackgroundTheme] = useState("gradient-blue");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleLinkGenerated = (link: string) => {
    console.log('Link generated:', link);
    setGeneratedLink(link);
  };

  const handlePanelStateChange = (isOpen: boolean) => {
    setIsPanelOpen(isOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Form Panel */}
      <div className={cn(
        "transition-all duration-500 ease-in-out shadow-xl",
        isPanelOpen ? "w-[420px]" : "w-16"
      )}>
        <LinkCustomizerForm
          onLinkGenerated={handleLinkGenerated}
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
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
          onPanelStateChange={handlePanelStateChange}
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
        />
      </div>
    </div>
  );
};

export default LinkCustomizerPage;


import { useState } from "react";
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

  const handleLinkGenerated = (link: string) => {
    console.log('Link generated:', link);
    setGeneratedLink(link);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Form Panel */}
      <div className="w-2/3 border-r border-gray-300">
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
        />
      </div>

      {/* Preview Panel */}
      <div className="w-1/3 p-6 overflow-y-auto bg-gray-50">
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

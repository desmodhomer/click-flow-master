
import { useState } from "react";
import { RubiksCube } from "@/components/ui/rubik-s-cube";
import LinkCustomizerForm from "@/components/LinkCustomizerForm";
import LinkPreview from "@/components/LinkPreview";
import LinkCustomizerFeatures from "@/components/LinkCustomizerFeatures";
import LinkCustomizerHero from "@/components/LinkCustomizerHero";
import Header from "@/components/Header";
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

  // Log state changes for debugging
  console.log('Current state:', {
    title,
    description,
    displayName,
    bio,
    backgroundTheme,
    profileImageUrl,
    coverImageUrl,
    customBackgroundUrl,
    socialLinks: socialLinks.length,
    generatedLink
  });

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Header Navigation */}
      <Header />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex-1 flex flex-col justify-center py-8 sm:py-12 lg:py-16 pt-24">
          <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-12">
            {/* Hero Title */}
            <LinkCustomizerHero />

            {/* Features Cards */}
            <LinkCustomizerFeatures />

            {/* Main Tool */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Form Section */}
              <div className="order-2 lg:order-1 space-y-6">
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

              {/* Preview Section */}
              <div className="order-1 lg:order-2">
                <LinkPreview
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkCustomizerPage;

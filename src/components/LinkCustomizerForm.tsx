
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./customizer/ConfigurationPanel";
import CustomizerSidebar from "./customizer/CustomizerSidebar";
import CustomizerHeader from "./customizer/CustomizerHeader";
import ActivePanelRenderer from "./customizer/ActivePanelRenderer";
import { useLinkGeneration } from "./customizer/LinkGenerationHandler";

interface LinkCustomizerFormProps {
  onLinkGenerated: (link: string) => void;
  customSlug: string;
  setCustomSlug: (slug: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (url: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
  customButtons: CustomButton[];
  setCustomButtons: (buttons: CustomButton[]) => void;
  onPanelStateChange: (isOpen: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
}

const LinkCustomizerForm = ({
  onLinkGenerated,
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
  socialLinks,
  setSocialLinks,
  profileImageUrl,
  setProfileImageUrl,
  coverImageUrl,
  setCoverImageUrl,
  customBackgroundUrl,
  setCustomBackgroundUrl,
  customButtons,
  setCustomButtons,
  onPanelStateChange,
  isGenerating,
  setIsGenerating,
  activeTab,
  setActiveTab
}: LinkCustomizerFormProps) => {
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
    onLinkGenerated,
    setIsGenerating,
  });

  const handleTabChange = (tab: string) => {
    const newTab = activeTab === tab ? null : tab;
    setActiveTab(newTab);
    onPanelStateChange(newTab !== null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <CustomizerHeader
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        hasButtons={customButtons.length > 0}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CustomizerSidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        {/* Content Panel - Only show when a tab is active */}
        {activeTab && (
          <div className="w-80 p-6 overflow-y-auto bg-white border-r border-gray-200">
            <ActivePanelRenderer
              activeTab={activeTab}
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkCustomizerForm;

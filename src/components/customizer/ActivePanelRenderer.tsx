
import ConfigurationPanel from "./ConfigurationPanel";
import ProfilePanel from "./ProfilePanel";
import ImagesPanel from "./ImagesPanel";
import DesignPanel from "./DesignPanel";
import ButtonDesignPanel from "./ButtonDesignPanel";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";

interface ActivePanelRendererProps {
  activeTab: string | null;
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
}

const ActivePanelRenderer = ({
  activeTab,
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
}: ActivePanelRendererProps) => {
  switch (activeTab) {
    case "basic":
      return (
        <ConfigurationPanel
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
      );
    case "profile":
      return (
        <ProfilePanel
          displayName={displayName}
          setDisplayName={setDisplayName}
          bio={bio}
          setBio={setBio}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
      );
    case "images":
      return (
        <ImagesPanel
          profileImageUrl={profileImageUrl}
          setProfileImageUrl={setProfileImageUrl}
          coverImageUrl={coverImageUrl}
          setCoverImageUrl={setCoverImageUrl}
          customBackgroundUrl={customBackgroundUrl}
          setCustomBackgroundUrl={setCustomBackgroundUrl}
        />
      );
    case "design":
      return (
        <DesignPanel
          backgroundTheme={backgroundTheme}
          setBackgroundTheme={setBackgroundTheme}
          customBackgroundUrl={customBackgroundUrl}
          setCustomBackgroundUrl={setCustomBackgroundUrl}
        />
      );
    case "buttons":
      return (
        <ButtonDesignPanel
          customButtons={customButtons}
          setCustomButtons={setCustomButtons}
        />
      );
    default:
      return null;
  }
};

export default ActivePanelRenderer;

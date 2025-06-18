
import { SocialLink } from "@/types/customLink";
import PreviewPanel from "./customizer/PreviewPanel";

interface LinkPreviewProps {
  generatedLink: string;
  title: string;
  description: string;
  displayName?: string;
  bio?: string;
  backgroundTheme?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  customBackgroundUrl?: string;
  socialLinks?: SocialLink[];
  customSlug?: string;
}

const LinkPreview = ({ 
  generatedLink, 
  title, 
  description,
  displayName,
  bio,
  backgroundTheme = 'gradient-blue',
  profileImageUrl,
  coverImageUrl,
  customBackgroundUrl,
  socialLinks = [],
  customSlug
}: LinkPreviewProps) => {
  return (
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
  );
};

export default LinkPreview;

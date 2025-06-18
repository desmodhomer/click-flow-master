
import { SocialLink } from "@/types/customLink";
import LinkActionsCard from "./preview/LinkActionsCard";
import LivePreviewCard from "./preview/LivePreviewCard";

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
    <div className="space-y-6">
      <LinkActionsCard 
        generatedLink={generatedLink}
        customSlug={customSlug}
      />

      {generatedLink && (
        <LivePreviewCard
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
      )}
    </div>
  );
};

export default LinkPreview;

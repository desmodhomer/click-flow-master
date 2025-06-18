
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";
import LinkActionsCard from "@/components/preview/LinkActionsCard";
import MobileMockup from "./MobileMockup";
import EmptyPreviewState from "./EmptyPreviewState";
import LiveUpdateIndicator from "./LiveUpdateIndicator";
import PreviewHeader from "./PreviewHeader";

interface PreviewPanelProps {
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
  customButtons?: CustomButton[];
}

const PreviewPanel = ({ 
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
  customSlug,
  customButtons = []
}: PreviewPanelProps) => {
  const hasContent = title || displayName || generatedLink || customButtons.length > 0;

  return (
    <div className="space-y-6 h-full">
      {/* Actions Card */}
      {generatedLink && (
        <LinkActionsCard 
          generatedLink={generatedLink}
          customSlug={customSlug}
        />
      )}

      {/* Live Preview */}
      <Card className="bg-white shadow-xl border-0 flex-1 flex flex-col">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle>
            <PreviewHeader />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
          {hasContent ? (
            <MobileMockup
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
          ) : (
            <EmptyPreviewState />
          )}
        </CardContent>
      </Card>

      {/* Live Update Indicator */}
      {hasContent && <LiveUpdateIndicator />}
    </div>
  );
};

export default PreviewPanel;

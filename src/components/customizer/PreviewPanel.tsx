import { Card, CardContent } from "@/components/ui/card";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";
import LinkActionsCard from "@/components/preview/LinkActionsCard";
import MobileMockup from "./MobileMockup";
import DesktopMockup from "./DesktopMockup";
import EmptyPreviewState from "./EmptyPreviewState";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor } from "lucide-react";

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
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const hasContent = title || displayName || generatedLink || customButtons.length > 0;

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Actions Card */}
      {generatedLink && <LinkActionsCard generatedLink={generatedLink} customSlug={customSlug} />}

      {/* Preview */}
      <Card className="bg-white shadow-xl border-0 flex-1 flex flex-col relative">
        
        {/* Toggle Controls - Più piccolo e più a destra */}
        <div className="absolute top-2 right-2 z-10">
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <Button 
              size="sm" 
              variant={viewMode === 'mobile' ? 'default' : 'ghost'} 
              onClick={() => setViewMode('mobile')} 
              className="h-6 px-2 text-xs"
            >
              <Smartphone className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'desktop' ? 'default' : 'ghost'} 
              onClick={() => setViewMode('desktop')} 
              className="h-6 px-2 text-xs"
            >
              <Monitor className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <CardContent className="flex-1 p-0">
          {hasContent ? (
            viewMode === 'mobile' ? (
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
              <DesktopMockup 
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
            )
          ) : (
            <EmptyPreviewState />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewPanel;

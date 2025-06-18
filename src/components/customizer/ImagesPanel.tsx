
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";
import ProfileCustomization from "@/components/ProfileCustomization";

interface ImagesPanelProps {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (url: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
}

const ImagesPanel = ({
  profileImageUrl,
  setProfileImageUrl,
  coverImageUrl,
  setCoverImageUrl,
  customBackgroundUrl,
  setCustomBackgroundUrl
}: ImagesPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">Immagini</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          Fase 3
        </Badge>
      </div>

      <ProfileCustomization
        profileImageUrl={profileImageUrl}
        setProfileImageUrl={setProfileImageUrl}
        coverImageUrl={coverImageUrl}
        setCoverImageUrl={setCoverImageUrl}
        customBackgroundUrl={customBackgroundUrl}
        setCustomBackgroundUrl={setCustomBackgroundUrl}
      />
    </div>
  );
};

export default ImagesPanel;

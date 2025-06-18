
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { SocialLink } from "@/types/customLink";
import SocialLinksManager from "@/components/SocialLinksManager";

interface ProfilePanelProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
}

const ProfilePanel = ({
  displayName,
  setDisplayName,
  bio,
  setBio,
  socialLinks,
  setSocialLinks
}: ProfilePanelProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-green-500" />
        <h2 className="text-lg font-semibold text-gray-900">Informazioni Profilo</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          Fase 2
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="display-name" className="text-sm font-medium text-gray-700">
            Nome da Visualizzare
          </Label>
          <Input
            id="display-name"
            placeholder="Il tuo nome o brand"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
            Bio/Biografia
          </Label>
          <Textarea
            id="bio"
            placeholder="Racconta qualcosa di te o del tuo brand..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="mt-1 resize-none"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <SocialLinksManager 
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;

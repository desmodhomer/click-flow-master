
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Link as LinkIcon } from "lucide-react";
import { SocialLink, SOCIAL_PLATFORMS } from "@/types/customLink";
import SocialLinkItem from "./SocialLinkItem";
import AddSocialLinkDialog from "./AddSocialLinkDialog";

interface SocialLinksManagerProps {
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
}

const SocialLinksManager = ({ socialLinks, setSocialLinks }: SocialLinksManagerProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddLink = (newLink: SocialLink) => {
    setSocialLinks([...socialLinks, newLink]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateLink = (index: number, updatedLink: SocialLink) => {
    const newLinks = [...socialLinks];
    newLinks[index] = updatedLink;
    setSocialLinks(newLinks);
  };

  const handleDeleteLink = (index: number) => {
    const newLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(newLinks);
  };

  const moveLink = (fromIndex: number, toIndex: number) => {
    const newLinks = [...socialLinks];
    const [movedItem] = newLinks.splice(fromIndex, 1);
    newLinks.splice(toIndex, 0, movedItem);
    setSocialLinks(newLinks);
  };

  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    platform => !socialLinks.some(link => link.platform === platform.id)
  );

  return (
    <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <LinkIcon className="mr-2 h-5 w-5" />
            Social Links
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
            Fase 3
          </Badge>
        </div>
        <p className="text-gray-300 mt-2">
          Aggiungi i tuoi profili social per una presenza online completa
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {socialLinks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="h-8 w-8 text-white/60" />
            </div>
            <p className="text-gray-300 text-lg mb-2">Nessun social link aggiunto</p>
            <p className="text-gray-400 text-sm mb-6">
              Inizia aggiungendo i tuoi profili social
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <SocialLinkItem
                key={`${link.platform}-${index}`}
                link={link}
                onUpdate={(updatedLink) => handleUpdateLink(index, updatedLink)}
                onDelete={() => handleDeleteLink(index)}
              />
            ))}
          </div>
        )}

        {availablePlatforms.length > 0 && (
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:border-white/50"
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Social Link
          </Button>
        )}

        <AddSocialLinkDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddLink}
          availablePlatforms={availablePlatforms}
        />
      </CardContent>
    </Card>
  );
};

export default SocialLinksManager;


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SocialLink, SOCIAL_PLATFORMS } from "@/types/customLink";

interface AddSocialLinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (link: SocialLink) => void;
  availablePlatforms: typeof SOCIAL_PLATFORMS;
}

const AddSocialLinkDialog = ({ isOpen, onClose, onAdd, availablePlatforms }: AddSocialLinkDialogProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [url, setUrl] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleAdd = () => {
    if (!selectedPlatform || !url.trim()) return;

    const newLink: SocialLink = {
      platform: selectedPlatform as SocialLink['platform'],
      url: url.trim(),
      display_text: displayText.trim() || undefined
    };

    onAdd(newLink);
    
    // Reset form
    setSelectedPlatform("");
    setUrl("");
    setDisplayText("");
  };

  const handleClose = () => {
    setSelectedPlatform("");
    setUrl("");
    setDisplayText("");
    onClose();
  };

  const selectedPlatformData = SOCIAL_PLATFORMS.find(p => p.id === selectedPlatform);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Aggiungi Social Link</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Piattaforma</Label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="bg-white/10 border-white/30 text-white">
                <SelectValue placeholder="Seleziona una piattaforma" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                {availablePlatforms.map((platform) => (
                  <SelectItem 
                    key={platform.id} 
                    value={platform.id}
                    className="text-white hover:bg-white/10"
                  >
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder={selectedPlatformData?.placeholder || "https://esempio.com/profilo"}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display-text">Testo Personalizzato (opzionale)</Label>
            <Input
              id="display-text"
              placeholder="Es: Il mio profilo Instagram"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Annulla
            </Button>
            <Button
              onClick={handleAdd}
              disabled={!selectedPlatform || !url.trim()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Aggiungi Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSocialLinkDialog;

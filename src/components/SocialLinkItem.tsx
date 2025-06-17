
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical, Edit2, Check, X } from "lucide-react";
import { SocialLink, SOCIAL_PLATFORMS } from "@/types/customLink";

interface SocialLinkItemProps {
  link: SocialLink;
  onUpdate: (link: SocialLink) => void;
  onDelete: () => void;
  dragHandleProps?: any;
}

const SocialLinkItem = ({ link, onUpdate, onDelete, dragHandleProps }: SocialLinkItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editUrl, setEditUrl] = useState(link.url);
  const [editDisplayText, setEditDisplayText] = useState(link.display_text || "");

  const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
  
  const handleSave = () => {
    if (!editUrl.trim()) return;
    
    onUpdate({
      ...link,
      url: editUrl,
      display_text: editDisplayText || undefined
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditUrl(link.url);
    setEditDisplayText(link.display_text || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-white/5 rounded-lg border border-white/20 space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white font-medium">{platform?.name}</Label>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              variant="outline"
              className="bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="outline"
              className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Input
            placeholder={platform?.placeholder}
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
          />
          <Input
            placeholder="Testo personalizzato (opzionale)"
            value={editDisplayText}
            onChange={(e) => setEditDisplayText(e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/20 flex items-center justify-between group hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-medium">{platform?.name}</span>
          </div>
          <p className="text-gray-300 text-sm truncate max-w-xs">
            {link.display_text || link.url}
          </p>
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={() => setIsEditing(true)}
          size="sm"
          variant="outline"
          className="bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={onDelete}
          size="sm"
          variant="outline"
          className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SocialLinkItem;

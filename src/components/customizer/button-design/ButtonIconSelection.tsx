
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  GoogleIcon,
  WhatsAppIcon,
  YouTubeIcon,
  PinterestIcon,
  LinkedInIcon,
  SpotifyIcon,
  VimeoIcon,
  DribbbleIcon,
  BehanceIcon,
  StackOverflowIcon,
  SkypeIcon,
  TumblrIcon,
  SnapchatIcon
} from "./SocialPlatformIcons";

interface ButtonIconSelectionProps {
  customButtons: CustomButton[];
  selectedButtonId: string;
  onSelectedButtonChange: (value: string) => void;
  onButtonIconUpdate: (iconId: string | null) => void;
  currentIcon: string | null;
}

const ButtonIconSelection = ({
  customButtons,
  selectedButtonId,
  onSelectedButtonChange,
  onButtonIconUpdate,
  currentIcon
}: ButtonIconSelectionProps) => {
  const socialIcons = [
    { id: 'twitter', name: 'Twitter', icon: TwitterIcon },
    { id: 'facebook', name: 'Facebook', icon: FacebookIcon },
    { id: 'instagram', name: 'Instagram', icon: InstagramIcon },
    { id: 'google', name: 'Google', icon: GoogleIcon },
    { id: 'whatsapp', name: 'WhatsApp', icon: WhatsAppIcon },
    { id: 'youtube', name: 'YouTube', icon: YouTubeIcon },
    { id: 'pinterest', name: 'Pinterest', icon: PinterestIcon },
    { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon },
    { id: 'spotify', name: 'Spotify', icon: SpotifyIcon },
    { id: 'vimeo', name: 'Vimeo', icon: VimeoIcon },
    { id: 'dribbble', name: 'Dribbble', icon: DribbbleIcon },
    { id: 'behance', name: 'Behance', icon: BehanceIcon },
    { id: 'stackoverflow', name: 'Stack Overflow', icon: StackOverflowIcon },
    { id: 'skype', name: 'Skype', icon: SkypeIcon },
    { id: 'tumblr', name: 'Tumblr', icon: TumblrIcon },
    { id: 'snapchat', name: 'Snapchat', icon: SnapchatIcon }
  ];

  const getCurrentIcon = () => {
    if (selectedButtonId === "all") {
      const firstButtonIcon = customButtons[0]?.icon || null;
      const allSameIcon = customButtons.every(btn => btn.icon === firstButtonIcon);
      return allSameIcon ? firstButtonIcon : null;
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.icon || null;
    }
  };

  const selectedIcon = getCurrentIcon();
  const selectedIconData = socialIcons.find(icon => icon.id === selectedIcon);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Scegli Icona</h4>
      
      {/* Current Icon Display */}
      <div className="p-3 bg-gray-50 rounded-lg border">
        <Label className="text-xs text-gray-600 mb-2 block">Icona Attuale</Label>
        <div className="flex items-center justify-between">
          {selectedIcon && selectedIconData ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <selectedIconData.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{selectedIconData.name}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Nessuna icona selezionata</span>
          )}
          
          {selectedIcon && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onButtonIconUpdate(null)}
              className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Icon Selection Grid */}
      <div className="space-y-2">
        <Label className="text-xs text-gray-600">Seleziona Icona Social</Label>
        <div className="grid grid-cols-4 gap-2">
          {socialIcons.map((iconData) => {
            const IconComponent = iconData.icon;
            const isSelected = selectedIcon === iconData.id;
            
            return (
              <Button
                key={iconData.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onButtonIconUpdate(iconData.id)}
                className="h-12 w-full flex flex-col items-center gap-1 p-2"
                title={iconData.name}
              >
                <div className={`w-5 h-5 flex items-center justify-center ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className={`text-xs truncate ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                  {iconData.name.length > 8 ? iconData.name.substring(0, 8) + '...' : iconData.name}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ButtonIconSelection;

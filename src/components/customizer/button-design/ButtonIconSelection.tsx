import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { CustomButton } from "../ConfigurationPanel";
import { TwitterIcon, FacebookIcon, InstagramIcon, GoogleIcon, WhatsAppIcon, YouTubeIcon, PinterestIcon, LinkedInIcon, SpotifyIcon, VimeoIcon, DribbbleIcon, BehanceIcon, StackOverflowIcon, SkypeIcon, TumblrIcon, SnapchatIcon } from "./SocialPlatformIcons";
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
  const socialIcons = [{
    id: 'twitter',
    name: 'Twitter',
    icon: TwitterIcon
  }, {
    id: 'facebook',
    name: 'Facebook',
    icon: FacebookIcon
  }, {
    id: 'instagram',
    name: 'Instagram',
    icon: InstagramIcon
  }, {
    id: 'google',
    name: 'Google',
    icon: GoogleIcon
  }, {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: WhatsAppIcon
  }, {
    id: 'youtube',
    name: 'YouTube',
    icon: YouTubeIcon
  }, {
    id: 'pinterest',
    name: 'Pinterest',
    icon: PinterestIcon
  }, {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInIcon
  }, {
    id: 'spotify',
    name: 'Spotify',
    icon: SpotifyIcon
  }, {
    id: 'vimeo',
    name: 'Vimeo',
    icon: VimeoIcon
  }, {
    id: 'dribbble',
    name: 'Dribbble',
    icon: DribbbleIcon
  }, {
    id: 'behance',
    name: 'Behance',
    icon: BehanceIcon
  }, {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    icon: StackOverflowIcon
  }, {
    id: 'skype',
    name: 'Skype',
    icon: SkypeIcon
  }, {
    id: 'tumblr',
    name: 'Tumblr',
    icon: TumblrIcon
  }, {
    id: 'snapchat',
    name: 'Snapchat',
    icon: SnapchatIcon
  }];
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
  return;
};
export default ButtonIconSelection;
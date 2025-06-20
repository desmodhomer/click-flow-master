
import { SocialLink } from "@/types/customLink";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Linkedin,
  Github,
  Globe,
  Mail,
  MessageCircle,
  Music,
  ExternalLink
} from "lucide-react";

interface PreviewSocialLinksProps {
  socialLinks: SocialLink[];
  backgroundTheme?: string;
}

const PreviewSocialLinks = ({ socialLinks, backgroundTheme = 'gradient-blue' }: PreviewSocialLinksProps) => {
  const getSocialIcon = (platform: string) => {
    const iconMap: Record<string, any> = {
      instagram: Instagram,
      twitter: Twitter,
      facebook: Facebook,
      youtube: Youtube,
      linkedin: Linkedin,
      github: Github,
      website: Globe,
      email: Mail,
      whatsapp: MessageCircle,
      spotify: Music,
      tiktok: Music,
    };
    
    return iconMap[platform.toLowerCase()] || ExternalLink;
  };

  const getSocialName = (platform: string) => {
    const nameMap: Record<string, string> = {
      instagram: 'Instagram',
      twitter: 'Twitter', 
      facebook: 'Facebook',
      youtube: 'YouTube',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      website: 'Sito Web',
      email: 'Email',
      whatsapp: 'WhatsApp',
      spotify: 'Spotify',
      tiktok: 'TikTok',
    };
    
    return nameMap[platform.toLowerCase()] || platform;
  };

  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="px-6 mb-6">
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((link, index) => {
          const IconComponent = getSocialIcon(link.platform);
          return (
            <button
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/30 transition-all duration-200 group flex flex-col items-center gap-2"
            >
              <IconComponent className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" />
              <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                {getSocialName(link.platform)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewSocialLinks;

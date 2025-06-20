
import { ExternalLink } from "lucide-react";
import { SocialLink } from "@/types/customLink";

interface SubdomainSocialLinksProps {
  socialLinks: SocialLink[];
  onSocialClick: (social: SocialLink) => void;
}

const SubdomainSocialLinks = ({ socialLinks, onSocialClick }: SubdomainSocialLinksProps) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mb-3">
      {/* Links più minimalisti - stesso stile di PreviewSocialLinks */}
      <div className="space-y-2">
        {socialLinks.map((social, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            onClick={() => onSocialClick(social)}
          >
            <div className="flex items-center gap-3">
              {/* Icon più piccola */}
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-medium">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              
              {/* Testo semplificato */}
              <div className="flex-1">
                <div className="text-white text-sm font-medium">
                  {social.display_text || social.platform}
                </div>
              </div>
              
              <ExternalLink className="h-3 w-3 text-white/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubdomainSocialLinks;

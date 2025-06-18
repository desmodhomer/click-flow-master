
import { Button } from "@/components/ui/button";
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
    <div className="space-y-3">
      {socialLinks.map((social, index) => (
        <Button
          key={index}
          onClick={() => onSocialClick(social)}
          variant="outline"
          className="w-full h-16 bg-white/95 backdrop-blur-sm border border-gray-200/50 hover:bg-gray-50 transition-all duration-300 group rounded-2xl shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800 text-sm">
                  {social.display_text || social.platform}
                </div>
                <div className="text-xs text-gray-500">
                  {social.platform}
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SubdomainSocialLinks;

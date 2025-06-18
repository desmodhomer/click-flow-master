
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
    <div className="space-y-2">
      {socialLinks.map((social, index) => (
        <Button
          key={index}
          onClick={() => onSocialClick(social)}
          variant="outline"
          className="w-full h-12 bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:bg-gray-50 transition-all duration-200 group rounded-xl shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-800 text-sm">
                  {social.display_text || social.platform}
                </div>
                <div className="text-xs text-gray-500">
                  {social.platform}
                </div>
              </div>
            </div>
            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SubdomainSocialLinks;

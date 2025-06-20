
import { ExternalLink } from "lucide-react";
import { SocialLink } from "@/types/customLink";

interface PreviewSocialLinksProps {
  socialLinks: SocialLink[];
}

const PreviewSocialLinks = ({ socialLinks }: PreviewSocialLinksProps) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mb-6">
      {/* Links più minimalisti - stesso stile di SubdomainSocialLinks */}
      <div className="space-y-3">
        {socialLinks.map((social, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Icon più piccola */}
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              
              {/* Testo semplificato */}
              <div className="flex-1">
                <div className="text-white text-base font-medium">
                  {social.display_text || social.platform}
                </div>
                {social.url && (
                  <div className="text-white/60 text-sm truncate">
                    {social.url}
                  </div>
                )}
              </div>
              
              <ExternalLink className="h-4 w-4 text-white/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSocialLinks;

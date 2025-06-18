
import { ExternalLink, Globe } from "lucide-react";
import { SocialLink } from "@/types/customLink";

interface PreviewSocialLinksProps {
  socialLinks: SocialLink[];
}

const PreviewSocialLinks = ({ socialLinks }: PreviewSocialLinksProps) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mb-4">
      {/* Header più compatto senza sfondo */}
      <h3 className="text-sm font-semibold text-white/90 mb-3 text-center flex items-center justify-center gap-2">
        <Globe className="h-4 w-4" />
        Social Links
      </h3>
      
      {/* Links più compatti e moderni */}
      <div className="space-y-2">
        {socialLinks.map((social, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              {/* Icon più piccola e colorata */}
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              
              {/* Testo più pulito */}
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">
                  {social.display_text || social.platform}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  Tocca per visitare
                </div>
              </div>
              
              {/* Arrow icon più piccola */}
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSocialLinks;

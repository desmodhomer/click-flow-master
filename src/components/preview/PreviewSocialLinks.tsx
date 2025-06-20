
import { ExternalLink } from "lucide-react";
import { SocialLink } from "@/types/customLink";

interface PreviewSocialLinksProps {
  socialLinks: SocialLink[];
  backgroundTheme?: string;
}

const PreviewSocialLinks = ({ socialLinks, backgroundTheme = 'gradient-blue' }: PreviewSocialLinksProps) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  const isLightBackground = backgroundTheme === 'white-solid' || backgroundTheme === 'minimal';

  return (
    <div className="mb-6">
      {/* Links con dimensioni realistiche */}
      <div className="space-y-4">
        {socialLinks.map((social, index) => (
          <div
            key={index}
            className={`${isLightBackground 
              ? 'bg-gray-100 border-gray-200' 
              : 'bg-white/10 backdrop-blur-sm border-white/20'
            } rounded-xl p-5 border hover:${isLightBackground ? 'bg-gray-200' : 'bg-white/20'} transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-center gap-4">
              {/* Icon con dimensioni realistiche */}
              <div className={`w-12 h-12 ${isLightBackground 
                ? 'bg-gray-200' 
                : 'bg-white/20'
              } rounded-lg flex items-center justify-center ${isLightBackground 
                ? 'text-gray-700' 
                : 'text-white'
              } text-lg font-medium`}>
                {social.platform.charAt(0).toUpperCase()}
              </div>
              
              {/* Testo con dimensioni realistiche */}
              <div className="flex-1">
                <div className={`${isLightBackground 
                  ? 'text-gray-900' 
                  : 'text-white'
                } text-lg font-medium`}>
                  {social.display_text || social.platform}
                </div>
                {social.url && (
                  <div className={`${isLightBackground 
                    ? 'text-gray-500' 
                    : 'text-white/60'
                  } text-sm truncate mt-1`}>
                    {social.url}
                  </div>
                )}
              </div>
              
              <ExternalLink className={`h-5 w-5 ${isLightBackground 
                ? 'text-gray-400' 
                : 'text-white/60'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSocialLinks;


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
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
        <Globe className="h-6 w-6 text-blue-600" />
        I miei social
      </h3>
      <div className="grid gap-4">
        {socialLinks.map((social, index) => (
          <div
            key={index}
            className="h-16 justify-start bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200/50 transition-all duration-300 rounded-lg p-4"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-800 text-lg">
                  {social.display_text || social.platform}
                </div>
                <div className="text-sm text-gray-500">
                  Clicca per visitare il mio {social.platform}
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSocialLinks;

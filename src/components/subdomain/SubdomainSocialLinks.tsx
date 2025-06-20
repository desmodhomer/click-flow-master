
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe } from "lucide-react";
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
    <div className="bg-white/96 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20 w-full">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-10 text-center flex items-center justify-center gap-3 sm:gap-4">
        <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
        I miei social
      </h3>
      <div className="grid gap-4 sm:gap-6 w-full">
        {socialLinks.map((social, index) => (
          <Button
            key={index}
            onClick={() => onSocialClick(social)}
            variant="outline"
            size="lg"
            className="h-16 sm:h-20 justify-start bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-100 hover:to-purple-100 border-2 border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 group hover:scale-105 hover:shadow-xl rounded-2xl w-full"
          >
            <div className="flex items-center gap-3 sm:gap-5 w-full min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold group-hover:scale-110 transition-transform shadow-lg flex-shrink-0">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-bold text-gray-800 text-lg sm:text-xl truncate">
                  {social.display_text || social.platform}
                </div>
                <div className="text-sm text-gray-500 mt-1 truncate">
                  Clicca per visitare il mio {social.platform}
                </div>
              </div>
              <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubdomainSocialLinks;

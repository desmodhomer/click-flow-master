
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
    <div className="bg-white/96 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
      <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center gap-4">
        <Globe className="h-8 w-8 text-blue-600" />
        I miei social
      </h3>
      <div className="grid gap-6">
        {socialLinks.map((social, index) => (
          <Button
            key={index}
            onClick={() => onSocialClick(social)}
            variant="outline"
            size="lg"
            className="h-20 justify-start bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-100 hover:to-purple-100 border-2 border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 group hover:scale-105 hover:shadow-xl rounded-2xl"
          >
            <div className="flex items-center gap-5 w-full">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform shadow-lg">
                {social.platform.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-gray-800 text-xl">
                  {social.display_text || social.platform}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Clicca per visitare il mio {social.platform}
                </div>
              </div>
              <ExternalLink className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubdomainSocialLinks;

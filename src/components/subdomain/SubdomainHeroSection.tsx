
import { Heart } from "lucide-react";
import { CustomLink } from "./SubdomainLoader";

interface SubdomainHeroSectionProps {
  link: CustomLink;
}

const SubdomainHeroSection = ({ link }: SubdomainHeroSectionProps) => {
  return (
    <div className="relative py-8 px-4">
      {/* Hero Content centrato e minimalista - stesso stile di PreviewHeroSection */}
      <div className="text-center text-white max-w-sm mx-auto">
        {/* Profile Image più elegante */}
        {link.profile_image_url && (
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-white/30 overflow-hidden">
              <img 
                src={link.profile_image_url} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Display Name */}
        {link.display_name && (
          <h1 className="text-xl font-semibold mb-2 text-white">
            {link.display_name}
          </h1>
        )}
        
        {/* Title più sottile */}
        <h2 className="text-sm font-medium mb-3 text-white/80">
          {link.title || "Link Personalizzato"}
        </h2>
        
        {/* Bio compatta */}
        {link.bio && (
          <p className="text-xs text-white/70 max-w-xs mx-auto mb-2">
            {link.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubdomainHeroSection;


import { Heart } from "lucide-react";
import { CustomLink } from "./SubdomainLoader";

interface SubdomainHeroSectionProps {
  link: CustomLink;
}

const SubdomainHeroSection = ({ link }: SubdomainHeroSectionProps) => {
  return (
    <div className="relative">
      {/* Cover Image Overlay */}
      {link.cover_image_url && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${link.cover_image_url})` }}
        />
      )}
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
      
      {/* Hero Content - More Compact */}
      <div className="relative z-10 px-4 py-12 text-center text-white">
        {/* Profile Image - Smaller */}
        {link.profile_image_url && (
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src={link.profile_image_url} 
                alt="Profile" 
                className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {/* Name and Title - Smaller */}
        {link.display_name && (
          <h1 className="text-xl font-bold mb-2 drop-shadow-lg">
            {link.display_name}
          </h1>
        )}
        
        <h2 className="text-base font-medium mb-3 text-gray-200 drop-shadow">
          {link.title || "Link Personalizzato"}
        </h2>
        
        {/* Bio - Smaller */}
        {link.bio && (
          <p className="text-sm text-gray-300 max-w-xs mx-auto leading-relaxed mb-3 drop-shadow">
            {link.bio}
          </p>
        )}
        
        {/* Description - Smaller */}
        {link.description && (
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed drop-shadow">
            {link.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubdomainHeroSection;

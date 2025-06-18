
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 px-4 py-16 text-center text-white">
        {/* Profile Image */}
        {link.profile_image_url && (
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={link.profile_image_url} 
                alt="Profile" 
                className="w-28 h-28 rounded-full border-3 border-white object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {/* Name and Title */}
        {link.display_name && (
          <h1 className="text-2xl font-bold mb-2 drop-shadow-lg">
            {link.display_name}
          </h1>
        )}
        
        <h2 className="text-lg font-medium mb-4 text-gray-200 drop-shadow">
          {link.title || "Link Personalizzato"}
        </h2>
        
        {/* Bio */}
        {link.bio && (
          <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed mb-4 drop-shadow">
            {link.bio}
          </p>
        )}
        
        {/* Description */}
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

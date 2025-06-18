
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
      
      {/* Hero Content */}
      <div className="relative z-10 px-6 py-24 text-center text-white">
        {/* Profile Image */}
        {link.profile_image_url && (
          <div className="flex justify-center mb-10">
            <div className="relative">
              <img 
                src={link.profile_image_url} 
                alt="Profile" 
                className="w-44 h-44 rounded-full border-4 border-white/90 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-xl">
                <Heart className="h-7 w-7 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {/* Name and Title */}
        {link.display_name && (
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 drop-shadow-2xl">
            {link.display_name}
          </h1>
        )}
        
        <h2 className="text-3xl sm:text-5xl font-semibold mb-10 text-blue-100 drop-shadow-xl">
          {link.title || "Link Personalizzato"}
        </h2>
        
        {/* Bio */}
        {link.bio && (
          <p className="text-xl sm:text-3xl text-blue-50 max-w-4xl mx-auto leading-relaxed mb-12 drop-shadow-lg font-light">
            {link.bio}
          </p>
        )}
        
        {/* Description */}
        {link.description && (
          <p className="text-lg sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {link.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubdomainHeroSection;

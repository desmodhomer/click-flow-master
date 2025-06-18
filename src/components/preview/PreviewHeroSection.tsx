
import { Heart } from "lucide-react";

interface PreviewHeroSectionProps {
  profileImageUrl?: string;
  displayName?: string;
  title: string;
  bio?: string;
  description: string;
  coverImageUrl?: string;
  collapsed?: boolean;
}

const PreviewHeroSection = ({
  profileImageUrl,
  displayName,
  title,
  bio,
  description,
  coverImageUrl,
  collapsed = false
}: PreviewHeroSectionProps) => {
  return (
    <div className="relative">
      {/* Cover Image Overlay */}
      {coverImageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 px-6 py-16 text-center text-white">
        {/* Profile Image */}
        {profileImageUrl && (
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={profileImageUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white/80 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {/* Name and Title */}
        {displayName && (
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
            {displayName}
          </h1>
        )}
        
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-blue-100 drop-shadow">
          {title || "Link Personalizzato"}
        </h2>
        
        {/* Bio */}
        {bio && (
          <p className="text-lg sm:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow">
            {bio}
          </p>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed drop-shadow">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewHeroSection;

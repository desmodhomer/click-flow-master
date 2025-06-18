
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
    <div className="relative py-12 px-6">
      {/* Cover Image Overlay - più sottile */}
      {coverImageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        />
      )}
      
      {/* Gradient Overlay più delicato */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
      
      {/* Hero Content centrato e più compatto */}
      <div className="relative z-10 text-center text-white max-w-sm mx-auto">
        {/* Profile Image più grande con bordo colorato */}
        {profileImageUrl && (
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                <img 
                  src={profileImageUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {/* Display Name più prominente */}
        {displayName && (
          <h1 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
            {displayName}
          </h1>
        )}
        
        {/* Title più piccolo e elegante */}
        <h2 className="text-lg font-medium mb-4 text-white/90 drop-shadow">
          {title || "Link Personalizzato"}
        </h2>
        
        {/* Bio compatta */}
        {bio && (
          <p className="text-sm text-white/80 max-w-xs mx-auto leading-relaxed mb-4 drop-shadow">
            {bio}
          </p>
        )}
        
        {/* Description più piccola */}
        {description && (
          <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed drop-shadow">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewHeroSection;

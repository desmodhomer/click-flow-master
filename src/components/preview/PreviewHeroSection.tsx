
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
    <div className="relative py-8 px-4">
      {/* Hero Content centrato e minimalista */}
      <div className="text-center text-white max-w-sm mx-auto">
        {/* Profile Image più elegante */}
        {profileImageUrl && (
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-white/30 overflow-hidden">
              <img 
                src={profileImageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Display Name */}
        {displayName && (
          <h1 className="text-xl font-semibold mb-2 text-white">
            {displayName}
          </h1>
        )}
        
        {/* Title più sottile */}
        <h2 className="text-sm font-medium mb-3 text-white/80">
          {title || "Link Personalizzato"}
        </h2>
        
        {/* Bio compatta */}
        {bio && (
          <p className="text-xs text-white/70 max-w-xs mx-auto mb-2">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewHeroSection;


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
    <div className={`relative text-center text-white max-w-sm mx-auto ${collapsed ? 'py-2' : 'py-8'}`}>
      
      {/* Profile Image più compatta se collapsed */}
      {profileImageUrl && (
        <div className={`flex justify-center ${collapsed ? 'mb-3' : 'mb-6'}`}>
          <div className={`${collapsed ? 'w-16 h-16' : 'w-20 h-20'} rounded-full border-2 border-white/30 overflow-hidden`}>
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
        <h1 className={`${collapsed ? 'text-lg' : 'text-xl'} font-semibold ${collapsed ? 'mb-1' : 'mb-2'} text-white`}>
          {displayName}
        </h1>
      )}
      
      {/* Title più compatto se collapsed */}
      <h2 className={`${collapsed ? 'text-xs' : 'text-sm'} font-medium ${collapsed ? 'mb-2' : 'mb-3'} text-white/80`}>
        {title || "Link Personalizzato"}
      </h2>
      
      {/* Bio compatta */}
      {bio && (
        <p className={`${collapsed ? 'text-xs' : 'text-xs'} text-white/70 max-w-xs mx-auto ${collapsed ? 'mb-1' : 'mb-2'}`}>
          {bio}
        </p>
      )}
    </div>
  );
};

export default PreviewHeroSection;

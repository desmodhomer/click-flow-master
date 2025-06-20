
import { Heart } from "lucide-react";

interface PreviewHeroSectionProps {
  profileImageUrl?: string;
  displayName?: string;
  title: string;
  bio?: string;
  description: string;
  coverImageUrl?: string;
  collapsed?: boolean;
  backgroundTheme?: string;
}

const PreviewHeroSection = ({
  profileImageUrl,
  displayName,
  title,
  bio,
  description,
  coverImageUrl,
  collapsed = false,
  backgroundTheme = 'gradient-blue'
}: PreviewHeroSectionProps) => {
  // Determine if we need light text based on background
  const isDarkBackground = backgroundTheme === 'dark' || backgroundTheme === 'dark-solid' || backgroundTheme.includes('dark');
  const isLightBackground = backgroundTheme === 'white-solid' || backgroundTheme === 'minimal';
  
  const textColorClass = isLightBackground ? 'text-gray-900' : 'text-white';
  const subtitleColorClass = isLightBackground ? 'text-gray-600' : 'text-white/80';
  const bioColorClass = isLightBackground ? 'text-gray-500' : 'text-white/70';

  return (
    <div className={`relative text-center max-w-sm mx-auto ${collapsed ? 'py-1' : 'py-8'}`}>
      
      {/* Profile Image ultra compatta se collapsed */}
      {profileImageUrl && (
        <div className={`flex justify-center ${collapsed ? 'mb-2' : 'mb-6'}`}>
          <div className={`${collapsed ? 'w-12 h-12' : 'w-20 h-20'} rounded-full border-2 ${isLightBackground ? 'border-gray-200' : 'border-white/30'} overflow-hidden`}>
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
        <h1 className={`${collapsed ? 'text-sm' : 'text-xl'} font-semibold ${collapsed ? 'mb-1' : 'mb-2'} ${textColorClass}`}>
          {displayName}
        </h1>
      )}
      
      {/* Title ultra compatto se collapsed */}
      <h2 className={`${collapsed ? 'text-xs' : 'text-sm'} font-medium ${collapsed ? 'mb-1' : 'mb-3'} ${subtitleColorClass}`}>
        {title || "Link Personalizzato"}
      </h2>
      
      {/* Bio ultra compatta */}
      {bio && (
        <p className={`${collapsed ? 'text-xs' : 'text-xs'} ${bioColorClass} max-w-xs mx-auto ${collapsed ? 'mb-1' : 'mb-2'}`}>
          {bio}
        </p>
      )}
    </div>
  );
};

export default PreviewHeroSection;

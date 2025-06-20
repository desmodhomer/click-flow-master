
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
    <div className={`relative text-center max-w-sm mx-auto ${collapsed ? 'py-1' : 'py-4'}`}>
      
      {/* Profile Image - Dimensioni ridotte ulteriormente */}
      {profileImageUrl && (
        <div className={`flex justify-center ${collapsed ? 'mb-1.5' : 'mb-2'}`}>
          <div className={`${collapsed ? 'w-8 h-8' : 'w-12 h-12'} rounded-full border-2 ${isLightBackground ? 'border-gray-200' : 'border-white/30'} overflow-hidden`}>
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      {/* Display Name - Testo più piccolo */}
      {displayName && (
        <h1 className={`${collapsed ? 'text-xs' : 'text-sm'} font-semibold ${collapsed ? 'mb-0.5' : 'mb-1'} ${textColorClass}`}>
          {displayName}
        </h1>
      )}
      
      {/* Title - Testo più piccolo */}
      <h2 className={`${collapsed ? 'text-[10px]' : 'text-xs'} font-medium ${collapsed ? 'mb-1' : 'mb-1.5'} ${subtitleColorClass}`}>
        {title || "Link Personalizzato"}
      </h2>
      
      {/* Bio - Testo ancora più piccolo */}
      {bio && (
        <p className={`${collapsed ? 'text-[8px]' : 'text-[10px]'} ${bioColorClass} max-w-xs mx-auto ${collapsed ? 'mb-0.5' : 'mb-1'}`}>
          {bio}
        </p>
      )}
    </div>
  );
};

export default PreviewHeroSection;

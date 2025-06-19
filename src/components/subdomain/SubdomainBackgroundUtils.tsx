
import { CustomLink } from "./SubdomainLoader";

export const getBackgroundStyle = (link: CustomLink | null) => {
  if (!link) return {};
  
  if (link.custom_background_url) {
    return {
      backgroundImage: `url(${link.custom_background_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }
  
  // Handle custom colors
  if (link.background_theme.startsWith('custom-')) {
    const customColor = link.background_theme.replace('custom-', '');
    return {
      backgroundColor: customColor
    };
  }
  
  const themeStyles: Record<string, string> = {
    'gradient-blue': 'from-blue-400 via-blue-600 to-purple-600',
    'gradient-purple': 'from-purple-400 via-pink-500 to-red-500',
    'gradient-green': 'from-green-400 via-teal-500 to-blue-500',
    'gradient-orange': 'from-yellow-400 via-orange-500 to-red-500',
    'dark': 'from-gray-800 via-gray-900 to-black',
    'minimal': 'from-gray-50 via-white to-gray-100'
  };
  
  return { 
    className: `bg-gradient-to-br ${themeStyles[link.background_theme] || themeStyles['gradient-blue']}` 
  };
};

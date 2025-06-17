
export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'website' | 'facebook';
  url: string;
  display_text?: string;
}

export interface CustomLinkProfile {
  id: string;
  slug: string;
  destination_url: string;
  title: string | null;
  description: string | null;
  display_name: string | null;
  bio: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  background_theme: string;
  custom_background_url: string | null;
  social_links: SocialLink[];
  click_count: number;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BackgroundTheme {
  id: string;
  name: string;
  class: string;
  preview: string;
}

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'gradient-blue',
    name: 'Gradiente Blu',
    class: 'bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600',
    preview: 'linear-gradient(to bottom right, #60a5fa, #2563eb, #9333ea)'
  },
  {
    id: 'gradient-purple',
    name: 'Gradiente Viola',
    class: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    preview: 'linear-gradient(to bottom right, #a855f7, #ec4899, #ef4444)'
  },
  {
    id: 'gradient-green',
    name: 'Gradiente Verde',
    class: 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
    preview: 'linear-gradient(to bottom right, #4ade80, #14b8a6, #3b82f6)'
  },
  {
    id: 'gradient-orange',
    name: 'Gradiente Arancione',
    class: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
    preview: 'linear-gradient(to bottom right, #facc15, #f97316, #ef4444)'
  },
  {
    id: 'dark-solid',
    name: 'Nero Solido',
    class: 'bg-gray-900',
    preview: '#111827'
  },
  {
    id: 'white-solid',
    name: 'Bianco Solido',
    class: 'bg-white',
    preview: '#ffffff'
  }
];

export const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', placeholder: 'https://instagram.com/username' },
  { id: 'twitter', name: 'Twitter/X', icon: 'Twitter', placeholder: 'https://twitter.com/username' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', placeholder: 'https://linkedin.com/in/username' },
  { id: 'youtube', name: 'YouTube', icon: 'Youtube', placeholder: 'https://youtube.com/@username' },
  { id: 'tiktok', name: 'TikTok', icon: 'Music', placeholder: 'https://tiktok.com/@username' },
  { id: 'facebook', name: 'Facebook', icon: 'Facebook', placeholder: 'https://facebook.com/username' },
  { id: 'website', name: 'Website', icon: 'Globe', placeholder: 'https://tuosito.com' }
];

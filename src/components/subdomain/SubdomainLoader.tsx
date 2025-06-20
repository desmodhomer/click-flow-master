
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

interface CustomLink {
  id: string;
  slug: string;
  destination_url: string;
  title: string | null;
  description: string | null;
  display_name: string | null;
  bio: string | null;
  background_theme: string;
  profile_image_url: string | null;
  cover_image_url: string | null;
  custom_background_url: string | null;
  social_links: SocialLink[] | null;
  custom_buttons: CustomButton[] | null;
  click_count: number;
}

interface SubdomainLoaderProps {
  onLinkLoaded: (link: CustomLink | null) => void;
  onNotFound: () => void;
  onLoading: (loading: boolean) => void;
}

const SubdomainLoader = ({ onLinkLoaded, onNotFound, onLoading }: SubdomainLoaderProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Evita chiamate multiple
    if (hasLoaded) return;

    const loadLinkData = async () => {
      console.log('SubdomainLoader: Starting to load link data');
      onLoading(true);
      
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      
      console.log('SubdomainLoader: Hostname parts:', parts);
      
      // Verifica se è un sottodominio valido
      if (parts.length === 3 && parts[1] === 'lnkfire' && parts[2] === 'dev') {
        const slug = parts[0];
        console.log('SubdomainLoader: Loading slug:', slug);
        
        try {
          const { data, error } = await supabase
            .from('custom_links')
            .select('*')
            .eq('slug', slug)
            .single();

          if (error) {
            console.error('SubdomainLoader: Database error:', error);
            onNotFound();
          } else if (!data) {
            console.log('SubdomainLoader: No data found for slug:', slug);
            onNotFound();
          } else {
            console.log('SubdomainLoader: Link data loaded successfully:', data);
            const typedData: CustomLink = {
              ...data,
              social_links: Array.isArray(data.social_links) ? (data.social_links as unknown as SocialLink[]) : null,
              custom_buttons: Array.isArray(data.custom_buttons) ? (data.custom_buttons as unknown as CustomButton[]) : null
            };
            onLinkLoaded(typedData);
          }
        } catch (error) {
          console.error('SubdomainLoader: Error loading link:', error);
          onNotFound();
        }
      } else {
        console.log('SubdomainLoader: Invalid subdomain format');
        onNotFound();
      }
      
      onLoading(false);
      setHasLoaded(true);
    };

    loadLinkData();
  }, [onLinkLoaded, onNotFound, onLoading, hasLoaded]);

  return null;
};

export default SubdomainLoader;
export type { CustomLink };

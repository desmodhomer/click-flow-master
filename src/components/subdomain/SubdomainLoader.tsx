
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialLink } from "@/types/customLink";

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
  click_count: number;
}

interface SubdomainLoaderProps {
  onLinkLoaded: (link: CustomLink | null) => void;
  onNotFound: () => void;
  onLoading: (loading: boolean) => void;
}

const SubdomainLoader = ({ onLinkLoaded, onNotFound, onLoading }: SubdomainLoaderProps) => {
  useEffect(() => {
    const loadLinkData = async () => {
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      
      if (parts.length === 3 && parts[1] === 'lnkfire' && parts[2] === 'dev') {
        const slug = parts[0];
        
        try {
          const { data, error } = await supabase
            .from('custom_links')
            .select('*')
            .eq('slug', slug)
            .single();

          if (error || !data) {
            onNotFound();
          } else {
            const typedData: CustomLink = {
              ...data,
              social_links: Array.isArray(data.social_links) ? (data.social_links as unknown as SocialLink[]) : null
            };
            onLinkLoaded(typedData);
          }
        } catch (error) {
          console.error('Error loading link:', error);
          onNotFound();
        }
      } else {
        onNotFound();
      }
      
      onLoading(false);
    };

    loadLinkData();
  }, [onLinkLoaded, onNotFound, onLoading]);

  return null;
};

export default SubdomainLoader;
export type { CustomLink };

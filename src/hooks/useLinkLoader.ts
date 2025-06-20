
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

interface LinkData {
  customSlug: string;
  title: string;
  description: string;
  displayName: string;
  bio: string;
  backgroundTheme: string;
  profileImageUrl: string;
  coverImageUrl: string;
  customBackgroundUrl: string;
  socialLinks: SocialLink[];
  customButtons: CustomButton[];
}

export const useLinkLoader = (linkId: string | null) => {
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadLink = async (id: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('custom_links')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading link:', error);
        toast({
          title: "Errore",
          description: "Errore nel caricamento del link",
          variant: "destructive",
        });
        return null;
      }

      if (data) {
        const loadedData: LinkData = {
          customSlug: data.slug || '',
          title: data.title || '',
          description: data.description || '',
          displayName: data.display_name || '',
          bio: data.bio || '',
          backgroundTheme: data.background_theme || 'gradient-blue',
          profileImageUrl: data.profile_image_url || '',
          coverImageUrl: data.cover_image_url || '',
          customBackgroundUrl: data.custom_background_url || '',
          socialLinks: Array.isArray(data.social_links) ? data.social_links as SocialLink[] : [],
          customButtons: Array.isArray(data.custom_buttons) ? data.custom_buttons as CustomButton[] : [],
        };

        setLinkData(loadedData);
        return loadedData;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento del link",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }

    return null;
  };

  useEffect(() => {
    if (linkId) {
      loadLink(linkId);
    }
  }, [linkId]);

  return {
    linkData,
    loading,
    loadLink,
  };
};

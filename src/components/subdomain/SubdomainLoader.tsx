
import { useEffect, useState, useRef } from "react";
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
    console.log('🚀 SubdomainLoader: useEffect triggered - hasLoaded:', hasLoaded);
    
    // Previeni esecuzioni multiple
    if (hasLoaded) {
      console.log('🔄 SubdomainLoader: Already loaded, skipping');
      return;
    }
    
    const loadLinkData = async () => {
      console.log('🎯 SubdomainLoader: Starting to load link data');
      setHasLoaded(true);
      onLoading(true);
      
      try {
        const hostname = window.location.hostname;
        console.log('🌐 SubdomainLoader: Full hostname:', hostname);
        
        let slug: string | null = null;
        
        // Estrai lo slug dal sottodominio
        if (hostname.endsWith('.lnkfire.dev')) {
          const parts = hostname.split('.');
          console.log('🔧 SubdomainLoader: Hostname parts:', parts);
          
          if (parts.length >= 3 && parts[0] !== 'www') {
            slug = parts[0];
          }
        } else {
          // Per ambiente di sviluppo
          const parts = hostname.split('.');
          if (parts.length >= 2 && parts[0] !== 'www') {
            slug = parts[0];
          }
        }
        
        console.log('✅ SubdomainLoader: Final extracted slug:', slug);
        
        if (!slug) {
          console.log('❌ SubdomainLoader: No valid slug found, calling onNotFound');
          onNotFound();
          return;
        }
        
        console.log('🔍 SubdomainLoader: About to query database for slug:', slug);
        
        // Query principale
        const { data, error } = await supabase
          .from('custom_links')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        console.log('📡 SubdomainLoader: Database query completed');
        console.log('📦 SubdomainLoader: Query result - data:', data);
        console.log('⚠️ SubdomainLoader: Query result - error:', error);

        if (error) {
          console.error('💥 SubdomainLoader: Database error:', error);
          onNotFound();
          return;
        }

        if (!data) {
          console.log('🚫 SubdomainLoader: No data found for slug:', slug);
          
          // Query per debug: vediamo tutti i record disponibili
          console.log('🔍 SubdomainLoader: Debugging - checking all available slugs...');
          const { data: allSlugs, error: debugError } = await supabase
            .from('custom_links')
            .select('slug, id, title')
            .limit(10);
          
          console.log('🔍 SubdomainLoader: Available slugs in database:', allSlugs);
          if (debugError) {
            console.log('🔍 SubdomainLoader: Debug query error:', debugError);
          }
          
          onNotFound();
          return;
        }

        console.log('🎉 SubdomainLoader: Link data loaded successfully:', data);
        const typedData: CustomLink = {
          ...data,
          social_links: Array.isArray(data.social_links) ? (data.social_links as unknown as SocialLink[]) : null,
          custom_buttons: Array.isArray(data.custom_buttons) ? (data.custom_buttons as unknown as CustomButton[]) : null
        };
        
        console.log('📤 SubdomainLoader: About to call onLinkLoaded with:', typedData);
        onLinkLoaded(typedData);
      } catch (error) {
        console.error('💥 SubdomainLoader: Unexpected error loading link:', error);
        onNotFound();
      } finally {
        console.log('🧹 SubdomainLoader: Cleaning up - setting loading to false');
        onLoading(false);
      }
    };

    // Esegui con un piccolo delay per assicurarci che tutto sia inizializzato
    const timer = setTimeout(() => {
      loadLinkData();
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Nessuna dipendenza per evitare re-esecuzioni

  // Log per verificare che il componente si monti
  useEffect(() => {
    console.log('🎬 SubdomainLoader: Component mounted');
    return () => {
      console.log('🎬 SubdomainLoader: Component unmounting');
    };
  }, []);

  return null;
};

export default SubdomainLoader;
export type { CustomLink };

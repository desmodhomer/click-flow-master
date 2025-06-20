
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
  const hasExecuted = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Previeni esecuzioni multiple
    if (hasExecuted.current || isProcessing) {
      console.log('🔄 SubdomainLoader: Preventing duplicate execution');
      return;
    }
    
    const loadLinkData = async () => {
      console.log('🎯 SubdomainLoader: Starting to load link data');
      hasExecuted.current = true;
      setIsProcessing(true);
      onLoading(true);
      
      try {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        
        console.log('🌐 SubdomainLoader: Full hostname:', hostname);
        console.log('🔧 SubdomainLoader: Hostname parts:', parts);
        console.log('📊 SubdomainLoader: Parts length:', parts.length);
        
        let slug: string | null = null;
        
        // Logica migliorata per riconoscere il sottodominio
        if (parts.length >= 2) {
          // Se siamo su un sottodominio, prendi sempre la prima parte
          const potentialSlug = parts[0];
          console.log('🏷️ SubdomainLoader: Potential slug:', potentialSlug);
          
          // Verifica che non sia www o altri prefissi comuni
          if (potentialSlug !== 'www' && potentialSlug !== 'api' && potentialSlug !== 'admin') {
            slug = potentialSlug;
          }
        }
        
        console.log('✅ SubdomainLoader: Final extracted slug:', slug);
        
        if (!slug) {
          console.log('❌ SubdomainLoader: No valid slug found, calling onNotFound');
          onNotFound();
          return;
        }
        
        console.log('🔍 SubdomainLoader: About to query database for slug:', slug);
        
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
          console.log('🚫 SubdomainLoader: No data found for slug:', slug, '- calling onNotFound');
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
        console.error('💥 SubdomainLoader: Error loading link:', error);
        onNotFound();
      } finally {
        console.log('🧹 SubdomainLoader: Cleaning up - setting loading to false');
        onLoading(false);
        setIsProcessing(false);
      }
    };

    loadLinkData();
  }, []); // Dipendenze vuote per eseguire solo una volta

  return null;
};

export default SubdomainLoader;
export type { CustomLink };

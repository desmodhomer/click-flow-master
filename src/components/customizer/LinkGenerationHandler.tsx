
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";

interface LinkGenerationHandlerProps {
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
  onLinkGenerated: (link: string) => void;
  setIsGenerating: (generating: boolean) => void;
}

export const useLinkGeneration = ({
  customSlug,
  title,
  description,
  displayName,
  bio,
  backgroundTheme,
  profileImageUrl,
  coverImageUrl,
  customBackgroundUrl,
  socialLinks,
  customButtons,
  onLinkGenerated,
  setIsGenerating,
}: LinkGenerationHandlerProps) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const generateSlug = () => {
    return customSlug || `link-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  };

  const handleGenerate = async () => {
    if (customButtons.length === 0) {
      toast({
        title: "Errore",
        description: "Aggiungi almeno un pulsante prima di generare il link",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const slug = generateSlug();
      
      // Check if slug already exists
      const { data: existingLink } = await supabase
        .from('custom_links')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingLink) {
        toast({
          title: "Errore",
          description: "Questo slug è già in uso. Prova con un nome diverso.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // Insert new custom link with custom buttons
      const { data, error } = await supabase
        .from('custom_links')
        .insert({
          slug,
          destination_url: customButtons[0]?.url || '', // Keep for compatibility
          title: title || "Link Personalizzato",
          description: description || null,
          display_name: displayName || null,
          bio: bio || null,
          background_theme: backgroundTheme,
          profile_image_url: profileImageUrl || null,
          cover_image_url: coverImageUrl || null,
          custom_background_url: customBackgroundUrl || null,
          social_links: socialLinks as any,
          custom_buttons: customButtons as any,
          user_id: user?.id || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating link:', error);
        toast({
          title: "Errore",
          description: "Errore durante la creazione del link",
          variant: "destructive",
        });
        return;
      }

      const generated = `https://${slug}.lnkfire.dev`;
      onLinkGenerated(generated);
      
      toast({
        title: "Link generato!",
        description: "Il tuo link personalizzato è pronto",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore durante la creazione del link",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return { handleGenerate };
};

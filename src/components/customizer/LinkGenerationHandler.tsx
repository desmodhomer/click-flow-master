
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./ConfigurationPanel";

interface LinkGenerationParams {
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
  editLinkId?: string | null; // Aggiungo il parametro per l'editing
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
  editLinkId
}: LinkGenerationParams) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!customSlug.trim()) {
      toast({
        title: "Errore",
        description: "Il nome del sottodominio è obbligatorio",
        variant: "destructive",
      });
      return;
    }

    if (customButtons.length === 0) {
      toast({
        title: "Errore", 
        description: "Aggiungi almeno un pulsante per generare il link",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const linkData = {
        slug: customSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        destination_url: customButtons[0]?.url || '',
        title: title || null,
        description: description || null,
        display_name: displayName || null,
        bio: bio || null,
        background_theme: backgroundTheme,
        profile_image_url: profileImageUrl || null,
        cover_image_url: coverImageUrl || null,
        custom_background_url: customBackgroundUrl || null,
        social_links: socialLinks,
        custom_buttons: customButtons,
        user_id: user?.id || null,
      };

      let result;

      if (editLinkId) {
        // Aggiorna il link esistente
        result = await supabase
          .from('custom_links')
          .update({
            ...linkData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editLinkId)
          .eq('user_id', user?.id) // Sicurezza: solo il proprietario può aggiornare
          .select()
          .single();
      } else {
        // Crea un nuovo link
        result = await supabase
          .from('custom_links')
          .insert([linkData])
          .select()
          .single();
      }

      const { data, error } = result;

      if (error) {
        console.error('Database error:', error);
        
        if (error.code === '23505') {
          toast({
            title: "Errore",
            description: "Questo nome sottodominio è già in uso. Prova con un nome diverso.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Errore",
            description: editLinkId ? "Errore nell'aggiornamento del link" : "Errore nella creazione del link",
            variant: "destructive",
          });
        }
        return;
      }

      if (data) {
        const generatedUrl = `https://${data.slug}.lnkfire.dev`;
        onLinkGenerated(generatedUrl);
        
        toast({
          title: editLinkId ? "Link aggiornato!" : "Link generato!",
          description: editLinkId 
            ? "Il tuo link personalizzato è stato aggiornato con successo"
            : `Il tuo link è ora disponibile su: ${data.slug}.lnkfire.dev`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: editLinkId ? "Errore nell'aggiornamento del link" : "Errore nella generazione del link",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return { handleGenerate };
};

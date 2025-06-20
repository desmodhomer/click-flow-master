
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface UserLink {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  click_count: number;
  created_at: string;
}

export const useUserLinks = () => {
  const [links, setLinks] = useState<UserLink[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserLinks = async () => {
    if (!user) {
      setLinks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('custom_links')
        .select('id, slug, title, description, click_count, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user links:', error);
        toast({
          title: "Errore",
          description: "Errore nel caricamento dei tuoi link",
          variant: "destructive",
        });
        return;
      }

      setLinks(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei tuoi link",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from('custom_links')
        .delete()
        .eq('id', linkId)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting link:', error);
        toast({
          title: "Errore",
          description: "Errore durante l'eliminazione del link",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Link eliminato",
        description: "Il link è stato eliminato con successo",
      });

      // Ricarica la lista senza ricaricare la pagina
      fetchUserLinks();
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'eliminazione del link",
        variant: "destructive",
      });
      return false;
    }
  };

  // Funzione pubblica per aggiornare i link manualmente
  const refreshLinks = () => {
    fetchUserLinks();
  };

  useEffect(() => {
    fetchUserLinks();
  }, [user]);

  return {
    links,
    loading,
    fetchUserLinks,
    deleteLink,
    refreshLinks, // Esponiamo questa funzione per l'aggiornamento manuale
  };
};

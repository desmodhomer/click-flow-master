
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CustomLinkProfile, SocialLink } from "@/types/customLink";

interface LinkCustomizerFormProps {
  onLinkGenerated: (link: string) => void;
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  customSlug: string;
  setCustomSlug: (slug: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const LinkCustomizerForm = ({
  onLinkGenerated,
  originalUrl,
  setOriginalUrl,
  customSlug,
  setCustomSlug,
  title,
  setTitle,
  description,
  setDescription
}: LinkCustomizerFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [backgroundTheme, setBackgroundTheme] = useState("gradient-blue");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const generateSlug = () => {
    return customSlug || `link-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  };

  const handleGenerate = async () => {
    if (!originalUrl) {
      toast({
        title: "Errore",
        description: "Inserisci un URL valido",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      toast({
        title: "Errore",
        description: "Inserisci un URL valido (es. https://esempio.com)",
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

      // Insert new custom link with all the new fields
      const { data, error } = await supabase
        .from('custom_links')
        .insert({
          slug,
          destination_url: originalUrl,
          title: title || "Link Personalizzato",
          description: description || null,
          display_name: displayName || null,
          bio: bio || null,
          background_theme: backgroundTheme,
          social_links: socialLinks,
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

  return (
    <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">
            Personalizza il tuo link
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
            Gratuito
          </Badge>
        </div>
        <p className="text-gray-300 mt-2">
          Compila i campi sottostanti per creare il tuo link personalizzato
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="original-url" className="text-base font-medium text-gray-200">
            URL Originale *
          </Label>
          <Input
            id="original-url"
            placeholder="https://esempio.com/il-tuo-link-incredibile"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="h-12 text-base bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="custom-slug" className="text-base font-medium text-gray-200">
            Sottodominio Personalizzato
          </Label>
          <div className="flex">
            <Input
              id="custom-slug"
              placeholder="mio-link-speciale"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="h-12 rounded-r-none border-r-0 focus:z-10 bg-white/10 border-white/30 text-white placeholder:text-gray-400"
            />
            <span className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-white/30 bg-white/5 text-gray-300 font-mono text-sm">
              .lnkfire.dev
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="display-name" className="text-base font-medium text-gray-200">
            Nome da Visualizzare
          </Label>
          <Input
            id="display-name"
            placeholder="Il tuo nome o brand"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-12 text-base bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="title" className="text-base font-medium text-gray-200">
            Titolo della pagina
          </Label>
          <Input
            id="title"
            placeholder="Il mio fantastico prodotto - Scoprilo ora!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 text-base bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-base font-medium text-gray-200">
            Descrizione
          </Label>
          <Textarea
            id="description"
            placeholder="Descrivi brevemente cosa troveranno gli utenti cliccando su questo link..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="bio" className="text-base font-medium text-gray-200">
            Bio/Biografia
          </Label>
          <Textarea
            id="bio"
            placeholder="Racconta qualcosa di te o del tuo brand..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="resize-none bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <Button 
          onClick={handleGenerate}
          className="w-full h-14 text-lg font-semibold bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Generazione in corso...
            </>
          ) : (
            <>
              <Sparkles className="mr-3 h-5 w-5" />
              Genera Link Personalizzato
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LinkCustomizerForm;

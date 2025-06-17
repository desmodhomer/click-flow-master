
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Settings, Image as ImageIcon, Palette, Link as LinkIcon, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SocialLink } from "@/types/customLink";
import SocialLinksManager from "./SocialLinksManager";
import ThemeCustomization from "./ThemeCustomization";
import ProfileCustomization from "./ProfileCustomization";

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
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (url: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
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
  setDescription,
  displayName,
  setDisplayName,
  bio,
  setBio,
  backgroundTheme,
  setBackgroundTheme,
  socialLinks,
  setSocialLinks,
  profileImageUrl,
  setProfileImageUrl,
  coverImageUrl,
  setCoverImageUrl,
  customBackgroundUrl,
  setCustomBackgroundUrl
}: LinkCustomizerFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
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

      // Insert new custom link with all the new fields, converting socialLinks to JSON
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
          profile_image_url: profileImageUrl || null,
          cover_image_url: coverImageUrl || null,
          custom_background_url: customBackgroundUrl || null,
          social_links: socialLinks as any, // Cast to any to satisfy Json type
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
    <div className="space-y-6">
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
            Naviga tra le sezioni per personalizzare completamente il tuo link
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
              <TabsTrigger 
                value="basic" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configurazione</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profilo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Immagini</span>
              </TabsTrigger>
              <TabsTrigger 
                value="design" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
              >
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Design</span>
              </TabsTrigger>
            </TabsList>

            {/* Configurazione Base */}
            <TabsContent value="basic" className="space-y-6 mt-6">
              <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Configurazione Base</h3>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                    Fase 1
                  </Badge>
                </div>

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
              </div>
            </TabsContent>

            {/* Profilo */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Informazioni Profilo</h3>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                    Fase 2
                  </Badge>
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

                <SocialLinksManager 
                  socialLinks={socialLinks}
                  setSocialLinks={setSocialLinks}
                />
              </div>
            </TabsContent>

            {/* Immagini */}
            <TabsContent value="images" className="space-y-6 mt-6">
              <ProfileCustomization
                profileImageUrl={profileImageUrl}
                setProfileImageUrl={setProfileImageUrl}
                coverImageUrl={coverImageUrl}
                setCoverImageUrl={setCoverImageUrl}
                customBackgroundUrl={customBackgroundUrl}
                setCustomBackgroundUrl={setCustomBackgroundUrl}
              />
            </TabsContent>

            {/* Design e Tema */}
            <TabsContent value="design" className="space-y-6 mt-6">
              <ThemeCustomization 
                backgroundTheme={backgroundTheme}
                setBackgroundTheme={setBackgroundTheme}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-white/20">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkCustomizerForm;

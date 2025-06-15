
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const LinkCustomizer = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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

      // Insert new custom link
      const { data, error } = await supabase
        .from('custom_links')
        .insert({
          slug,
          destination_url: originalUrl,
          title: title || "Link Personalizzato",
          description: description || null,
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
      setGeneratedLink(generated);
      
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "Copiato!",
      description: "Link copiato negli appunti",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Crea il tuo link personalizzato
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trasforma qualsiasi URL in un sottodominio brandizzato su lnkfire.dev
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Personalizza il tuo link</span>
                <Badge variant="secondary">Gratuito</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="original-url">URL Originale *</Label>
                <Input
                  id="original-url"
                  placeholder="https://esempio.com/il-tuo-link"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-slug">Sottodominio Personalizzato (opzionale)</Label>
                <div className="flex">
                  <Input
                    id="custom-slug"
                    placeholder="mio-link-speciale"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="rounded-r-none"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                    .lnkfire.dev
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Solo lettere minuscole, numeri e trattini. Se vuoto, verrà generato automaticamente.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titolo della pagina</Label>
                <Input
                  id="title"
                  placeholder="Il mio fantastico prodotto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  placeholder="Scopri il mio nuovo prodotto incredibile..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generazione...
                  </>
                ) : (
                  "Genera Link Personalizzato"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Anteprima</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedLink ? (
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Il tuo link personalizzato:
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-blue-600 font-mono text-sm break-all">
                      {generatedLink}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {title || "Link Personalizzato"}
                        </h3>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <p className="text-blue-100 text-sm mt-1">
                        {description || "Clicca per visitare il link"}
                      </p>
                    </div>
                    <div className="p-4 bg-white">
                      <Button className="w-full" size="lg">
                        Visita Link
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-muted-foreground">Click</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <div className="text-sm text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">0%</div>
                      <div className="text-sm text-muted-foreground">CTR</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ExternalLink className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>L'anteprima del tuo link apparirà qui</p>
                  <p className="text-sm mt-2">
                    Formato: <code className="bg-muted px-2 py-1 rounded">tuoslug.lnkfire.dev</code>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LinkCustomizer;

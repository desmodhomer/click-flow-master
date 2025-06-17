
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Loader2, ArrowLeft, Sparkles, BarChart3, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { RubiksCube } from "@/components/ui/rubik-s-cube";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LinkCustomizerPage = () => {
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
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-200 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full py-12">
          {/* Hero Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-tight text-white leading-none font-sans">
              Link Personalizzato
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-md mx-auto leading-relaxed mb-8 font-light">
              Crea il tuo sottodominio brandizzato professionale.
            </p>
          </div>

          {/* Features Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Sicurezza Garantita</h3>
              <p className="text-gray-300 text-sm">SSL integrato e protezione anti-spam</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Analytics Avanzate</h3>
              <p className="text-gray-300 text-sm">Traccia click e performance in tempo reale</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Branding Professionale</h3>
              <p className="text-gray-300 text-sm">Sottodomini personalizzati e memorabili</p>
            </div>
          </div>

          {/* Main Tool */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Form Section */}
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

                <Button 
                  onClick={handleGenerate}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
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

            {/* Preview Section */}
            <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Anteprima Live</CardTitle>
                <p className="text-gray-300">
                  Visualizza come apparirà il tuo link personalizzato
                </p>
              </CardHeader>
              
              <CardContent>
                {generatedLink ? (
                  <div className="space-y-6">
                    {/* Generated Link Display */}
                    <div className="p-6 bg-blue-500/20 rounded-xl border border-blue-400/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">
                          Il tuo link personalizzato
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="h-8 px-3 border-blue-400/50 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copia
                        </Button>
                      </div>
                      <div className="text-blue-200 font-mono text-lg break-all bg-white/10 p-3 rounded-lg border border-blue-400/30">
                        {generatedLink}
                      </div>
                    </div>

                    {/* Preview Card */}
                    <div className="border border-white/30 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2">
                              {title || "Link Personalizzato"}
                            </h3>
                            <p className="text-blue-100 leading-relaxed">
                              {description || "Clicca per visitare questo fantastico link personalizzato"}
                            </p>
                          </div>
                          <ExternalLink className="h-6 w-6 ml-4 flex-shrink-0" />
                        </div>
                      </div>
                      
                      <div className="p-6 bg-white/5">
                        <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                          Visita Link →
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ExternalLink className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">
                      L'anteprima apparirà qui
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Compila il form per vedere come apparirà il tuo link personalizzato
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 inline-block border border-white/20">
                      <code className="text-sm text-gray-300 font-mono">
                        tuoslug.lnkfire.dev
                      </code>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Back Button - Bottom Left */}
      <div className="absolute bottom-8 left-4 md:left-8 lg:left-16 z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button 
                  className="bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-6 py-2 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Torna alla Home
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Torna alla pagina principale</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default LinkCustomizerPage;

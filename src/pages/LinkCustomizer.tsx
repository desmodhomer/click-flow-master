
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-slate-800 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Torna alla Home</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Link Personalizzato
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Strumento Professionale</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Crea il tuo{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Link Personalizzato
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Trasforma qualsiasi URL in un sottodominio brandizzato professionale. 
            Aumenta la fiducia dei tuoi utenti e migliora il tuo brand con link memorabili.
          </p>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Sicurezza Garantita</h3>
              <p className="text-slate-600 text-sm">SSL integrato e protezione anti-spam</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Analytics Avanzate</h3>
              <p className="text-slate-600 text-sm">Traccia click e performance in tempo reale</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Branding Professionale</h3>
              <p className="text-slate-600 text-sm">Sottodomini personalizzati e memorabili</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tool */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Personalizza il tuo link
                </CardTitle>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                  Gratuito
                </Badge>
              </div>
              <p className="text-slate-600 mt-2">
                Compila i campi sottostanti per creare il tuo link personalizzato
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="original-url" className="text-base font-medium text-slate-700">
                  URL Originale *
                </Label>
                <Input
                  id="original-url"
                  placeholder="https://esempio.com/il-tuo-link-incredibile"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-sm text-slate-500">
                  Inserisci l'URL completo che vuoi trasformare
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="custom-slug" className="text-base font-medium text-slate-700">
                  Sottodominio Personalizzato
                </Label>
                <div className="flex">
                  <Input
                    id="custom-slug"
                    placeholder="mio-link-speciale"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="h-12 rounded-r-none border-r-0 focus:z-10"
                  />
                  <span className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-slate-200 bg-slate-50 text-slate-600 font-mono text-sm">
                    .lnkfire.dev
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  Solo lettere minuscole, numeri e trattini. Lascia vuoto per generazione automatica.
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-medium text-slate-700">
                  Titolo della pagina
                </Label>
                <Input
                  id="title"
                  placeholder="Il mio fantastico prodotto - Scoprilo ora!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium text-slate-700">
                  Descrizione
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descrivi brevemente cosa troveranno gli utenti cliccando su questo link..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
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
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">Anteprima Live</CardTitle>
              <p className="text-slate-600">
                Visualizza come apparirà il tuo link personalizzato
              </p>
            </CardHeader>
            
            <CardContent>
              {generatedLink ? (
                <div className="space-y-8">
                  {/* Generated Link Display */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
                        Il tuo link personalizzato
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="h-8 px-3 border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copia
                      </Button>
                    </div>
                    <div className="text-blue-700 font-mono text-lg break-all bg-white p-3 rounded-lg border border-blue-200">
                      {generatedLink}
                    </div>
                  </div>

                  {/* Preview Card */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg">
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
                    
                    <div className="p-6 bg-white">
                      <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Visita Link →
                      </Button>
                      
                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <div className="text-center text-xs text-slate-500 mb-4">
                          Powered by LinkMaster
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-blue-600">0</div>
                            <div className="text-xs text-slate-600 font-medium">Click</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-purple-600">0</div>
                            <div className="text-xs text-slate-600 font-medium">Views</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-green-600">0%</div>
                            <div className="text-xs text-slate-600 font-medium">CTR</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ExternalLink className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">
                    L'anteprima apparirà qui
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Compila il form per vedere come apparirà il tuo link personalizzato
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 inline-block">
                    <code className="text-sm text-slate-600 font-mono">
                      tuoslug.lnkfire.dev
                    </code>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LinkCustomizerPage;

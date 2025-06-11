
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LinkCustomizer = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!originalUrl) {
      toast({
        title: "Errore",
        description: "Inserisci un URL valido",
        variant: "destructive",
      });
      return;
    }

    const slug = customSlug || `link-${Date.now()}`;
    const generated = `https://linkmaster.app/${slug}`;
    setGeneratedUrl(generated);
    
    toast({
      title: "Link generato!",
      description: "Il tuo link personalizzato è pronto",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
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
            Trasforma qualsiasi URL in una landing page brandizzata in pochi secondi
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
                <Label htmlFor="custom-slug">Slug Personalizzato (opzionale)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    linkmaster.app/
                  </span>
                  <Input
                    id="custom-slug"
                    placeholder="mio-link-speciale"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
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
              >
                Genera Link Personalizzato
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Anteprima</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedUrl ? (
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
                      {generatedUrl}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {title || "Il tuo titolo qui"}
                        </h3>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <p className="text-blue-100 text-sm mt-1">
                        {description || "La tua descrizione apparirà qui"}
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

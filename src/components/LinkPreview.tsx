
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BACKGROUND_THEMES } from "@/types/customLink";

interface LinkPreviewProps {
  generatedLink: string;
  title: string;
  description: string;
  displayName?: string;
  bio?: string;
  backgroundTheme?: string;
}

const LinkPreview = ({ 
  generatedLink, 
  title, 
  description,
  displayName,
  bio,
  backgroundTheme = 'gradient-blue'
}: LinkPreviewProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: "Copiato!",
        description: "Link copiato negli appunti",
      });
    } catch (err) {
      toast({
        title: "Errore",
        description: "Impossibile copiare il link",
        variant: "destructive",
      });
    }
  };

  const openLink = () => {
    window.open(generatedLink, '_blank');
  };

  const selectedTheme = BACKGROUND_THEMES.find(theme => theme.id === backgroundTheme) || BACKGROUND_THEMES[0];

  if (!generatedLink) {
    return (
      <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Anteprima Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-white/60" />
            </div>
            <p className="text-gray-300 text-lg mb-2">Nessun link generato</p>
            <p className="text-gray-400 text-sm">
              Compila il form per vedere l'anteprima del tuo link personalizzato
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Link Generated Card */}
      <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Link Generato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-black/20 rounded-lg border border-white/10">
            <p className="text-white font-mono text-sm break-all mb-3">
              {generatedLink}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copia Link
              </Button>
              <Button
                onClick={openLink}
                variant="outline"
                size="sm"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Apri Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">
            Anteprima Pagina
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Ecco come apparirà la tua pagina personalizzata
          </p>
        </CardHeader>
        <CardContent>
          {/* Preview Window */}
          <div className="bg-black/20 rounded-lg p-4 border border-white/10">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-sm mx-auto">
              {/* Mobile Preview */}
              <div 
                className={`${selectedTheme.class} px-6 py-8 text-center min-h-[400px] flex flex-col justify-center`}
              >
                {/* Profile Image Placeholder */}
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>

                {/* Display Name */}
                {displayName && (
                  <h1 className="text-white text-xl font-bold mb-2">
                    {displayName}
                  </h1>
                )}

                {/* Title */}
                {title && (
                  <h2 className="text-white/90 text-lg font-semibold mb-2">
                    {title}
                  </h2>
                )}

                {/* Bio */}
                {bio && (
                  <p className="text-white/80 text-sm mb-4 max-w-xs mx-auto">
                    {bio}
                  </p>
                )}

                {/* Description */}
                {description && (
                  <p className="text-white/70 text-xs mb-6 max-w-xs mx-auto">
                    {description}
                  </p>
                )}

                {/* Main Link Button */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    size="sm"
                  >
                    Vai al Link Principale
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-xs text-center mt-3">
            * Questa è un'anteprima semplificata. La pagina finale includerà tutte le funzionalità.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkPreview;


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkPreviewProps {
  generatedLink: string;
  title: string;
  description: string;
}

const LinkPreview = ({ generatedLink, title, description }: LinkPreviewProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "Copiato!",
      description: "Link copiato negli appunti",
    });
  };

  return (
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
  );
};

export default LinkPreview;

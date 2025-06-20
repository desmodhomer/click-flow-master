
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Eye, Monitor, Code, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LinkActionsCardProps {
  generatedLink: string;
  customSlug?: string;
}

const LinkActionsCard = ({ generatedLink, customSlug }: LinkActionsCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const openPreview = () => {
    if (generatedLink) {
      window.open(generatedLink, '_blank', 'width=400,height=700,scrollbars=yes,resizable=yes');
      
      toast({
        title: "Anteprima aperta!",
        description: "Si è aperta una finestra con l'anteprima del tuo link",
      });
    }
  };

  const openDevPreview = () => {
    if (customSlug) {
      navigate(`/preview/${customSlug}`);
    } else {
      toast({
        title: "Errore",
        description: "Slug non disponibile per la preview",
        variant: "destructive",
      });
    }
  };

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
    <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Link Generato
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
              <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                <Copy className="mr-2 h-4 w-4" />
                Copia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openPreview} className="cursor-pointer">
                <Monitor className="mr-2 h-4 w-4" />
                Popup
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openDevPreview} className="cursor-pointer">
                <Code className="mr-2 h-4 w-4" />
                Dev Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openLink} className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Apri
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-black/20 rounded-lg border border-white/10">
          <p className="text-white font-mono text-sm break-all">
            {generatedLink}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkActionsCard;

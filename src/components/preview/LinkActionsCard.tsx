
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface LinkActionsCardProps {
  generatedLink: string;
  customSlug?: string;
}

const LinkActionsCard = ({ generatedLink }: LinkActionsCardProps) => {
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
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Link Generato
        </CardTitle>
      </CardHeader>
      <CardContent>
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

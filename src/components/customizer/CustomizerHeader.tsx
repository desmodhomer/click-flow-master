
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";

interface CustomizerHeaderProps {
  onGenerate: () => void;
  isGenerating: boolean;
  originalUrl: string;
}

const CustomizerHeader = ({ onGenerate, isGenerating, originalUrl }: CustomizerHeaderProps) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">LinkMaster</h1>
            <p className="text-xs text-gray-500">Personalizza il tuo link</p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onGenerate}
        disabled={isGenerating || !originalUrl}
        className="bg-black hover:bg-gray-800 text-white font-semibold px-6 h-10 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generazione...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Genera Link
            <ExternalLink className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default CustomizerHeader;

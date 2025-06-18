
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface CustomizerHeaderProps {
  onGenerate: () => void;
  isGenerating: boolean;
  originalUrl: string;
}

const CustomizerHeader = ({ onGenerate, isGenerating, originalUrl }: CustomizerHeaderProps) => {
  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">LinkMaster</h1>
        <span className="text-gray-400">|</span>
        <span className="text-gray-300">Personalizza il tuo link</span>
      </div>
      
      <Button 
        onClick={onGenerate}
        disabled={isGenerating || !originalUrl}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
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
          </>
        )}
      </Button>
    </div>
  );
};

export default CustomizerHeader;

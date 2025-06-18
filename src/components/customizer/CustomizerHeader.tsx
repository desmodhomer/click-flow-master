
import { Sparkles } from "lucide-react";

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
    </div>
  );
};

export default CustomizerHeader;


import { Badge } from "@/components/ui/badge";
import { Palette, Paintbrush, Sparkles } from "lucide-react";
import ThemeCustomization from "@/components/ThemeCustomization";

interface DesignPanelProps {
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
}

const DesignPanel = ({
  backgroundTheme,
  setBackgroundTheme,
  customBackgroundUrl,
  setCustomBackgroundUrl
}: DesignPanelProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Palette className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Design e Stile</h2>
        <p className="text-sm text-gray-500 mt-1">Scegli lo stile perfetto per la tua pagina</p>
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 mt-2">
          Passo 4 di 4
        </Badge>
      </div>

      <div className="space-y-6">
        <ThemeCustomization 
          backgroundTheme={backgroundTheme}
          setBackgroundTheme={setBackgroundTheme}
        />
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Paintbrush className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-orange-800 text-sm font-medium mb-1">
                <strong>Design perfetto:</strong>
              </p>
              <ul className="text-orange-700 text-xs space-y-1">
                <li>• I gradienti creano un effetto moderno e accattivante</li>
                <li>• I colori solidi sono più professionali</li>
                <li>• Lo sfondo personalizzato sovrascrive il tema scelto</li>
                <li>• Considera il contrasto per la leggibilità del testo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPanel;

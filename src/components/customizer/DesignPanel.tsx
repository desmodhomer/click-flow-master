
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [customColorCode, setCustomColorCode] = useState('#3b82f6');

  const handleCustomColorSubmit = () => {
    console.log('Applicando colore di sfondo personalizzato:', customColorCode);
    setBackgroundTheme(`custom-${customColorCode}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Palette className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Background</h2>
        <p className="text-sm text-gray-500 mt-1">Scegli lo sfondo perfetto per la tua pagina</p>
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 mt-2">
          Passo 4 di 4
        </Badge>
      </div>

      <div className="space-y-6">
        <ThemeCustomization 
          backgroundTheme={backgroundTheme}
          setBackgroundTheme={setBackgroundTheme}
        />

        {/* Custom Background Color Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Colore Personalizzato</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomColor(!showCustomColor)}
              className="h-8 px-2"
            >
              <Palette className="h-3 w-3 mr-1" />
              {showCustomColor ? 'Nascondi' : 'Mostra'}
            </Button>
          </div>

          {showCustomColor && (
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
              <div className="space-y-2">
                <Label htmlFor="backgroundColorPicker" className="text-xs text-gray-600">
                  Seleziona colore di sfondo
                </Label>
                <div className="flex gap-2">
                  <input
                    id="backgroundColorPicker"
                    type="color"
                    value={customColorCode}
                    onChange={(e) => setCustomColorCode(e.target.value)}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={customColorCode}
                    onChange={(e) => setCustomColorCode(e.target.value)}
                    placeholder="#3b82f6"
                    className="flex-1 h-8 text-xs"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded border border-gray-300" 
                  style={{ backgroundColor: customColorCode }}
                ></div>
                <Button
                  onClick={handleCustomColorSubmit}
                  size="sm"
                  className="flex-1 h-8 text-xs"
                >
                  Applica Colore
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Paintbrush className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-orange-800 text-sm font-medium mb-1">
                <strong>Background perfetto:</strong>
              </p>
              <ul className="text-orange-700 text-xs space-y-1">
                <li>• I gradienti creano un effetto moderno e accattivante</li>
                <li>• I colori solidi sono più professionali</li>
                <li>• Il colore personalizzato permette il massimo controllo</li>
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

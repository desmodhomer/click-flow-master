
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { BACKGROUND_THEMES, BackgroundTheme } from "@/types/customLink";

interface ThemeCustomizationProps {
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
}

const ThemeCustomization = ({ backgroundTheme, setBackgroundTheme }: ThemeCustomizationProps) => {
  return (
    <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Personalizzazione Tema
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
            Fase 4
          </Badge>
        </div>
        <p className="text-gray-300 mt-2">
          Scegli un tema di sfondo per la tua pagina personalizzata
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <RadioGroup 
          value={backgroundTheme} 
          onValueChange={setBackgroundTheme}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {BACKGROUND_THEMES.map((theme: BackgroundTheme) => (
            <div key={theme.id} className="relative">
              <RadioGroupItem
                value={theme.id}
                id={theme.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={theme.id}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 p-4 hover:bg-white/10 peer-checked:border-blue-400 peer-checked:bg-blue-500/20 cursor-pointer transition-all duration-200"
              >
                {/* Theme Preview */}
                <div 
                  className={`w-full h-20 rounded-lg ${theme.class} mb-3 border border-white/30 shadow-lg`}
                  style={theme.preview.startsWith('linear-gradient') 
                    ? { background: theme.preview }
                    : { backgroundColor: theme.preview }
                  }
                />
                
                {/* Theme Name */}
                <span className="text-white font-medium text-sm text-center">
                  {theme.name}
                </span>
                
                {/* Selected Indicator */}
                {backgroundTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="p-4 bg-black/20 rounded-lg border border-white/10">
          <p className="text-gray-300 text-sm">
            <strong>Tema selezionato:</strong> {BACKGROUND_THEMES.find(t => t.id === backgroundTheme)?.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomization;

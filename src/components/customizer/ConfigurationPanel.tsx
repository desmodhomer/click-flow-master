
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings, Link, Hash, Type, FileText } from "lucide-react";

interface ConfigurationPanelProps {
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  customSlug: string;
  setCustomSlug: (slug: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const ConfigurationPanel = ({
  originalUrl,
  setOriginalUrl,
  customSlug,
  setCustomSlug,
  title,
  setTitle,
  description,
  setDescription
}: ConfigurationPanelProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Configurazione Base</h2>
        <p className="text-sm text-gray-500 mt-1">Imposta i dettagli fondamentali del tuo link</p>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 mt-2">
          Passo 1 di 4
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-blue-500" />
            <Label htmlFor="original-url" className="text-sm font-semibold text-gray-700">
              URL di Destinazione *
            </Label>
          </div>
          <Input
            id="original-url"
            placeholder="https://esempio.com/il-tuo-contenuto-fantastico"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
          <p className="text-xs text-gray-500">L'URL verso cui gli utenti verranno reindirizzati</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-green-500" />
            <Label htmlFor="custom-slug" className="text-sm font-semibold text-gray-700">
              Sottodominio Personalizzato
            </Label>
          </div>
          <div className="flex">
            <Input
              id="custom-slug"
              placeholder="il-mio-link-speciale"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="h-11 rounded-r-none border-r-0 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 focus:z-10"
            />
            <div className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium">
              .lnkfire.dev
            </div>
          </div>
          <p className="text-xs text-gray-500">Lascia vuoto per generarne uno automaticamente</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-purple-500" />
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Titolo della Pagina
            </Label>
          </div>
          <Input
            id="title"
            placeholder="Il mio prodotto incredibile - Scoprilo subito!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
          <p className="text-xs text-gray-500">Apparirà come titolo principale della pagina</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-500" />
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Descrizione
            </Label>
          </div>
          <Textarea
            id="description"
            placeholder="Descrivi brevemente cosa troveranno gli utenti... Rendi tutto accattivante e coinvolgente!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
          />
          <p className="text-xs text-gray-500">Una descrizione coinvolgente aumenta i click</p>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm font-medium">
            💡 <strong>Suggerimento:</strong> Usa parole accattivanti nel titolo e nella descrizione per aumentare l'engagement!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;

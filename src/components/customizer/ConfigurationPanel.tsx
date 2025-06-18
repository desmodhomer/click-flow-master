
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Configurazione Base</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          Fase 1
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="original-url" className="text-sm font-medium text-gray-700">
            URL Originale *
          </Label>
          <Input
            id="original-url"
            placeholder="https://esempio.com/il-tuo-link-incredibile"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="custom-slug" className="text-sm font-medium text-gray-700">
            Sottodominio Personalizzato
          </Label>
          <div className="flex mt-1">
            <Input
              id="custom-slug"
              placeholder="mio-link-speciale"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="rounded-r-none border-r-0 focus:z-10"
            />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              .lnkfire.dev
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Titolo della pagina
          </Label>
          <Input
            id="title"
            placeholder="Il mio fantastico prodotto - Scoprilo ora!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Descrizione
          </Label>
          <Textarea
            id="description"
            placeholder="Descrivi brevemente cosa troveranno gli utenti cliccando su questo link..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;

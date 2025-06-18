
import { ExternalLink } from "lucide-react";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

interface PreviewMainCTAProps {
  customButtons?: CustomButton[];
}

const PreviewMainCTA = ({ customButtons = [] }: PreviewMainCTAProps) => {
  if (customButtons.length === 0) {
    return (
      <div className="px-4 mb-3">
        <div className="w-full h-12 bg-white/90 text-gray-900 text-sm font-medium shadow-lg rounded-xl flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
          <ExternalLink className="mr-2 h-4 w-4" />
          Aggiungi un pulsante
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mb-3 space-y-3">
      {customButtons.map((button) => (
        <div key={button.id} className="w-full h-12 bg-white/90 text-gray-900 text-sm font-medium shadow-lg rounded-xl flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
          <ExternalLink className="mr-2 h-4 w-4" />
          {button.text || 'Pulsante'}
        </div>
      ))}
    </div>
  );
};

export default PreviewMainCTA;


import { ExternalLink } from "lucide-react";
import { CustomLink } from "./SubdomainLoader";

interface SubdomainMainCTAProps {
  link: CustomLink;
  onClick: () => void;
}

const SubdomainMainCTA = ({ link, onClick }: SubdomainMainCTAProps) => {
  return (
    <div className="px-4 mb-6">
      <button
        onClick={onClick}
        className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/30 transition-all duration-200 group"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="flex-1 text-center">
            <div className="text-white text-lg font-semibold mb-1">
              {link.title || "Visita il Link"}
            </div>
            {link.description && (
              <div className="text-white/70 text-sm">
                {link.description}
              </div>
            )}
          </div>
          <ExternalLink className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
        </div>
      </button>
    </div>
  );
};

export default SubdomainMainCTA;

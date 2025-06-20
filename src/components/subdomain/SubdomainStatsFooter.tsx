
import { Eye, Calendar } from "lucide-react";

interface SubdomainStatsFooterProps {
  clickCount: number;
  slug: string;
}

const SubdomainStatsFooter = ({ clickCount, slug }: SubdomainStatsFooterProps) => {
  return (
    <div className="mt-auto px-4 py-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{clickCount} visualizzazioni</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>lnkfire.dev</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubdomainStatsFooter;

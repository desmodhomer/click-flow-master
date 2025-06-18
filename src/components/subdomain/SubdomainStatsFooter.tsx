
import { Button } from "@/components/ui/button";
import { BarChart3, ExternalLink } from "lucide-react";

interface SubdomainStatsFooterProps {
  clickCount: number;
}

const SubdomainStatsFooter = ({ clickCount }: SubdomainStatsFooterProps) => {
  return (
    <div className="space-y-3">
      {/* Stats Card - More Compact */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{clickCount}</div>
            <div className="text-xs text-gray-500">visite</div>
          </div>
        </div>
      </div>
      
      {/* Powered by - More Compact */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">Powered by</p>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => window.open('https://lnkfire.dev', '_blank')}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 font-semibold transition-all duration-200 text-xs h-8"
        >
          <span className="text-base mr-1">🔗</span>
          lnkfire.dev
          <ExternalLink className="ml-1 h-2 w-2 opacity-50" />
        </Button>
      </div>
    </div>
  );
};

export default SubdomainStatsFooter;

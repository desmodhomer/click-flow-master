
import { Button } from "@/components/ui/button";
import { BarChart3, ExternalLink } from "lucide-react";

interface SubdomainStatsFooterProps {
  clickCount: number;
}

const SubdomainStatsFooter = ({ clickCount }: SubdomainStatsFooterProps) => {
  return (
    <div className="space-y-4">
      {/* Stats Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{clickCount}</div>
            <div className="text-xs text-gray-500">visite</div>
          </div>
        </div>
      </div>
      
      {/* Powered by */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">Powered by</p>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => window.open('https://lnkfire.dev', '_blank')}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 font-bold transition-all duration-300 text-sm"
        >
          <span className="text-lg mr-2">🔗</span>
          lnkfire.dev
          <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
        </Button>
      </div>
    </div>
  );
};

export default SubdomainStatsFooter;

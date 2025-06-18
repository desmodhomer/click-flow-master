
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, ExternalLink } from "lucide-react";

interface SubdomainStatsFooterProps {
  clickCount: number;
}

const SubdomainStatsFooter = ({ clickCount }: SubdomainStatsFooterProps) => {
  return (
    <div className="bg-white/96 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800">{clickCount}</div>
            <div className="text-lg text-gray-500">visite totali</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-500">
          <Calendar className="h-6 w-6" />
          <span className="text-lg">Attivo</span>
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500 mb-6 font-medium">
          Powered by
        </p>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => window.open('https://lnkfire.dev', '_blank')}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold transition-all duration-300 group rounded-2xl text-lg"
        >
          <span className="text-3xl mr-3 group-hover:scale-110 transition-transform">🔗</span>
          lnkfire.dev
          <ExternalLink className="ml-3 h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>
    </div>
  );
};

export default SubdomainStatsFooter;

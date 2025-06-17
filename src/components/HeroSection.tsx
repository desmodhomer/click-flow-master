
import { Button } from "@/components/ui/button";
import { RubiksCube } from "@/components/ui/rubik-s-cube";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LogIn } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-200 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 tracking-tight text-white leading-none">
          LinkMaster
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
          Veloce. Affidabile. Sincero. La piattaforma di link shortening che funziona davvero.
        </p>
        
        <div className="flex justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 px-8 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <LogIn className="w-6 h-6" />
                  Accedi
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clicca qui per accedere alla piattaforma</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


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
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-4 tracking-tight text-white leading-none font-sans text-left">
            lnki.it
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-md leading-relaxed mb-4 font-light text-left">
            Shortening veloce e affidabile.
          </p>
        </div>
      </div>
      
      {/* Login Button - Bottom Left */}
      <div className="absolute bottom-12 left-4 md:left-8 lg:left-16 z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-6 py-2 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Accedi
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clicca qui per accedere alla piattaforma</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default HeroSection;

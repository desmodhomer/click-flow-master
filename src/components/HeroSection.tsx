
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
                  size="icon"
                  className="relative bg-white text-black border-2 border-white w-20 h-20 rounded-full shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-white/25 hover:shadow-3xl hover:scale-110 hover:rotate-6 active:scale-95 active:rotate-12"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Ripple effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-150 group-active:scale-110 transition-transform duration-700 ease-out"></div>
                  
                  {/* Pulsating ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-100 group-hover:scale-125 group-hover:border-white/20 transition-all duration-1000 animate-pulse"></div>
                  
                  {/* Icon with animation */}
                  <LogIn className="relative z-10 w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-90" />
                  
                  {/* Sparkle effects */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-100"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-200"></div>
                  <div className="absolute top-4 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-300"></div>
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


import { Button } from "@/components/ui/button";
import { RubiksCube } from "@/components/ui/rubik-s-cube";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Target, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Quest = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-purple-200 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-4 tracking-tight text-white leading-none font-sans text-left">
            Quest
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-md leading-relaxed mb-8 font-light text-left">
            Completa sfide e guadagna ricompense.
          </p>

          {/* Quest Cards */}
          <div className="grid gap-4 max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Prima Missione</h3>
              </div>
              <p className="text-gray-300 mb-4">Crea il tuo primo link personalizzato</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">100 XP</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Inizia
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Link Master</h3>
              </div>
              <p className="text-gray-300 mb-4">Raggiungi 100 click sui tuoi link</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">500 XP</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Bloccata
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back Button - Bottom Left */}
      <div className="absolute bottom-12 left-4 md:left-8 lg:left-16 z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button 
                  className="bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-6 py-2 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Torna alla Home
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Torna alla pagina principale</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Quest;

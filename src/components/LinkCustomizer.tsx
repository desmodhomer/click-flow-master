
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { RubiksCube } from "@/components/ui/rubik-s-cube";

const LinkCustomizer = () => {
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
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent tracking-tight leading-none font-sans">
            Crea il tuo link personalizzato
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Trasforma qualsiasi URL in un sottodominio brandizzato su lnkfire.dev
          </p>
          
          <Link to="/link-customizer">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 text-white"
            >
              <Sparkles className="mr-3 h-5 w-5" />
              Inizia Ora - È Gratuito
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LinkCustomizer;

import { Button } from "@/components/ui/button";
import { RubiksCube } from "@/components/ui/rubik-s-cube";

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
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight text-white leading-tight">
          Personalizza i tuoi link con stile
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Crea landing page personalizzate per i tuoi link, monitora le performance e costruisci il tuo brand. 
          Tutto in un'unica piattaforma potente e intuitiva.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Inizia Gratuitamente
          </Button>
          <Button variant="outline" size="lg" className="border-white px-8 py-3 text-lg text-slate-50 bg-gray-950 hover:bg-gray-800">
            Guarda Demo
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-gray-400 opacity-75">
          <p>Trusted by 10,000+ creators worldwide</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

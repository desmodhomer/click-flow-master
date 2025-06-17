
import { Button } from "@/components/ui/button";
import { RubiksCube } from "@/components/ui/rubik-s-cube";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight mix-blend-difference text-white leading-tight">
          Personalizza i tuoi link con stile
        </h1>
        
        <p className="text-lg md:text-xl text-white mix-blend-exclusion max-w-2xl mx-auto leading-relaxed mb-8">
          Crea landing page personalizzate per i tuoi link, monitora le performance e costruisci il tuo brand. 
          Tutto in un'unica piattaforma potente e intuitiva.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold mix-blend-difference">
            Inizia Gratuitamente
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg mix-blend-difference">
            Guarda Demo
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-white mix-blend-difference opacity-75">
          <p>Trusted by 10,000+ creators worldwide</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

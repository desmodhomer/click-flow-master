
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles, ArrowRight, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const LinkCustomizer = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Neon Background Effects */}
      <div className="absolute inset-0">
        {/* Animated neon gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Scrolling neon lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-[slide-in-right_4s_ease-in-out_infinite_0.5s]"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[slide-in-right_5s_ease-in-out_infinite_1s]"></div>
        </div>
        
        {/* Floating neon particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full blur-sm animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-400 rounded-full blur-sm animate-bounce delay-500"></div>
          <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-sm animate-bounce delay-1000"></div>
        </div>
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <Globe className="w-6 h-6 text-blue-400" />
            <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Crea il tuo link personalizzato
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trasforma qualsiasi URL in un sottodominio brandizzato su lnkfire.dev
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden animate-scale-in">
            {/* Neon border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-lg blur-sm"></div>
            
            <CardHeader className="text-center pb-8 relative z-10">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Strumento Professionale
                </Badge>
              </div>
              
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Link Personalizzati di Qualità Professionale
              </CardTitle>
              
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Crea sottodomini brandizzati, aumenta la fiducia dei tuoi utenti e 
                monitora le performance con analytics avanzate.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8 relative z-10">
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Sottodomini Personalizzati</h3>
                  <p className="text-sm text-gray-400">tuoslug.lnkfire.dev</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Design Personalizzabile</h3>
                  <p className="text-sm text-gray-400">Titoli e descrizioni custom</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Analytics Integrate</h3>
                  <p className="text-sm text-gray-400">Monitora click e conversioni</p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center pt-8 border-t border-white/10">
                <p className="text-gray-400 mb-6">
                  Pronto a creare il tuo primo link personalizzato?
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
                
                <p className="text-sm text-gray-500 mt-4">
                  Nessuna registrazione richiesta • Risultati istantanei
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LinkCustomizer;

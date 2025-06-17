
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LinkCustomizer = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Crea il tuo link personalizzato
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trasforma qualsiasi URL in un sottodominio brandizzato su lnkfire.dev
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Strumento Professionale
                </Badge>
              </div>
              
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Link Personalizzati di Qualità Professionale
              </CardTitle>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Crea sottodomini brandizzati, aumenta la fiducia dei tuoi utenti e 
                monitora le performance con analytics avanzate.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Sottodomini Personalizzati</h3>
                  <p className="text-sm text-muted-foreground">tuoslug.lnkfire.dev</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Design Personalizzabile</h3>
                  <p className="text-sm text-muted-foreground">Titoli e descrizioni custom</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Analytics Integrate</h3>
                  <p className="text-sm text-muted-foreground">Monitora click e conversioni</p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center pt-8 border-t border-white/40">
                <p className="text-muted-foreground mb-6">
                  Pronto a creare il tuo primo link personalizzato?
                </p>
                
                <Link to="/link-customizer">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="mr-3 h-5 w-5" />
                    Inizia Ora - È Gratuito
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                
                <p className="text-sm text-muted-foreground mt-4">
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

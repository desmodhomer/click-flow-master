
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Shield, Smartphone, Zap, Users, Globe } from "lucide-react";

const FeaturesSection = () => {
  const features = [{
    icon: BarChart3,
    title: "Analytics Avanzate",
    description: "Monitora click, views, conversioni e molto altro con dashboard dettagliate."
  }, {
    icon: Shield,
    title: "Sicurezza Totale",
    description: "Protezione anti-spam e link sicuri per proteggere i tuoi utenti."
  }, {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Tutti i link sono ottimizzati per dispositivi mobili e tablet."
  }, {
    icon: Zap,
    title: "Velocità Fulminea",
    description: "Reindirizzamenti istantanei con CDN globale per massime performance."
  }, {
    icon: Users,
    title: "Team Collaboration",
    description: "Lavora in team e condividi le analytics con i tuoi collaboratori."
  }, {
    icon: Globe,
    title: "Domini Personalizzati",
    description: "Usa il tuo dominio personalizzato per rafforzare il tuo brand."
  }];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Funzionalità Potenti
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tutto quello che serve per gestire i tuoi link in modo professionale
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="h-full">
                <CardHeader>
                  <Icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

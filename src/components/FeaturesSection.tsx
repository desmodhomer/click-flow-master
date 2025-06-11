
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Shield, Smartphone, Zap, Users, Globe } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Analytics Avanzate",
      description: "Monitora click, views, conversioni e molto altro con dashboard dettagliate."
    },
    {
      icon: Shield,
      title: "Sicurezza Totale",
      description: "Protezione anti-spam e link sicuri per proteggere i tuoi utenti."
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Tutti i link sono ottimizzati per dispositivi mobili e tablet."
    },
    {
      icon: Zap,
      title: "Velocità Fulminea",
      description: "Reindirizzamenti istantanei con CDN globale per massime performance."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Lavora in team e condividi le analytics con i tuoi collaboratori."
    },
    {
      icon: Globe,
      title: "Domini Personalizzati",
      description: "Usa il tuo dominio personalizzato per rafforzare il tuo brand."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Funzionalità Potenti per il Tuo Business
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tutto quello che serve per creare, gestire e ottimizzare i tuoi link personalizzati
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

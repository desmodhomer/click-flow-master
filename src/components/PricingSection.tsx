
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [{
    name: "Gratuito",
    price: "0",
    period: "per sempre",
    description: "Perfetto per iniziare",
    features: ["5 link personalizzati", "Analytics di base", "Sottodomini lnkfire.dev", "Supporto community"],
    cta: "Inizia Gratis",
    popular: false
  }, {
    name: "Pro",
    price: "9",
    period: "al mese",
    description: "Per professionisti e creator",
    features: ["Link illimitati", "Analytics avanzate", "Domini personalizzati", "Team collaboration", "API access", "Supporto prioritario"],
    cta: "Inizia Prova Gratuita",
    popular: true
  }, {
    name: "Business",
    price: "29",
    period: "al mese",
    description: "Per aziende e team",
    features: ["Tutto del piano Pro", "White label completo", "Integrazioni avanzate", "Manager dedicato", "SLA garantito", "Formazione personalizzata"],
    cta: "Contattaci",
    popular: false
  }];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Piani Semplici e Trasparenti
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scegli il piano perfetto per le tue esigenze. Sempre con garanzia soddisfatti o rimborsati.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  <Star className="h-4 w-4 mr-1" />
                  Più Popolare
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "0",
      period: "per sempre",
      description: "Perfetto per iniziare",
      features: [
        "5 link personalizzati",
        "Analytics di base",
        "Sottodomini lnkfire.dev",
        "Supporto community"
      ],
      cta: "Inizia Gratis",
      popular: false
    },
    {
      name: "Pro",
      price: "9",
      period: "al mese",
      description: "Per professionisti e creator",
      features: [
        "Link illimitati",
        "Analytics avanzate",
        "Domini personalizzati",
        "Team collaboration",
        "API access",
        "Supporto prioritario"
      ],
      cta: "Inizia Prova Gratuita",
      popular: true
    },
    {
      name: "Business",
      price: "29",
      period: "al mese",
      description: "Per aziende e team",
      features: [
        "Tutto del piano Pro",
        "White label completo",
        "Integrazioni avanzate",
        "Manager dedicato",
        "SLA garantito",
        "Formazione personalizzata"
      ],
      cta: "Contattaci",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-black text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Piani Semplici e Trasparenti
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Scegli il piano perfetto per le tue esigenze. Inizia gratis e scala quando cresci.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-blue-500 border-2 bg-gray-900' : 'bg-gray-900 border-gray-700'} text-white`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Più Popolare
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Tutti i piani includono SSL gratuito e backup automatici
          </p>
          <p className="text-sm text-gray-500">
            Garanzia soddisfatti o rimborsati entro 30 giorni
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

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
  return;
};
export default PricingSection;
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
  return;
};
export default FeaturesSection;
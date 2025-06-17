
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hai Bisogno di Aiuto?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Il nostro team è qui per aiutarti. Contattaci per qualsiasi domanda o dubbio.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
                  Invia un Messaggio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Il tuo nome" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="la-tua-email@esempio.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Oggetto</Label>
                  <Input id="subject" placeholder="Come possiamo aiutarti?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Messaggio</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Scrivi qui il tuo messaggio..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Invia Messaggio
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Altri Modi per Contattarci
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">support@linkmaster.it</p>
                  <p className="text-sm text-gray-500 mt-1">Rispondiamo entro 24 ore</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Telefono</h4>
                  <p className="text-gray-600">+39 02 1234 5678</p>
                  <p className="text-sm text-gray-500 mt-1">Lun-Ven 9:00-18:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Ufficio</h4>
                  <p className="text-gray-600">Via Milano 123<br />20121 Milano, Italia</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Centro Assistenza</h4>
              <p className="text-gray-600 mb-4">
                Trova risposte immediate alle domande più frequenti
              </p>
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Visita il Centro Assistenza
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

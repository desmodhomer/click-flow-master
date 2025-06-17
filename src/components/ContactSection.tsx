
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entra in Contatto
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hai domande o hai bisogno di aiuto? Il nostro team è qui per supportarti
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-black border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Invia un Messaggio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">Nome</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Mario"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">Cognome</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Rossi"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="mario.rossi@esempio.com"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">Oggetto</Label>
                <Input 
                  id="subject" 
                  placeholder="Come posso aiutarti?"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Messaggio</Label>
                <Textarea 
                  id="message" 
                  placeholder="Scrivi qui il tuo messaggio..."
                  rows={5}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
                Invia Messaggio
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Altre Modalità di Contatto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <p className="text-gray-300">support@linkmaster.com</p>
                    <p className="text-sm text-gray-400">Rispondiamo entro 24 ore</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Live Chat</h4>
                    <p className="text-gray-300">Disponibile 24/7</p>
                    <p className="text-sm text-gray-400">Supporto immediato per utenti Pro</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Telefono</h4>
                    <p className="text-gray-300">+39 02 1234 5678</p>
                    <p className="text-sm text-gray-400">Lun-Ven 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ufficio</h4>
                    <p className="text-gray-300">Via Roma 123</p>
                    <p className="text-gray-300">20121 Milano, Italia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Supporto Enterprise</h4>
              <p className="text-gray-300 mb-4">
                Hai bisogno di un supporto dedicato per la tua azienda? 
                Contattaci per soluzioni personalizzate.
              </p>
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                Richiedi Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

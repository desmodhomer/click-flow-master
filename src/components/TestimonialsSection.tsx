
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marco Rossi",
      role: "Digital Marketing Manager",
      company: "TechCorp Italia",
      content: "LinkMaster ha rivoluzionato la nostra strategia di marketing. Le analytics dettagliate ci permettono di ottimizzare ogni campagna.",
      rating: 5,
      avatar: "M"
    },
    {
      name: "Giulia Bianchi",
      role: "Content Creator",
      company: "@giuliacreates",
      content: "Perfetto per gestire tutti i miei link social. L'interfaccia è intuitiva e i report sono fantastici per i brand che collaborano con me.",
      rating: 5,
      avatar: "G"
    },
    {
      name: "Alessandro Verdi",
      role: "E-commerce Manager",
      company: "ShopItaly",
      content: "Da quando usiamo LinkMaster abbiamo aumentato il CTR del 40%. Il tracking preciso ci aiuta a capire cosa funziona davvero.",
      rating: 5,
      avatar: "A"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quello che Dicono i Nostri Clienti
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Oltre 10.000 professionisti si fidano di LinkMaster per gestire i loro link
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black border-gray-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-blue-500 opacity-50 absolute -top-2 -left-2" />
                  <p className="text-gray-300 italic pl-6">"{testimonial.content}"</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-blue-400">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-sm">Utenti Attivi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-sm">Link Creati</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

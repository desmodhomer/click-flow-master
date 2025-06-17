
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [{
    name: "Marco Rossi",
    role: "Digital Marketing Manager",
    company: "TechCorp Italia",
    content: "LinkMaster ha rivoluzionato la nostra strategia di marketing. Le analytics dettagliate ci permettono di ottimizzare ogni campagna.",
    rating: 5,
    avatar: "M"
  }, {
    name: "Giulia Bianchi",
    role: "Content Creator",
    company: "@giuliacreates",
    content: "Perfetto per gestire tutti i miei link social. L'interfaccia è intuitiva e i report sono fantastici per i brand che collaborano con me.",
    rating: 5,
    avatar: "G"
  }, {
    name: "Alessandro Verdi",
    role: "E-commerce Manager",
    company: "ShopItaly",
    content: "Da quando usiamo LinkMaster abbiamo aumentato il CTR del 40%. Il tracking preciso ci aiuta a capire cosa funziona davvero.",
    rating: 5,
    avatar: "A"
  }];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cosa Dicono i Nostri Clienti
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oltre 10.000 professionisti si affidano a LinkMaster per gestire i loro link
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-blue-600 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

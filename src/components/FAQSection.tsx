
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Come funziona LinkMaster?",
      answer: "LinkMaster ti permette di creare link personalizzati con sottodomini brandizzati. Inserisci il tuo URL originale, personalizza il sottodominio e ottieni un link del tipo 'tuonome.lnkfire.dev' con una landing page personalizzata."
    },
    {
      question: "È davvero gratuito?",
      answer: "Sì! Il piano gratuito include 5 link personalizzati, analytics di base e l'uso dei sottodomini lnkfire.dev. Puoi fare upgrade ai piani a pagamento per funzionalità avanzate e link illimitati."
    },
    {
      question: "Posso usare il mio dominio personalizzato?",
      answer: "Assolutamente! Con i piani Pro e Business puoi collegare il tuo dominio personalizzato per un branding completo. Ti guidiamo attraverso tutto il processo di configurazione."
    },
    {
      question: "Che tipo di analytics fornite?",
      answer: "Tracciamo click, visualizzazioni, posizione geografica, dispositivi utilizzati, referrer e molto altro. I piani Pro includono analytics avanzate con report dettagliati e esportazione dati."
    },
    {
      question: "I miei link funzioneranno sempre?",
      answer: "Garantiamo un uptime del 99.9% con la nostra infrastruttura CDN globale. I tuoi link saranno sempre veloci e accessibili da tutto il mondo."
    },
    {
      question: "Posso collaborare con il mio team?",
      answer: "Sì! I piani Pro e Business includono funzionalità di team collaboration per gestire link e analytics insieme ai tuoi collaboratori."
    },
    {
      question: "È sicuro per i miei utenti?",
      answer: "La sicurezza è la nostra priorità. Tutti i link sono protetti da SSL, implementiamo protezione anti-spam e monitoriamo costantemente per contenuti dannosi."
    },
    {
      question: "Posso cancellare il mio account in qualsiasi momento?",
      answer: "Certamente! Puoi cancellare il tuo account in qualsiasi momento dalle impostazioni. Offriamo anche una garanzia di rimborso di 30 giorni per i piani a pagamento."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Domande Frequenti
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trova le risposte alle domande più comuni su LinkMaster
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Non trovi la risposta che cerchi?
          </p>
          <a 
            href="#contact" 
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contattaci direttamente →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

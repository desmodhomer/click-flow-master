
import { Link } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Link className="h-6 w-6" />
              <span className="text-xl font-bold">LinkMaster</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              La piattaforma definitiva per personalizzare i tuoi link e costruire il tuo brand online.
              Unisciti a oltre 10.000 professionisti che si fidano di LinkMaster.
            </p>
            <div className="flex space-x-4">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Termini di Servizio
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Prodotto</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Funzionalità</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Prezzi</a></li>
              <li><a href="/api" className="hover:text-white transition-colors">API</a></li>
              <li><a href="/integrations" className="hover:text-white transition-colors">Integrazioni</a></li>
              <li><a href="/changelog" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Supporto</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-white transition-colors">Centro Aiuto</a></li>
              <li><a href="/docs" className="hover:text-white transition-colors">Documentazione</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contattaci</a></li>
              <li><a href="/status" className="hover:text-white transition-colors">Stato Servizi</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 LinkMaster. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6">
              <a href="https://twitter.com/linkmaster" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="https://linkedin.com/company/linkmaster" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/linkmaster" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

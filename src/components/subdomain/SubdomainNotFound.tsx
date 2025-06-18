
import { Button } from "@/components/ui/button";

const SubdomainNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-8xl mb-8">🔗</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Link non trovato</h1>
        <p className="text-gray-600 mb-10 leading-relaxed text-lg">
          Questo link personalizzato non esiste o è stato rimosso.
        </p>
        <Button 
          onClick={() => window.location.href = 'https://lnkfire.dev'}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        >
          Crea il tuo link
        </Button>
      </div>
    </div>
  );
};

export default SubdomainNotFound;


import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubdomainNotFoundProps {
  error?: string | null;
}

const SubdomainNotFound = ({ error }: SubdomainNotFoundProps) => {
  const hostname = window.location.hostname;
  const slug = hostname.split('.')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pagina non trovata
            </h1>
            <p className="text-gray-600 mb-4">
              Il link "<span className="font-mono bg-gray-100 px-2 py-1 rounded">{slug}</span>" non esiste o non è più disponibile.
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                <p className="text-sm text-red-700">
                  Errore: {error}
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = 'https://lnkfire.dev'}
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Vai alla Home
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna Indietro
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Debug Info: {hostname}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Timestamp: {new Date().toISOString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubdomainNotFound;

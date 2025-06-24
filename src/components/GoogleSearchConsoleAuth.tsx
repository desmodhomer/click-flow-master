
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { Search, BarChart3, TrendingUp } from 'lucide-react';

const GoogleSearchConsoleAuth = () => {
  const { signInWithGoogleSearchConsole, loading } = useGoogleAuth();

  const handleConnect = async () => {
    try {
      await signInWithGoogleSearchConsole();
    } catch (error) {
      console.error('Failed to connect to Google Search Console:', error);
    }
  };

  const features = [
    {
      icon: Search,
      title: 'Tracking Keywords',
      description: 'Monitora le performance delle tue keyword'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avanzate',
      description: 'Analizza click, impressioni e posizioni'
    },
    {
      icon: TrendingUp,
      title: 'Trend Performance',
      description: 'Segui l\'andamento nel tempo dei tuoi link'
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Search className="h-6 w-6 text-blue-600" />
          Google Search Console Integration
        </CardTitle>
        <CardDescription>
          Connetti Google Search Console per tracciare le performance dei tuoi link personalizzati
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <IconComponent className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Cosa includiamo:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Accesso read-only ai dati Search Console</li>
            <li>• Tracking automatico delle keyword</li>
            <li>• Integrazione con n8n per automazioni</li>
            <li>• Dashboard personalizzato per analytics</li>
          </ul>
        </div>

        <Button 
          onClick={handleConnect}
          disabled={loading}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Connessione in corso...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Connetti Google Search Console
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Utilizziamo solo i permessi necessari per il tracking delle keyword (scope: webmasters.readonly)
        </p>
      </CardContent>
    </Card>
  );
};

export default GoogleSearchConsoleAuth;

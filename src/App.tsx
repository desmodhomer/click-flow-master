
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Quest from "./pages/Quest";
import LinkCustomizerPage from "./pages/LinkCustomizer";
import PreviewPage from "./pages/PreviewPage";
import UserLinksPage from "./pages/UserLinks";
import NotFound from "./pages/NotFound";
import SubdomainHandler from "./components/SubdomainHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Funzione per determinare se siamo su un sottodominio
const isSubdomainEnvironment = () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  console.log('🚀 CHECKING SUBDOMAIN - hostname:', hostname);
  console.log('📁 CHECKING SUBDOMAIN - pathname:', pathname);
  
  // PRIORITÀ 1: Test per sottodomini .lnkfire.dev - SEMPRE vince su tutto
  if (hostname.endsWith('.lnkfire.dev')) {
    const parts = hostname.split('.');
    const subdomain = parts[0];
    
    // Se non è il dominio principale lnkfire.dev, allora è un sottodominio
    if (hostname !== 'lnkfire.dev' && hostname !== 'www.lnkfire.dev' && subdomain !== 'www') {
      console.log('✅ MATCHED .lnkfire.dev subdomain - FORCED SUBDOMAIN MODE:', hostname);
      return true;
    }
  }
  
  // PRIORITÀ 2: Se siamo sul dominio principale lnkfire.dev (senza sottodominio), NON è sottodominio
  if (hostname === 'lnkfire.dev' || hostname === 'www.lnkfire.dev') {
    console.log('❌ MAIN DOMAIN - NOT SUBDOMAIN:', hostname);
    return false;
  }
  
  // PRIORITÀ 3: Ambiente di sviluppo - DISABILITATO per evitare errori
  // Forza sempre la modalità normale app invece del sottodominio in sviluppo
  console.log('❌ DEVELOPMENT MODE - FORCING NORMAL APP:', hostname);
  return false;
};

const App = () => {
  const isSubdomain = isSubdomainEnvironment();
  
  console.log('🎯 FINAL DECISION - isSubdomain:', isSubdomain);

  // Se siamo su un sottodominio, mostra il SubdomainHandler
  if (isSubdomain) {
    console.log('🎭 RENDERING SUBDOMAIN HANDLER');
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <SubdomainHandler />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  console.log('🏠 RENDERING NORMAL APP');
  // Altrimenti, mostra il normale routing dell'app
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quest" element={<Quest />} />
              <Route path="/link-customizer" element={<LinkCustomizerPage />} />
              <Route path="/user-links" element={<UserLinksPage />} />
              <Route path="/preview/:slug" element={<PreviewPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

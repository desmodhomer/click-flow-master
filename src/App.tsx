
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
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isSubdomain, setIsSubdomain] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    console.log('App: Checking hostname:', hostname);
    console.log('App: Checking pathname:', pathname);
    
    // Logica migliorata per riconoscere i sottodomini
    const parts = hostname.split('.');
    console.log('App: Hostname parts:', parts);
    
    let isRealSubdomain = false;
    
    // Controlla diversi scenari di sottodominio
    if (parts.length >= 3) {
      const subdomain = parts[0];
      const domain = parts.slice(1).join('.');
      
      console.log('App: Potential subdomain:', subdomain);
      console.log('App: Domain:', domain);
      
      // Verifica se abbiamo un sottodominio valido
      if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin') {
        // Per domini personalizzati come lnkfire.dev
        if (domain === 'lnkfire.dev') {
          isRealSubdomain = true;
        }
        // Per domini lovable solo se NON siamo su route dell'app
        else if (hostname.includes('lovable.app') || hostname.includes('lovableproject.com')) {
          const isAppRoute = pathname.startsWith('/quest') || 
                            pathname.startsWith('/link-customizer') || 
                            pathname.startsWith('/preview/') ||
                            pathname.startsWith('/user-links') ||
                            pathname === '/';
          
          if (!isAppRoute) {
            isRealSubdomain = true;
          }
        }
      }
    }
    
    console.log('App: Is real subdomain?', isRealSubdomain);
    setIsSubdomain(isRealSubdomain);
  }, []);

  console.log('App: Current state - isSubdomain:', isSubdomain);

  // Se siamo su un sottodominio, mostra il SubdomainHandler
  if (isSubdomain) {
    console.log('App: Rendering SubdomainHandler');
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

  console.log('App: Rendering normal app routing');
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

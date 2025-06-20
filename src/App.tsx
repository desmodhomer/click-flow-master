
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
    
    // Solo considera sottodominio se NON siamo su route specifiche dell'app
    const isAppRoute = pathname.startsWith('/quest') || 
                      pathname.startsWith('/link-customizer') || 
                      pathname.startsWith('/preview/') ||
                      pathname.startsWith('/user-links') ||
                      pathname === '/';
    
    if (isAppRoute) {
      console.log('App: On app route, not checking for subdomain');
      setIsSubdomain(false);
      return;
    }
    
    // Controlla se siamo su un vero sottodominio
    const parts = hostname.split('.');
    const isRealSubdomain = (
      (parts.length === 3 && parts[1] === 'lnkfire' && parts[2] === 'dev' && parts[0] !== 'www') ||
      (hostname.includes('.lovable.app') && parts.length >= 3 && !hostname.startsWith('lovable.')) ||
      (hostname.includes('.lovableproject.com') && parts.length >= 3)
    );
    
    if (isRealSubdomain) {
      console.log('App: Detected real subdomain environment');
      setIsSubdomain(true);
    } else {
      console.log('App: Not a subdomain environment');
      setIsSubdomain(false);
    }
  }, []);

  // Se siamo su un sottodominio reale, mostra il SubdomainHandler
  if (isSubdomain) {
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

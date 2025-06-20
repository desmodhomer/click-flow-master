
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
    
    console.log('=== APP DEBUG START ===');
    console.log('App: Full hostname:', hostname);
    console.log('App: Full pathname:', pathname);
    console.log('App: Window location href:', window.location.href);
    
    // Logica migliorata per riconoscere i sottodomini
    const parts = hostname.split('.');
    console.log('App: Hostname parts:', parts);
    console.log('App: Parts length:', parts.length);
    
    let isRealSubdomain = false;
    
    // Controlla diversi scenari di sottodominio
    if (parts.length >= 2) {
      const subdomain = parts[0];
      const domain = parts.slice(1).join('.');
      
      console.log('App: Extracted subdomain:', subdomain);
      console.log('App: Extracted domain:', domain);
      
      // Verifica se abbiamo un sottodominio valido
      if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin') {
        console.log('App: Subdomain is valid (not www/api/admin)');
        
        // Per domini personalizzati come lnkfire.dev
        if (domain === 'lnkfire.dev') {
          console.log('App: Detected lnkfire.dev domain - setting as subdomain');
          isRealSubdomain = true;
        }
        // Per domini lovable solo se NON siamo su route dell'app
        else if (hostname.includes('lovable.app') || hostname.includes('lovableproject.com')) {
          console.log('App: Detected lovable domain, checking routes');
          const isAppRoute = pathname.startsWith('/quest') || 
                            pathname.startsWith('/link-customizer') || 
                            pathname.startsWith('/preview/') ||
                            pathname.startsWith('/user-links') ||
                            pathname === '/';
          
          console.log('App: Is app route?', isAppRoute);
          
          if (!isAppRoute) {
            console.log('App: Not an app route - setting as subdomain');
            isRealSubdomain = true;
          } else {
            console.log('App: Is an app route - NOT a subdomain');
          }
        } else {
          console.log('App: Unknown domain type:', domain);
        }
      } else {
        console.log('App: Invalid subdomain (www/api/admin)');
      }
    } else {
      console.log('App: Not enough hostname parts for subdomain');
    }
    
    console.log('App: Final isRealSubdomain decision:', isRealSubdomain);
    console.log('=== APP DEBUG END ===');
    
    setIsSubdomain(isRealSubdomain);
  }, []);

  console.log('App: Current render - isSubdomain state:', isSubdomain);

  // Se siamo su un sottodominio, mostra il SubdomainHandler
  if (isSubdomain) {
    console.log('App: Rendering SubdomainHandler because isSubdomain =', isSubdomain);
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

  console.log('App: Rendering normal app routing because isSubdomain =', isSubdomain);
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

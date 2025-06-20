
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
    console.log('🚀 APP USEEFFECT STARTED');
    
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const href = window.location.href;
    
    console.log('🌐 HOSTNAME:', hostname);
    console.log('📁 PATHNAME:', pathname);
    console.log('🔗 FULL URL:', href);
    
    // Test specifico per edes.lnkfire.dev
    if (hostname === 'edes.lnkfire.dev') {
      console.log('✅ MATCHED edes.lnkfire.dev - SETTING AS SUBDOMAIN');
      setIsSubdomain(true);
      return;
    }
    
    // Logica generale per altri casi
    const parts = hostname.split('.');
    console.log('🔧 HOSTNAME PARTS:', parts);
    
    let shouldBeSubdomain = false;
    
    if (parts.length >= 2) {
      const subdomain = parts[0];
      const domain = parts.slice(1).join('.');
      
      console.log('🏷️ SUBDOMAIN:', subdomain);
      console.log('🌍 DOMAIN:', domain);
      
      if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin') {
        if (domain === 'lnkfire.dev') {
          console.log('✅ VALID LNKFIRE.DEV SUBDOMAIN');
          shouldBeSubdomain = true;
        } else if (hostname.includes('lovable.app') || hostname.includes('lovableproject.com')) {
          const isAppRoute = pathname.startsWith('/quest') || 
                            pathname.startsWith('/link-customizer') || 
                            pathname.startsWith('/preview/') ||
                            pathname.startsWith('/user-links') ||
                            pathname === '/';
          
          if (!isAppRoute) {
            console.log('✅ VALID LOVABLE SUBDOMAIN (NOT APP ROUTE)');
            shouldBeSubdomain = true;
          } else {
            console.log('❌ LOVABLE BUT IS APP ROUTE');
          }
        }
      }
    }
    
    console.log('🎯 FINAL DECISION - IS SUBDOMAIN:', shouldBeSubdomain);
    setIsSubdomain(shouldBeSubdomain);
  }, []);

  console.log('🎨 RENDERING - isSubdomain state:', isSubdomain);

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

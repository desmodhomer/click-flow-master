
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
    // Check if we're on a subdomain or custom domain
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    console.log('App: Checking hostname:', hostname);
    console.log('App: Hostname parts:', parts);
    
    // Check multiple subdomain patterns
    const isLnkfireDev = parts.length === 3 && parts[1] === 'lnkfire' && parts[2] === 'dev';
    const isLovableApp = hostname.includes('.lovable.app') && parts.length >= 3;
    const isLovableProject = hostname.includes('.lovableproject.com') && parts.length >= 3;
    
    // Also check if we have a path-based slug (fallback for some deployments)
    const hasPathSlug = window.location.pathname !== '/' && window.location.pathname.split('/').length >= 2;
    
    if (isLnkfireDev || isLovableApp || isLovableProject || hasPathSlug) {
      console.log('App: Detected subdomain environment');
      setIsSubdomain(true);
    } else {
      console.log('App: Not a subdomain environment');
    }
  }, []);

  // If we're on a subdomain, show the SubdomainHandler
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

  // Otherwise, show the normal app routing
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
              <Route path="/preview/:slug" element={<PreviewPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
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
    // Check if we're on a subdomain of lnkfire.dev
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // Check if it's a subdomain (3 parts) and matches lnkfire.dev pattern
    if (parts.length === 3 && parts[1] === 'lnkfire' && parts[2] === 'dev') {
      setIsSubdomain(true);
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

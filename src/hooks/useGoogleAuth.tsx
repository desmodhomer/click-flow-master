
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GoogleAuthHookReturn {
  signInWithGoogleSearchConsole: () => Promise<void>;
  loading: boolean;
}

export const useGoogleAuth = (): GoogleAuthHookReturn => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogleSearchConsole = async () => {
    try {
      setLoading(true);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          scopes: 'https://www.googleapis.com/auth/webmasters.readonly email profile openid'
        }
      });
      
      if (error) {
        console.error('Error signing in with Google Search Console:', error);
        throw error;
      }
      
      toast.success('Autenticazione Google Search Console avviata!');
    } catch (error) {
      console.error('Error during Google Search Console authentication:', error);
      toast.error('Errore durante l\'autenticazione Google Search Console');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogleSearchConsole,
    loading
  };
};

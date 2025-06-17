import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "./AuthDialog";
import UserProfile from "./UserProfile";
const Header = () => {
  const {
    user,
    loading
  } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  return <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <LinkIcon className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-white">
            LinkMaster
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          
          
          <Link to="/link-customizer" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Crea Link
          </Link>
          
          
        </nav>
        
        <div className="flex items-center space-x-4">
          {loading ? <div className="h-8 w-20 bg-white/20 animate-pulse rounded"></div> : user ? <UserProfile /> : <>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white" onClick={() => setAuthDialogOpen(true)}>
                Login
              </Button>
              <Button size="sm" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm" onClick={() => setAuthDialogOpen(true)}>
                Get Started
              </Button>
            </>}
        </div>
      </div>
      
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>;
};
export default Header;
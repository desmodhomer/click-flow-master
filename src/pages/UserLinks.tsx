
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import UserLinksSection from "@/components/UserLinksSection";

const UserLinksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="mb-4"
          >
            <Link to="/link-customizer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna al Customizer
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Le tue pagine
          </h1>
          <p className="text-gray-600">
            Gestisci tutti i tuoi link personalizzati in un unico posto
          </p>
        </div>

        {/* User Links Section */}
        <UserLinksSection />
      </div>
    </div>
  );
};

export default UserLinksPage;

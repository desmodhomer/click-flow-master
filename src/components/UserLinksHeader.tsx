
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface UserLinksHeaderProps {
  linksCount: number;
  isAuthenticated: boolean;
  loading: boolean;
}

const UserLinksHeader = ({ linksCount, isAuthenticated, loading }: UserLinksHeaderProps) => {
  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Le tue pagine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Effettua l'accesso per vedere i tuoi link personalizzati
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Le tue pagine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Caricamento...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (linksCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Le tue pagine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Non hai ancora creato nessun link personalizzato
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Le tue pagine ({linksCount})
      </CardTitle>
    </CardHeader>
  );
};

export default UserLinksHeader;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserLinks } from "@/hooks/useUserLinks";
import { useAuth } from "@/hooks/useAuth";
import { Trash2, ExternalLink, Copy, BarChart3, Eye, Monitor, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const UserLinksSection = () => {
  const { links, loading, deleteLink } = useUserLinks();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCopyLink = (slug: string) => {
    const url = `https://${slug}.lnkfire.dev`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiato",
      description: "Il link è stato copiato negli appunti",
    });
  };

  const handlePreview = (slug: string) => {
    const url = `https://${slug}.lnkfire.dev`;
    window.open(url, '_blank');
    toast({
      title: "Anteprima aperta",
      description: "Il link si è aperto in una nuova scheda",
    });
  };

  const handlePopup = (slug: string) => {
    const url = `https://${slug}.lnkfire.dev`;
    window.open(url, '_blank', 'width=400,height=700,scrollbars=yes,resizable=yes');
    toast({
      title: "Popup aperto",
      description: "Il link si è aperto in una finestra popup",
    });
  };

  const handleDevPreview = (slug: string) => {
    // Genera l'URL del sottodominio di sviluppo Lovable usando HTTP
    const currentHostname = window.location.hostname;
    let devUrl;
    
    if (currentHostname.includes('lovable.app')) {
      // Se siamo su *.lovable.app, usa HTTP per evitare errori SSL
      devUrl = `http://${slug}.${currentHostname}`;
    } else if (currentHostname.includes('lovableproject.com')) {
      // Se siamo su *.lovableproject.com, usa HTTP per evitare errori SSL
      devUrl = `http://${slug}.${currentHostname}`;
    } else {
      // Fallback alla preview interna se non siamo su Lovable
      navigate(`/preview/${slug}`);
      return;
    }
    
    window.open(devUrl, '_blank');
    toast({
      title: "Dev Preview aperto",
      description: `Sottodominio di sviluppo: ${slug}.${currentHostname}`,
    });
  };

  const handleDelete = async (linkId: string) => {
    setDeletingId(linkId);
    const success = await deleteLink(linkId);
    setDeletingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!user) {
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

  if (links.length === 0) {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Le tue pagine ({links.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titolo</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-center">Visualizzazioni</TableHead>
              <TableHead className="text-center">Data creazione</TableHead>
              <TableHead className="text-center">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">
                  {link.title || 'Senza titolo'}
                  {link.description && (
                    <p className="text-sm text-muted-foreground mt-1 truncate max-w-xs">
                      {link.description}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {link.slug}.lnkfire.dev
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyLink(link.slug)}
                      title="Copia link"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">{link.click_count}</span>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {formatDate(link.created_at)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(link.slug)}
                      title="Anteprima"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePopup(link.slug)}
                      title="Apri in popup"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDevPreview(link.slug)}
                      title="Dev Preview (Sottodominio sviluppo)"
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://${link.slug}.lnkfire.dev`, '_blank')}
                      title="Apri link"
                      className="text-green-600 hover:text-green-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          disabled={deletingId === link.id}
                          title="Elimina link"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
                          <AlertDialogDescription>
                            Sei sicuro di voler eliminare il link "{link.title || link.slug}"? 
                            Questa azione non può essere annullata e il link non sarà più accessibile.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annulla</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(link.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={deletingId === link.id}
                          >
                            {deletingId === link.id ? 'Eliminazione...' : 'Elimina'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserLinksSection;

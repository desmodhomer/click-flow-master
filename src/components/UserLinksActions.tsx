
import { Button } from "@/components/ui/button";
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
import { Trash2, ExternalLink, Copy, Eye, Monitor, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserLinksActionsProps {
  slug: string;
  title: string;
  onDelete: () => void;
  isDeleting: boolean;
}

const UserLinksActions = ({ slug, title, onDelete, isDeleting }: UserLinksActionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const url = `https://${slug}.lnkfire.dev`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiato",
      description: "Il link è stato copiato negli appunti",
    });
  };

  const handlePreview = () => {
    const url = `https://${slug}.lnkfire.dev`;
    window.open(url, '_blank');
    toast({
      title: "Anteprima aperta",
      description: "Il link si è aperto in una nuova scheda",
    });
  };

  const handlePopup = () => {
    const url = `https://${slug}.lnkfire.dev`;
    window.open(url, '_blank', 'width=400,height=700,scrollbars=yes,resizable=yes');
    toast({
      title: "Popup aperto",
      description: "Il link si è aperto in una finestra popup",
    });
  };

  const handleDevPreview = () => {
    const currentHostname = window.location.hostname;
    let devUrl;
    
    if (currentHostname.includes('lovable.app')) {
      devUrl = `http://${slug}.${currentHostname}`;
    } else if (currentHostname.includes('lovableproject.com')) {
      devUrl = `http://${slug}.${currentHostname}`;
    } else {
      navigate(`/preview/${slug}`);
      return;
    }
    
    window.open(devUrl, '_blank');
    toast({
      title: "Dev Preview aperto",
      description: `Sottodominio di sviluppo: ${slug}.${currentHostname}`,
    });
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePreview}
        title="Anteprima"
        className="text-blue-600 hover:text-blue-700"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePopup}
        title="Apri in popup"
        className="text-purple-600 hover:text-purple-700"
      >
        <Monitor className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDevPreview}
        title="Dev Preview (Sottodominio sviluppo)"
        className="text-orange-600 hover:text-orange-700"
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(`https://${slug}.lnkfire.dev`, '_blank')}
        title="Apri link"
        className="text-green-600 hover:text-green-700"
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyLink}
        title="Copia link"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            disabled={isDeleting}
            title="Elimina link"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare il link "{title || slug}"? 
              Questa azione non può essere annullata e il link non sarà più accessibile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminazione...' : 'Elimina'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserLinksActions;

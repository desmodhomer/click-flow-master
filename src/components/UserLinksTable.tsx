
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserLinksActions from "./UserLinksActions";

interface UserLink {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  click_count: number;
  created_at: string;
}

interface UserLinksTableProps {
  links: UserLink[];
  deletingId: string | null;
  onDelete: (linkId: string) => void;
}

const UserLinksTable = ({ links, deletingId, onDelete }: UserLinksTableProps) => {
  const { toast } = useToast();

  const handleCopyLink = (slug: string) => {
    const url = `https://${slug}.lnkfire.dev`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiato",
      description: "Il link è stato copiato negli appunti",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
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
              <UserLinksActions
                slug={link.slug}
                title={link.title}
                onDelete={() => onDelete(link.id)}
                isDeleting={deletingId === link.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserLinksTable;

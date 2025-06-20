
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserLinksActions from "./UserLinksActions";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

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
  onDeleteLink: (linkId: string) => Promise<boolean>;
}

const UserLinksTable = ({ links, onDeleteLink }: UserLinksTableProps) => {
  const [deletingLinks, setDeletingLinks] = useState<Set<string>>(new Set());

  const handleDelete = async (linkId: string) => {
    setDeletingLinks(prev => new Set(prev).add(linkId));
    
    try {
      const success = await onDeleteLink(linkId);
      if (!success) {
        // Se l'eliminazione fallisce, rimuovi l'ID dal set
        setDeletingLinks(prev => {
          const newSet = new Set(prev);
          newSet.delete(linkId);
          return newSet;
        });
      }
    } catch (error) {
      setDeletingLinks(prev => {
        const newSet = new Set(prev);
        newSet.delete(linkId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900">Link</TableHead>
            <TableHead className="font-semibold text-gray-900">Titolo</TableHead>
            <TableHead className="font-semibold text-gray-900">Click</TableHead>
            <TableHead className="font-semibold text-gray-900">Creato</TableHead>
            <TableHead className="font-semibold text-gray-900 text-center">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-blue-600">
                    {link.slug}.lnkfire.dev
                  </span>
                  {link.description && (
                    <span className="text-sm text-gray-500 mt-1">
                      {link.description}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">
                  {link.title || 'Senza titolo'}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {link.click_count}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">
                {formatDistanceToNow(new Date(link.created_at), {
                  addSuffix: true,
                  locale: it
                })}
              </TableCell>
              <TableCell>
                <UserLinksActions
                  slug={link.slug}
                  title={link.title}
                  linkId={link.id} // Passo l'ID del link
                  onDelete={() => handleDelete(link.id)}
                  isDeleting={deletingLinks.has(link.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserLinksTable;

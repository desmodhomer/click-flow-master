
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useUserLinks } from "@/hooks/useUserLinks";
import { useAuth } from "@/hooks/useAuth";
import UserLinksHeader from "./UserLinksHeader";
import UserLinksTable from "./UserLinksTable";

const UserLinksSection = () => {
  const { links, loading, deleteLink } = useUserLinks();
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (linkId: string) => {
    setDeletingId(linkId);
    const success = await deleteLink(linkId);
    setDeletingId(null);
  };

  // Handle non-authenticated users or loading states
  if (!user || loading || links.length === 0) {
    return (
      <UserLinksHeader 
        linksCount={links.length}
        isAuthenticated={!!user}
        loading={loading}
      />
    );
  }

  return (
    <Card>
      <UserLinksHeader 
        linksCount={links.length}
        isAuthenticated={!!user}
        loading={loading}
      />
      <CardContent>
        <UserLinksTable
          links={links}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
};

export default UserLinksSection;

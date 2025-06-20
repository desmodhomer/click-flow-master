
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useUserLinks } from "@/hooks/useUserLinks";
import { useAuth } from "@/hooks/useAuth";
import UserLinksHeader from "./UserLinksHeader";
import UserLinksTable from "./UserLinksTable";

const UserLinksSection = () => {
  const { links, loading, deleteLink } = useUserLinks();
  const { user } = useAuth();

  const handleDeleteLink = async (linkId: string) => {
    return await deleteLink(linkId);
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
          onDeleteLink={handleDeleteLink}
        />
      </CardContent>
    </Card>
  );
};

export default UserLinksSection;

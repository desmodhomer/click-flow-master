
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, AtSign, FileText, Share2 } from "lucide-react";
import { SocialLink } from "@/types/customLink";
import SocialLinksManager from "@/components/SocialLinksManager";

interface ProfilePanelProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
}

const ProfilePanel = ({
  displayName,
  setDisplayName,
  bio,
  setBio,
  socialLinks,
  setSocialLinks
}: ProfilePanelProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <User className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Profilo Personale</h2>
        <p className="text-sm text-gray-500 mt-1">Aggiungi le tue informazioni personali</p>
        <Badge variant="secondary" className="bg-green-100 text-green-700 mt-2">
          Passo 2 di 4
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AtSign className="h-4 w-4 text-green-500" />
            <Label htmlFor="display-name" className="text-sm font-semibold text-gray-700">
              Nome da Visualizzare
            </Label>
          </div>
          <Input
            id="display-name"
            placeholder="Mario Rossi o Il Mio Brand"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-11 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
          />
          <p className="text-xs text-gray-500">Il nome che vedranno i visitatori</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
              Biografia
            </Label>
          </div>
          <Textarea
            id="bio"
            placeholder="Racconta qualcosa di interessante su di te o sul tuo brand. Cosa ti rende unico?"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="border-gray-200 focus:border-green-500 focus:ring-green-500/20 resize-none"
          />
          <p className="text-xs text-gray-500">Una bio coinvolgente aiuta a creare connessioni</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-purple-500" />
            <Label className="text-sm font-semibold text-gray-700">
              Link Social
            </Label>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <SocialLinksManager 
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm font-medium">
            👤 <strong>Consiglio:</strong> Aggiungi i tuoi social per permettere ai visitatori di conoscerti meglio!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;

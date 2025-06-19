
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLink } from "@/types/customLink";
import ProfilePanel from "./ProfilePanel";
import DesignPanel from "./DesignPanel";
import ImagesPanel from "./ImagesPanel";
import ButtonDesignPanel from "./ButtonDesignPanel";

export interface CustomButton {
  id: string;
  text: string;
  url: string;
  style: 'rounded' | 'square' | 'pill';
  color: string; // Changed from strict union to string to allow custom colors
  size: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  spacing: number;
  icon: string | null;
  customColorCode?: string; // Added optional property for custom color codes
}

interface ConfigurationPanelProps {
  customSlug: string;
  setCustomSlug: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  backgroundTheme: string;
  setBackgroundTheme: (value: string) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (url: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
  customButtons: CustomButton[];
  setCustomButtons: (buttons: CustomButton[]) => void;
}

const ConfigurationPanel = ({
  customSlug,
  setCustomSlug,
  title,
  setTitle,
  description,
  setDescription,
  displayName,
  setDisplayName,
  bio,
  setBio,
  backgroundTheme,
  setBackgroundTheme,
  socialLinks,
  setSocialLinks,
  profileImageUrl,
  setProfileImageUrl,
  coverImageUrl,
  setCoverImageUrl,
  customBackgroundUrl,
  setCustomBackgroundUrl,
  customButtons,
  setCustomButtons
}: ConfigurationPanelProps) => {
  return (
    <Card className="h-full border-0 bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4 border-b border-gray-200/50">
        <CardTitle className="text-xl font-bold text-gray-800">
          Configurazione
        </CardTitle>
        <p className="text-sm text-gray-600">
          Personalizza il tuo link in tempo reale
        </p>
      </CardHeader>

      <CardContent className="p-4 h-[calc(100%-140px)] overflow-y-auto space-y-6">
        {/* Custom Slug Section */}
        <div className="space-y-2">
          <Label htmlFor="customSlug" className="text-sm font-medium text-gray-700">
            Nome del sottodominio
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="customSlug"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              placeholder="il-tuo-nome"
              className="flex-1"
            />
            <span className="text-sm text-gray-500">.lnkfire.dev</span>
          </div>
          <p className="text-xs text-gray-500">
            Il tuo link sarà: {customSlug || 'il-tuo-nome'}.lnkfire.dev
          </p>
        </div>

        {/* Profile Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Profilo</h3>
          <ProfilePanel
            displayName={displayName}
            setDisplayName={setDisplayName}
            bio={bio}
            setBio={setBio}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        </div>

        {/* Background Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Background</h3>
          <DesignPanel
            backgroundTheme={backgroundTheme}
            setBackgroundTheme={setBackgroundTheme}
            customBackgroundUrl={customBackgroundUrl}
            setCustomBackgroundUrl={setCustomBackgroundUrl}
          />
        </div>

        {/* Buttons Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pulsanti</h3>
          <ButtonDesignPanel 
            customButtons={customButtons}
            setCustomButtons={setCustomButtons}
          />
        </div>

        {/* Images Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Immagini</h3>
          <ImagesPanel
            profileImageUrl={profileImageUrl}
            setProfileImageUrl={setProfileImageUrl}
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
            customBackgroundUrl={customBackgroundUrl}
            setCustomBackgroundUrl={setCustomBackgroundUrl}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;

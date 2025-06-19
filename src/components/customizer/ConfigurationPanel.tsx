
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState("profile");

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

      <CardContent className="p-0 h-[calc(100%-140px)] overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-4 mb-2">
            <TabsTrigger value="profile" className="text-xs">Profilo</TabsTrigger>
            <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
            <TabsTrigger value="buttons" className="text-xs">Pulsanti</TabsTrigger>
            <TabsTrigger value="images" className="text-xs">Immagini</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <TabsContent value="profile" className="space-y-4 mt-0">
              <ProfilePanel
                displayName={displayName}
                setDisplayName={setDisplayName}
                bio={bio}
                setBio={setBio}
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
              />
            </TabsContent>

            <TabsContent value="design" className="space-y-4 mt-0">
              <DesignPanel
                backgroundTheme={backgroundTheme}
                setBackgroundTheme={setBackgroundTheme}
                customBackgroundUrl={customBackgroundUrl}
                setCustomBackgroundUrl={setCustomBackgroundUrl}
              />
            </TabsContent>

            <TabsContent value="buttons" className="space-y-4 mt-0">
              <ButtonDesignPanel 
                customButtons={customButtons}
                setCustomButtons={setCustomButtons}
              />
            </TabsContent>

            <TabsContent value="images" className="space-y-4 mt-0">
              <ImagesPanel
                profileImageUrl={profileImageUrl}
                setProfileImageUrl={setProfileImageUrl}
                coverImageUrl={coverImageUrl}
                setCoverImageUrl={setCoverImageUrl}
                customBackgroundUrl={customBackgroundUrl}
                setCustomBackgroundUrl={setCustomBackgroundUrl}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;

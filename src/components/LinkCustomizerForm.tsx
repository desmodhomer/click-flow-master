
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "./customizer/ConfigurationPanel";
import CustomizerSidebar from "./customizer/CustomizerSidebar";
import CustomizerHeader from "./customizer/CustomizerHeader";
import ConfigurationPanel from "./customizer/ConfigurationPanel";
import ProfilePanel from "./customizer/ProfilePanel";
import ImagesPanel from "./customizer/ImagesPanel";
import DesignPanel from "./customizer/DesignPanel";

interface LinkCustomizerFormProps {
  onLinkGenerated: (link: string) => void;
  customSlug: string;
  setCustomSlug: (slug: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
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
  onPanelStateChange: (isOpen: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const LinkCustomizerForm = ({
  onLinkGenerated,
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
  setCustomButtons,
  onPanelStateChange,
  isGenerating,
  setIsGenerating
}: LinkCustomizerFormProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const handleTabChange = (tab: string) => {
    const newTab = activeTab === tab ? null : tab;
    setActiveTab(newTab);
    onPanelStateChange(newTab !== null);
  };

  const generateSlug = () => {
    return customSlug || `link-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  };

  const handleGenerate = async () => {
    if (customButtons.length === 0) {
      toast({
        title: "Errore",
        description: "Aggiungi almeno un pulsante prima di generare il link",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const slug = generateSlug();
      
      // Check if slug already exists
      const { data: existingLink } = await supabase
        .from('custom_links')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingLink) {
        toast({
          title: "Errore",
          description: "Questo slug è già in uso. Prova con un nome diverso.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // Insert new custom link with custom buttons
      const { data, error } = await supabase
        .from('custom_links')
        .insert({
          slug,
          destination_url: customButtons[0]?.url || '', // Keep for compatibility
          title: title || "Link Personalizzato",
          description: description || null,
          display_name: displayName || null,
          bio: bio || null,
          background_theme: backgroundTheme,
          profile_image_url: profileImageUrl || null,
          cover_image_url: coverImageUrl || null,
          custom_background_url: customBackgroundUrl || null,
          social_links: socialLinks as any,
          custom_buttons: customButtons as any,
          user_id: user?.id || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating link:', error);
        toast({
          title: "Errore",
          description: "Errore durante la creazione del link",
          variant: "destructive",
        });
        return;
      }

      const generated = `https://${slug}.lnkfire.dev`;
      onLinkGenerated(generated);
      
      toast({
        title: "Link generato!",
        description: "Il tuo link personalizzato è pronto",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore durante la creazione del link",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case "basic":
        return (
          <ConfigurationPanel
            customSlug={customSlug}
            setCustomSlug={setCustomSlug}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            customButtons={customButtons}
            setCustomButtons={setCustomButtons}
          />
        );
      case "profile":
        return (
          <ProfilePanel
            displayName={displayName}
            setDisplayName={setDisplayName}
            bio={bio}
            setBio={setBio}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        );
      case "images":
        return (
          <ImagesPanel
            profileImageUrl={profileImageUrl}
            setProfileImageUrl={setProfileImageUrl}
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
            customBackgroundUrl={customBackgroundUrl}
            setCustomBackgroundUrl={setCustomBackgroundUrl}
          />
        );
      case "design":
        return (
          <DesignPanel
            backgroundTheme={backgroundTheme}
            setBackgroundTheme={setBackgroundTheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <CustomizerHeader
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        hasButtons={customButtons.length > 0}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CustomizerSidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        {/* Content Panel - Only show when a tab is active */}
        {activeTab && (
          <div className="w-80 p-6 overflow-y-auto bg-white border-r border-gray-200">
            {renderActivePanel()}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkCustomizerForm;

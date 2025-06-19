
import { useState } from "react";
import { SocialLink } from "@/types/customLink";
import { CustomButton } from "@/components/customizer/ConfigurationPanel";

export const useLinkCustomizerState = () => {
  const [customSlug, setCustomSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [backgroundTheme, setBackgroundTheme] = useState("gradient-blue");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return {
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
    profileImageUrl,
    setProfileImageUrl,
    coverImageUrl,
    setCoverImageUrl,
    customBackgroundUrl,
    setCustomBackgroundUrl,
    socialLinks,
    setSocialLinks,
    customButtons,
    setCustomButtons,
    activeTab,
    setActiveTab,
  };
};

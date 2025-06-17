
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Image as ImageIcon, Palette } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface ProfileCustomizationProps {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (url: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
}

const ProfileCustomization = ({
  profileImageUrl,
  setProfileImageUrl,
  coverImageUrl,
  setCoverImageUrl,
  customBackgroundUrl,
  setCustomBackgroundUrl
}: ProfileCustomizationProps) => {
  return (
    <Card className="border-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <ImageIcon className="mr-2 h-5 w-5" />
            Personalizzazione Immagini
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
            Fase 2
          </Badge>
        </div>
        <p className="text-gray-300 mt-2">
          Carica le immagini per personalizzare il tuo profilo
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ImageUpload
          bucketName="profile-images"
          label="Immagine Profilo"
          onImageUploaded={setProfileImageUrl}
          currentImageUrl={profileImageUrl}
          aspectRatio="aspect-square"
          maxWidth={400}
          maxHeight={400}
        />

        <ImageUpload
          bucketName="cover-images"
          label="Immagine Copertina"
          onImageUploaded={setCoverImageUrl}
          currentImageUrl={coverImageUrl}
          aspectRatio="aspect-[3/1]"
          maxWidth={1200}
          maxHeight={400}
        />

        <ImageUpload
          bucketName="custom-backgrounds"
          label="Sfondo Personalizzato"
          onImageUploaded={setCustomBackgroundUrl}
          currentImageUrl={customBackgroundUrl}
          aspectRatio="aspect-[9/16]"
          maxWidth={800}
          maxHeight={1200}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileCustomization;

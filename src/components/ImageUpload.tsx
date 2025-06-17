
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ImageUploadProps {
  bucketName: 'profile-images' | 'cover-images' | 'custom-backgrounds';
  label: string;
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  aspectRatio?: string;
  maxWidth?: number;
  maxHeight?: number;
}

const ImageUpload = ({
  bucketName,
  label,
  onImageUploaded,
  currentImageUrl,
  aspectRatio = "aspect-square",
  maxWidth = 800,
  maxHeight = 800
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve!, 'image/jpeg', 0.8);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Errore",
        description: "Seleziona un file immagine valido",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Errore",
        description: "Il file deve essere più piccolo di 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Resize image
      const resizedBlob = await resizeImage(file, maxWidth, maxHeight);
      
      // Create file from blob
      const resizedFile = new File([resizedBlob!], file.name, {
        type: 'image/jpeg',
      });

      // Generate unique filename
      const fileExt = 'jpg';
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, resizedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        toast({
          title: "Errore",
          description: "Errore durante l'upload dell'immagine",
          variant: "destructive",
        });
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);

      toast({
        title: "Successo",
        description: "Immagine caricata con successo!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'elaborazione dell'immagine",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(undefined);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-gray-200">
        {label}
      </Label>
      
      <Card className="border-0 bg-white/5 backdrop-blur-sm border border-white/10">
        <CardContent className="p-4">
          {previewUrl ? (
            <div className="relative group">
              <div className={`${aspectRatio} w-full overflow-hidden rounded-lg bg-gray-800`}>
                <img
                  src={previewUrl}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="flex gap-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="sm"
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    disabled={isUploading}
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Cambia
                  </Button>
                  <Button
                    onClick={handleRemoveImage}
                    size="sm"
                    variant="outline"
                    className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Rimuovi
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className={`${aspectRatio} w-full border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/50 transition-colors bg-white/5`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-300 text-sm text-center mb-1">
                Clicca per caricare {label.toLowerCase()}
              </p>
              <p className="text-gray-500 text-xs text-center">
                PNG, JPG fino a 5MB
              </p>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpload;

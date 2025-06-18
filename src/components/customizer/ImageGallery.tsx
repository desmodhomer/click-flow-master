
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Trash2, Check } from "lucide-react";

interface ImageGalleryProps {
  bucketName: 'profile-images' | 'cover-images' | 'custom-backgrounds';
  onImageSelect: (url: string) => void;
  selectedImageUrl?: string;
  aspectRatio?: string;
}

interface GalleryImage {
  name: string;
  url: string;
  created_at: string;
}

const ImageGallery = ({
  bucketName,
  onImageSelect,
  selectedImageUrl,
  aspectRatio = "aspect-square"
}: ImageGalleryProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadImages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(user.id, {
          limit: 50,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error loading images:', error);
        return;
      }

      const imageList = data
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(`${user.id}/${file.name}`);
          
          return {
            name: file.name,
            url: publicUrl,
            created_at: file.created_at || ''
          };
        });

      setImages(imageList);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [user, bucketName]);

  const handleDeleteImage = async (imageName: string, imageUrl: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([`${user.id}/${imageName}`]);

      if (error) {
        toast({
          title: "Errore",
          description: "Errore durante l'eliminazione dell'immagine",
          variant: "destructive",
        });
        return;
      }

      // Se l'immagine eliminata era quella selezionata, deselezionala
      if (selectedImageUrl === imageUrl) {
        onImageSelect('');
      }

      // Ricarica la lista
      await loadImages();

      toast({
        title: "Successo",
        description: "Immagine eliminata con successo",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'eliminazione dell'immagine",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 bg-white/5 backdrop-blur-sm border border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (images.length === 0) {
    return (
      <Card className="border-0 bg-white/5 backdrop-blur-sm border border-white/10">
        <CardContent className="p-4">
          <div className="text-center py-8">
            <Image className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-300 text-sm">Nessuna immagine caricata</p>
            <p className="text-gray-500 text-xs mt-1">Le tue immagini caricate appariranno qui</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white/5 backdrop-blur-sm border border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-200">Le tue immagini</h4>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
            {images.length} immagini
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
          {images.map((image) => (
            <div key={image.name} className="relative group">
              <div 
                className={`${aspectRatio} w-full overflow-hidden rounded-lg bg-gray-800 cursor-pointer border-2 transition-all ${
                  selectedImageUrl === image.url 
                    ? 'border-purple-400 shadow-lg shadow-purple-400/25' 
                    : 'border-transparent hover:border-white/30'
                }`}
                onClick={() => onImageSelect(image.url)}
              >
                <img
                  src={image.url}
                  alt="Immagine caricata"
                  className="w-full h-full object-cover"
                />
                
                {/* Selected indicator */}
                {selectedImageUrl === image.url && (
                  <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                    <div className="bg-purple-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Delete button - visible on hover */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(image.name, image.url);
                }}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Clicca su un'immagine per selezionarla
        </p>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;

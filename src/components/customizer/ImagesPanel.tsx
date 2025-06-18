
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Upload, Sparkles } from "lucide-react";
import ProfileCustomization from "@/components/ProfileCustomization";
import ImageGallery from "./ImageGallery";

interface ImagesPanelProps {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (url: string) => void;
  customBackgroundUrl: string;
  setCustomBackgroundUrl: (url: string) => void;
}

const ImagesPanel = ({
  profileImageUrl,
  setProfileImageUrl,
  coverImageUrl,
  setCoverImageUrl,
  customBackgroundUrl,
  setCustomBackgroundUrl
}: ImagesPanelProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <ImageIcon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Immagini e Media</h2>
        <p className="text-sm text-gray-500 mt-1">Personalizza l'aspetto visivo della tua pagina</p>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700 mt-2">
          Passo 3 di 4
        </Badge>
      </div>

      {/* Sezione Upload */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carica Nuove Immagini</h3>
          <ProfileCustomization
            profileImageUrl={profileImageUrl}
            setProfileImageUrl={setProfileImageUrl}
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
            customBackgroundUrl={customBackgroundUrl}
            setCustomBackgroundUrl={setCustomBackgroundUrl}
          />
        </div>
      </div>

      {/* Sezione Galleria */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Galleria Immagini</h3>
          <p className="text-sm text-gray-600 mb-4">
            Seleziona dalle tue immagini caricate precedentemente
          </p>
          
          <div className="space-y-4">
            {/* Galleria Immagini Profilo */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Immagini Profilo</h4>
              <ImageGallery
                bucketName="profile-images"
                onImageSelect={setProfileImageUrl}
                selectedImageUrl={profileImageUrl}
                aspectRatio="aspect-square"
              />
            </div>

            {/* Galleria Immagini Copertina */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Immagini Copertina</h4>
              <ImageGallery
                bucketName="cover-images"
                onImageSelect={setCoverImageUrl}
                selectedImageUrl={coverImageUrl}
                aspectRatio="aspect-[3/1]"
              />
            </div>

            {/* Galleria Sfondi Personalizzati */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sfondi Personalizzati</h4>
              <ImageGallery
                bucketName="custom-backgrounds"
                onImageSelect={setCustomBackgroundUrl}
                selectedImageUrl={customBackgroundUrl}
                aspectRatio="aspect-[9/16]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-purple-800 text-sm font-medium mb-1">
                <strong>Suggerimenti per le immagini:</strong>
              </p>
              <ul className="text-purple-700 text-xs space-y-1">
                <li>• Usa immagini di alta qualità e ben illuminate</li>
                <li>• La foto profilo dovrebbe essere quadrata (1:1)</li>
                <li>• La copertina funziona meglio in formato 3:1</li>
                <li>• Lo sfondo personalizzato dovrebbe essere 9:16 per mobile</li>
                <li>• Le immagini vengono automaticamente ottimizzate per il web</li>
                <li>• Puoi eliminare immagini dalla galleria cliccando sull'icona cestino</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesPanel;

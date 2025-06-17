
-- Estendere la tabella custom_links con i nuovi campi per la personalizzazione
ALTER TABLE public.custom_links 
ADD COLUMN profile_image_url TEXT,
ADD COLUMN cover_image_url TEXT,
ADD COLUMN custom_background_url TEXT,
ADD COLUMN background_theme TEXT DEFAULT 'gradient-blue',
ADD COLUMN social_links JSONB DEFAULT '[]'::jsonb,
ADD COLUMN bio TEXT,
ADD COLUMN display_name TEXT;

-- Creare bucket per le immagini del profilo
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-images', 'profile-images', true);

-- Creare bucket per le immagini di copertina
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cover-images', 'cover-images', true);

-- Creare bucket per gli sfondi personalizzati
INSERT INTO storage.buckets (id, name, public) 
VALUES ('custom-backgrounds', 'custom-backgrounds', true);

-- Politiche per profile-images bucket
CREATE POLICY "Anyone can view profile images" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can upload profile images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'profile-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own profile images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'profile-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profile-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Politiche per cover-images bucket
CREATE POLICY "Anyone can view cover images" ON storage.objects
FOR SELECT USING (bucket_id = 'cover-images');

CREATE POLICY "Authenticated users can upload cover images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'cover-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own cover images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'cover-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own cover images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'cover-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Politiche per custom-backgrounds bucket
CREATE POLICY "Anyone can view custom backgrounds" ON storage.objects
FOR SELECT USING (bucket_id = 'custom-backgrounds');

CREATE POLICY "Authenticated users can upload custom backgrounds" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'custom-backgrounds' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own custom backgrounds" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'custom-backgrounds' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own custom backgrounds" ON storage.objects
FOR DELETE USING (
  bucket_id = 'custom-backgrounds' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

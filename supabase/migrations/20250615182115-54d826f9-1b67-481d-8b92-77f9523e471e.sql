
-- Create a table for custom links
CREATE TABLE public.custom_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  destination_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  user_id UUID REFERENCES auth.users,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.custom_links ENABLE ROW LEVEL SECURITY;

-- Create policies for custom_links
-- Allow everyone to view links (needed for subdomain routing)
CREATE POLICY "Anyone can view custom links" 
  ON public.custom_links 
  FOR SELECT 
  USING (true);

-- Allow anyone to create links (for anonymous users too)
CREATE POLICY "Anyone can create custom links" 
  ON public.custom_links 
  FOR INSERT 
  WITH CHECK (true);

-- Users can update their own links (if they're authenticated)
CREATE POLICY "Users can update their own links" 
  ON public.custom_links 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own links (if they're authenticated)
CREATE POLICY "Users can delete their own links" 
  ON public.custom_links 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for faster slug lookups
CREATE INDEX idx_custom_links_slug ON public.custom_links(slug);


-- Add custom_buttons column to custom_links table
ALTER TABLE public.custom_links 
ADD COLUMN custom_buttons jsonb DEFAULT '[]'::jsonb;

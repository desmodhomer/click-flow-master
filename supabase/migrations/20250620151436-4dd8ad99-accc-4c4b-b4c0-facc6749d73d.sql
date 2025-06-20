
-- Update the custom_links table to make user_id NOT NULL for new records
-- and add an index for better performance when querying user's links
ALTER TABLE public.custom_links 
ALTER COLUMN user_id SET NOT NULL;

-- Add index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_custom_links_user_id ON public.custom_links(user_id);

-- Update RLS policies to ensure users can only see and manage their own links
DROP POLICY IF EXISTS "Anyone can view custom links" ON public.custom_links;
DROP POLICY IF EXISTS "Anyone can create custom links" ON public.custom_links;

-- New policies: users can only see their own links when authenticated
CREATE POLICY "Users can view their own links" 
  ON public.custom_links 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow public access for subdomain routing (needed for the actual link functionality)
CREATE POLICY "Public can view links for subdomain routing" 
  ON public.custom_links 
  FOR SELECT 
  TO anon
  USING (true);

-- Users can create their own links
CREATE POLICY "Authenticated users can create links" 
  ON public.custom_links 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create the membership_signups table
CREATE TABLE membership_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_membership_signups_email ON membership_signups(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_membership_signups_created_at ON membership_signups(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE membership_signups ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for signups)
CREATE POLICY "Allow public signups" ON membership_signups
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows only authenticated users to read (optional, for admin access)
CREATE POLICY "Allow authenticated read" ON membership_signups
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_membership_signups_updated_at
  BEFORE UPDATE ON membership_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

/*
  # Create RSVP table for gender reveal event

  1. New Tables
    - `rsvps`
      - `id` (uuid, primary key)
      - `name` (text, required) - Guest name
      - `guests` (integer, required) - Number of guests attending
      - `status` (text, required) - Either 'going' or 'not_going'
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `rsvps` table
    - Add policy for anonymous users to insert their own RSVPs
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  guests integer DEFAULT 1,
  status text NOT NULL CHECK (status IN ('going', 'not_going')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert RSVPs"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read RSVPs"
  ON rsvps
  FOR SELECT
  TO anon
  USING (true);
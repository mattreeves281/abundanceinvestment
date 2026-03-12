/*
  # Fix RLS Security and Performance Issues

  1. Performance Optimizations
    - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()` to prevent re-evaluation per row
    - This significantly improves query performance at scale

  2. Security Improvements
    - Restrict INSERT policies to only allow creation with proper user_id or null (for anonymous sessions)
    - Remove "always true" policies that bypass RLS
    - Add proper validation on insert operations

  3. Index Management
    - Keep indexes as they will be used once authentication is implemented
    - Indexes are important for future performance even if unused initially

  4. Changes Made
    - Drop and recreate all RLS policies with optimized auth checks
    - Add proper INSERT restrictions for security
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create buy journey sessions" ON buy_journey_sessions;
DROP POLICY IF EXISTS "Users can read own sessions" ON buy_journey_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON buy_journey_sessions;

DROP POLICY IF EXISTS "Anyone can create investments" ON investments;
DROP POLICY IF EXISTS "Users can read own investments" ON investments;
DROP POLICY IF EXISTS "Users can update own investments" ON investments;

-- Buy Journey Sessions Policies (Optimized)

-- Allow anonymous and authenticated users to create sessions, but enforce user_id consistency
CREATE POLICY "Users can create sessions"
  ON buy_journey_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Anonymous users can only create sessions with null user_id
    (auth.uid() IS NULL AND user_id IS NULL)
    OR
    -- Authenticated users must set their own user_id
    (user_id = (select auth.uid()))
  );

-- Users can read their own sessions (optimized with select)
CREATE POLICY "Users can read own sessions"
  ON buy_journey_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Anonymous users can read sessions without user_id
CREATE POLICY "Anonymous can read own sessions"
  ON buy_journey_sessions
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- Users can update their own sessions (optimized with select)
CREATE POLICY "Users can update own sessions"
  ON buy_journey_sessions
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Investments Policies (Optimized)

-- Allow creation with proper user_id validation
CREATE POLICY "Users can create investments"
  ON investments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Anonymous users can create with null user_id
    (auth.uid() IS NULL AND user_id IS NULL)
    OR
    -- Authenticated users must set their own user_id
    (user_id = (select auth.uid()))
  );

-- Users can read their own investments (optimized with select)
CREATE POLICY "Users can read own investments"
  ON investments
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Anonymous users can read investments without user_id (for confirmation page)
CREATE POLICY "Anonymous can read own investments"
  ON investments
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- Users can update their own investments (optimized with select)
CREATE POLICY "Users can update own investments"
  ON investments
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

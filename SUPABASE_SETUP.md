# Supabase Setup Guide for Membership Signups

This guide will help you set up Supabase to store membership signup data instead of just sending emails.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `balanced-yoga-membership` (or your preferred name)
   - Database Password: Create a strong password (save this!)
   - Region: Choose the closest to your users
5. Click "Create new project"
6. Wait for the project to be created (usually takes 1-2 minutes)

## 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...` - this is the secret key)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: Keep your existing Resend configuration for email notifications
RESEND_API_KEY=your_existing_resend_key
```

## 4. Create the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` (included in this project)
4. Click "Run" to execute the SQL

This will create:
- `membership_signups` table with proper structure
- Indexes for performance
- Row Level Security policies
- Automatic timestamp updates

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to your website
3. Wait for the membership popup to appear (2 seconds)
4. Fill out the form and submit
5. Check your Supabase dashboard → **Table Editor** → `membership_signups` to see the data

## 6. View Your Data

In Supabase dashboard:
- Go to **Table Editor**
- Select `membership_signups` table
- You'll see all signups with timestamps
- You can export data, filter, and manage signups

## 7. Optional: Set Up Email Notifications

The system will still send you email notifications when someone signs up (if you have Resend configured). You can:
- Keep this for immediate notifications
- Remove it if you prefer to just use the database
- Set up automated emails from Supabase instead

## 8. Security Notes

- The `service_role` key has full database access - keep it secret
- The `anon` key is safe to use in client-side code
- Row Level Security is enabled for additional protection
- Duplicate emails are prevented at the database level

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**: Check your environment variables are correct
2. **"Table doesn't exist" error**: Make sure you ran the SQL schema
3. **CORS errors**: Supabase handles CORS automatically, but check your domain settings
4. **Duplicate email error**: This is expected - the system prevents duplicate signups

### Debug Steps:

1. Check browser console for errors
2. Check your server logs (`npm run dev` terminal)
3. Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
4. Check Supabase logs in the dashboard

## Next Steps

Once this is working, you can:
- Add more fields to the signup form (phone, interests, etc.)
- Set up automated email campaigns
- Create an admin dashboard to view signups
- Add analytics and reporting
- Integrate with other tools (Mailchimp, etc.)

# Saunas Plus - Database Schema

**Last Updated:** January 2025

## Tables Overview

### contacts
Form submissions from website
- `id` (uuid, PK)
- `name` (text)
- `email` (text)
- `phone` (text)
- `message` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### newsletter_subscribers
Email list for newsletters
- `id` (uuid, PK)
- `email` (text, unique)
- `subscribed_at` (timestamp)
- `unsubscribed_at` (timestamp, nullable)

### blog_posts
Blog content and metadata
- `id` (uuid, PK)
- `title` (text)
- `slug` (text, unique)
- `content` (text)
- `excerpt` (text)
- `author_name` (text)
- `category` (text)
- `tags` (text[])
- `seo_title` (text)
- `seo_description` (text)
- `seo_keywords` (text)
- `featured_image` (text)
- `status` (text)
- `published_at` (timestamp)
- `view_count` (int)
- `reading_time` (int)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### gallery_images
Project photos and metadata
- `id` (uuid, PK)
- `url` (text)
- `title` (text)
- `description` (text)
- `alt_text` (text)
- `category` (text)
- `is_featured` (boolean)
- `created_at` (timestamp)

### reviews
Customer testimonials
- `id` (uuid, PK)
- `customer_name` (text)
- `rating` (int)
- `review_text` (text)
- `is_approved` (boolean)
- `is_featured` (boolean)
- `created_at` (timestamp)

### owner_profile
Owner bio and credentials
- `id` (uuid, PK)
- `name` (text)
- `bio` (text)
- `credentials` (text[])
- `photo_url` (text)
- `updated_at` (timestamp)

### blog_generator_settings
AI generation configuration
- `id` (uuid, PK)
- `schedule_enabled` (boolean)
- `generation_frequency` (text)
- Various prompt and model settings
- `updated_at` (timestamp)

### blog_generation_logs
Generation history tracking
- `id` (uuid, PK)
- `post_id` (uuid, nullable)
- `status` (text)
- `result_data` (jsonb)
- `error_message` (text, nullable)
- `started_at` (timestamp)
- `completed_at` (timestamp, nullable)

### site_content
Search index for internal linking
- `id` (uuid, PK)
- `url` (text, unique)
- `page_type` (text)
- `title` (text)
- `main_keywords` (text[])
- `last_modified_at` (timestamp)

### user_roles
Admin access control
- `user_id` (uuid, FK to auth.users)
- `role` (app_role enum)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_generation_logs: {
        Row: {
          blog_post_id: string | null
          clarity_edit_result: Json | null
          completed_steps: number | null
          content_result: Json | null
          created_at: string
          current_step: string | null
          error_message: string | null
          fact_check_result: Json | null
          id: string
          image_generation_result: Json | null
          image_suggestions_result: Json | null
          manual_trigger: boolean | null
          outline_result: Json | null
          research_result: Json | null
          sentence_improve_result: Json | null
          seo_result: Json | null
          status: string
          topic_result: Json | null
          total_steps: number | null
          total_time_seconds: number | null
        }
        Insert: {
          blog_post_id?: string | null
          clarity_edit_result?: Json | null
          completed_steps?: number | null
          content_result?: Json | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          fact_check_result?: Json | null
          id?: string
          image_generation_result?: Json | null
          image_suggestions_result?: Json | null
          manual_trigger?: boolean | null
          outline_result?: Json | null
          research_result?: Json | null
          sentence_improve_result?: Json | null
          seo_result?: Json | null
          status?: string
          topic_result?: Json | null
          total_steps?: number | null
          total_time_seconds?: number | null
        }
        Update: {
          blog_post_id?: string | null
          clarity_edit_result?: Json | null
          completed_steps?: number | null
          content_result?: Json | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          fact_check_result?: Json | null
          id?: string
          image_generation_result?: Json | null
          image_suggestions_result?: Json | null
          manual_trigger?: boolean | null
          outline_result?: Json | null
          research_result?: Json | null
          sentence_improve_result?: Json | null
          seo_result?: Json | null
          status?: string
          topic_result?: Json | null
          total_steps?: number | null
          total_time_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_generation_logs_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_generator_settings: {
        Row: {
          clarity_edit_prompt: string
          content_prompt: string
          created_at: string
          cron_expression: string
          fact_check_prompt: string
          generate_images: boolean
          id: string
          image_suggestions_prompt: string
          max_images: number
          outline_prompt: string
          research_prompt: string
          schedule_enabled: boolean
          sentence_improve_prompt: string
          seo_prompt: string
          target_word_count: number
          topic_prompt: string
          updated_at: string
          use_pro_for_content: boolean
          use_pro_for_fact_check: boolean
        }
        Insert: {
          clarity_edit_prompt?: string
          content_prompt?: string
          created_at?: string
          cron_expression?: string
          fact_check_prompt?: string
          generate_images?: boolean
          id?: string
          image_suggestions_prompt?: string
          max_images?: number
          outline_prompt?: string
          research_prompt?: string
          schedule_enabled?: boolean
          sentence_improve_prompt?: string
          seo_prompt?: string
          target_word_count?: number
          topic_prompt?: string
          updated_at?: string
          use_pro_for_content?: boolean
          use_pro_for_fact_check?: boolean
        }
        Update: {
          clarity_edit_prompt?: string
          content_prompt?: string
          created_at?: string
          cron_expression?: string
          fact_check_prompt?: string
          generate_images?: boolean
          id?: string
          image_suggestions_prompt?: string
          max_images?: number
          outline_prompt?: string
          research_prompt?: string
          schedule_enabled?: boolean
          sentence_improve_prompt?: string
          seo_prompt?: string
          target_word_count?: number
          topic_prompt?: string
          updated_at?: string
          use_pro_for_content?: boolean
          use_pro_for_fact_check?: boolean
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          article_type: string | null
          author_avatar_url: string | null
          author_name: string
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean
          published_at: string | null
          reading_time_minutes: number | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          article_type?: string | null
          author_avatar_url?: string | null
          author_name?: string
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          article_type?: string | null
          author_avatar_url?: string | null
          author_name?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: []
      }
      blog_writing_context: {
        Row: {
          avg_post_length: number | null
          brand_voice: string | null
          common_phrases: Json | null
          company_name: string | null
          id: string
          linking_rules: Json | null
          most_popular_categories: Json | null
          priority_pages: Json | null
          prohibited_links: string[] | null
          service_area: string | null
          target_audience: string | null
          total_published_posts: number | null
          updated_at: string | null
        }
        Insert: {
          avg_post_length?: number | null
          brand_voice?: string | null
          common_phrases?: Json | null
          company_name?: string | null
          id?: string
          linking_rules?: Json | null
          most_popular_categories?: Json | null
          priority_pages?: Json | null
          prohibited_links?: string[] | null
          service_area?: string | null
          target_audience?: string | null
          total_published_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_post_length?: number | null
          brand_voice?: string | null
          common_phrases?: Json | null
          company_name?: string | null
          id?: string
          linking_rules?: Json | null
          most_popular_categories?: Json | null
          priority_pages?: Json | null
          prohibited_links?: string[] | null
          service_area?: string | null
          target_audience?: string | null
          total_published_posts?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          priority: string | null
          service_interested_in: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          priority?: string | null
          service_interested_in?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          priority?: string | null
          service_interested_in?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      content_relationships: {
        Row: {
          ai_reasoning: string | null
          created_at: string | null
          id: string
          relationship_type: string
          relevance_score: number | null
          source_url: string
          target_url: string
        }
        Insert: {
          ai_reasoning?: string | null
          created_at?: string | null
          id?: string
          relationship_type: string
          relevance_score?: number | null
          source_url: string
          target_url: string
        }
        Update: {
          ai_reasoning?: string | null
          created_at?: string | null
          id?: string
          relationship_type?: string
          relevance_score?: number | null
          source_url?: string
          target_url?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string
          category: string
          created_at: string
          description: string | null
          featured: boolean
          id: string
          image_url: string
          is_published: boolean
          license_info: string | null
          order_index: number
          photographer_credit: string | null
          project_details: Json | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          alt_text: string
          category?: string
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url: string
          is_published?: boolean
          license_info?: string | null
          order_index?: number
          photographer_credit?: string | null
          project_details?: Json | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          alt_text?: string
          category?: string
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string
          is_published?: boolean
          license_info?: string | null
          order_index?: number
          photographer_credit?: string | null
          project_details?: Json | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      owner_profile: {
        Row: {
          additional_photos: Json | null
          bbb_rating: string | null
          bio: string
          certifications: string[] | null
          community_involvement: string | null
          created_at: string
          email: string | null
          favorite_project_description: string | null
          full_name: string
          id: string
          insurance_info: string | null
          license_numbers: string[] | null
          personal_sauna_details: string | null
          phone: string | null
          photo_url: string | null
          response_time_guarantee: string | null
          short_bio: string | null
          specialties: string[] | null
          title: string | null
          updated_at: string
          years_of_experience: number | null
        }
        Insert: {
          additional_photos?: Json | null
          bbb_rating?: string | null
          bio: string
          certifications?: string[] | null
          community_involvement?: string | null
          created_at?: string
          email?: string | null
          favorite_project_description?: string | null
          full_name?: string
          id?: string
          insurance_info?: string | null
          license_numbers?: string[] | null
          personal_sauna_details?: string | null
          phone?: string | null
          photo_url?: string | null
          response_time_guarantee?: string | null
          short_bio?: string | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string
          years_of_experience?: number | null
        }
        Update: {
          additional_photos?: Json | null
          bbb_rating?: string | null
          bio?: string
          certifications?: string[] | null
          community_involvement?: string | null
          created_at?: string
          email?: string | null
          favorite_project_description?: string | null
          full_name?: string
          id?: string
          insurance_info?: string | null
          license_numbers?: string[] | null
          personal_sauna_details?: string | null
          phone?: string | null
          photo_url?: string | null
          response_time_guarantee?: string | null
          short_bio?: string | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string
          years_of_experience?: number | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          admin_notes: string | null
          author_avatar_url: string | null
          author_location: string
          author_name: string
          created_at: string
          id: string
          is_featured: boolean
          is_published: boolean
          project_date: string | null
          project_type: string | null
          published_at: string | null
          rating: number
          review_text: string
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          author_avatar_url?: string | null
          author_location: string
          author_name: string
          created_at?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          project_date?: string | null
          project_type?: string | null
          published_at?: string | null
          rating: number
          review_text: string
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          author_avatar_url?: string | null
          author_location?: string
          author_name?: string
          created_at?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          project_date?: string | null
          project_type?: string | null
          published_at?: string | null
          rating?: number
          review_text?: string
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          call_to_actions: Json | null
          category: string | null
          content_summary: string | null
          created_at: string | null
          excerpt: string | null
          h1_heading: string | null
          h2_headings: string[] | null
          id: string
          indexed_content: string | null
          internal_links_to: Json | null
          key_topics: Json | null
          last_indexed_at: string | null
          last_modified_at: string | null
          main_keywords: string[] | null
          page_type: string
          related_pages: Json | null
          slug: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          url: string
          word_count: number | null
        }
        Insert: {
          call_to_actions?: Json | null
          category?: string | null
          content_summary?: string | null
          created_at?: string | null
          excerpt?: string | null
          h1_heading?: string | null
          h2_headings?: string[] | null
          id?: string
          indexed_content?: string | null
          internal_links_to?: Json | null
          key_topics?: Json | null
          last_indexed_at?: string | null
          last_modified_at?: string | null
          main_keywords?: string[] | null
          page_type: string
          related_pages?: Json | null
          slug?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          url: string
          word_count?: number | null
        }
        Update: {
          call_to_actions?: Json | null
          category?: string | null
          content_summary?: string | null
          created_at?: string | null
          excerpt?: string | null
          h1_heading?: string | null
          h2_headings?: string[] | null
          id?: string
          indexed_content?: string | null
          internal_links_to?: Json | null
          key_topics?: Json | null
          last_indexed_at?: string | null
          last_modified_at?: string | null
          main_keywords?: string[] | null
          page_type?: string
          related_pages?: Json | null
          slug?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          url?: string
          word_count?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const

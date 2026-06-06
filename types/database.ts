export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          age: number;
          gender: string;
          address: string;
          goal: string;
          batch: string;
          plan_id: string | null;
          join_date: string;
          expiry_date: string;
          status: "active" | "expired" | "pending";
          emergency_contact: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          age: number;
          gender: string;
          address: string;
          goal: string;
          batch: string;
          plan_id?: string | null;
          join_date?: string;
          expiry_date?: string;
          status?: "active" | "expired" | "pending";
          emergency_contact: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          age?: number;
          gender?: string;
          address?: string;
          goal?: string;
          batch?: string;
          plan_id?: string | null;
          join_date?: string;
          expiry_date?: string;
          status?: "active" | "expired" | "pending";
          emergency_contact?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      plans: {
        Row: {
          id: string;
          name: string;
          duration_months: number;
          price: number;
          inclusions: Json;
          is_popular: boolean;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          duration_months: number;
          price: number;
          inclusions?: Json;
          is_popular?: boolean;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          duration_months?: number;
          price?: number;
          inclusions?: Json;
          is_popular?: boolean;
          is_active?: boolean;
        };
        Relationships: [];
      };
      trainers: {
        Row: {
          id: string;
          name: string;
          specialization: string;
          certifications: Json;
          experience_years: number;
          bio: string;
          photo_url: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          specialization: string;
          certifications?: Json;
          experience_years?: number;
          bio?: string;
          photo_url?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          specialization?: string;
          certifications?: Json;
          experience_years?: number;
          bio?: string;
          photo_url?: string | null;
          display_order?: number;
        };
        Relationships: [];
      };
      gallery: {
        Row: {
          id: string;
          url: string;
          category: string;
          caption: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          category: string;
          caption?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          category?: string;
          caption?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          member_name: string;
          content: string;
          rating: number;
          created_at: string;
          is_visible: boolean;
        };
        Insert: {
          id?: string;
          member_name: string;
          content: string;
          rating?: number;
          created_at?: string;
          is_visible?: boolean;
        };
        Update: {
          id?: string;
          member_name?: string;
          content?: string;
          rating?: number;
          created_at?: string;
          is_visible?: boolean;
        };
        Relationships: [];
      };
      progress_logs: {
        Row: {
          id: string;
          member_id: string;
          weight: number;
          chest: number | null;
          waist: number | null;
          arms: number | null;
          date: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          weight: number;
          chest?: number | null;
          waist?: number | null;
          arms?: number | null;
          date?: string;
        };
        Update: {
          id?: string;
          member_id?: string;
          weight?: number;
          chest?: number | null;
          waist?: number | null;
          arms?: number | null;
          date?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          phone: string;
          message: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          message: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          message?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      broadcasts: {
        Row: {
          id: string;
          message: string;
          sent_at: string;
          recipient_count: number;
        };
        Insert: {
          id?: string;
          message: string;
          sent_at?: string;
          recipient_count?: number;
        };
        Update: {
          id?: string;
          message?: string;
          sent_at?: string;
          recipient_count?: number;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Member = Database["public"]["Tables"]["members"]["Row"];
export type Plan = Database["public"]["Tables"]["plans"]["Row"];
export type Trainer = Database["public"]["Tables"]["trainers"]["Row"];
export type GalleryItem = Database["public"]["Tables"]["gallery"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type ProgressLog = Database["public"]["Tables"]["progress_logs"]["Row"];
export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];

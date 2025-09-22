export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  policy: {
    Tables: {
      policy_doc_hashes: {
        Row: {
          content_hash: string
          created_at: string
          document_id: string
          id: string
        }
        Insert: {
          content_hash: string
          created_at?: string
          document_id: string
          id?: string
        }
        Update: {
          content_hash?: string
          created_at?: string
          document_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_doc_hashes_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "policy_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_documents: {
        Row: {
          content: string
          created_at: string
          document_type: Database["policy"]["Enums"]["policy_doc_types"]
          effective_from: string
          id: string
          superseded_at: string | null
          version: string
        }
        Insert: {
          content: string
          created_at?: string
          document_type: Database["policy"]["Enums"]["policy_doc_types"]
          effective_from: string
          id?: string
          superseded_at?: string | null
          version: string
        }
        Update: {
          content?: string
          created_at?: string
          document_type?: Database["policy"]["Enums"]["policy_doc_types"]
          effective_from?: string
          id?: string
          superseded_at?: string | null
          version?: string
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consent_method: Database["policy"]["Enums"]["consent_methods"]
          consented_at: string
          document_id: string
          id: string
          ip_address: unknown
          revocation_reason:
            | Database["policy"]["Enums"]["revocation_reasons"]
            | null
          revoked_at: string | null
          user_agent: string
          user_id: string
        }
        Insert: {
          consent_method: Database["policy"]["Enums"]["consent_methods"]
          consented_at?: string
          document_id: string
          id?: string
          ip_address: unknown
          revocation_reason?:
            | Database["policy"]["Enums"]["revocation_reasons"]
            | null
          revoked_at?: string | null
          user_agent: string
          user_id?: string
        }
        Update: {
          consent_method?: Database["policy"]["Enums"]["consent_methods"]
          consented_at?: string
          document_id?: string
          id?: string
          ip_address?: unknown
          revocation_reason?:
            | Database["policy"]["Enums"]["revocation_reasons"]
            | null
          revoked_at?: string | null
          user_agent?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_consents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "policy_documents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      consent_methods: "checkbox" | "button_clicked"
      policy_doc_types: "T&C" | "cookies" | "privacy" | "disclaimer"
      revocation_reasons: "user_request" | "account_deletion" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alpha_tokens: {
        Row: {
          created_at: string
          id: string
          send_email: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          send_email?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          send_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alpha_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      endorsements: {
        Row: {
          created_at: string
          endorsed_to: string
          id: string
          skill_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          endorsed_to: string
          id?: string
          skill_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          endorsed_to?: string
          id?: string
          skill_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "endorsements_endorsed_to_fkey"
            columns: ["endorsed_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "endorsements_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "endorsements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          followee_id: string
          follower_id: string
        }
        Insert: {
          created_at?: string
          followee_id: string
          follower_id: string
        }
        Update: {
          created_at?: string
          followee_id?: string
          follower_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_followee_id_fkey"
            columns: ["followee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: number
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
          visibility: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          visibility?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_skills: {
        Row: {
          level: number
          profile_id: string
          skill_id: number
        }
        Insert: {
          level: number
          profile_id: string
          skill_id: number
        }
        Update: {
          level?: number
          profile_id?: string
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          headline: string | null
          id: string
          links: string[] | null
          location: string | null
          username: string | null
          visibility: Database["public"]["Enums"]["profile_visibility"]
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          headline?: string | null
          id: string
          links?: string[] | null
          location?: string | null
          username?: string | null
          visibility?: Database["public"]["Enums"]["profile_visibility"]
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          headline?: string | null
          id?: string
          links?: string[] | null
          location?: string | null
          username?: string | null
          visibility?: Database["public"]["Enums"]["profile_visibility"]
        }
        Relationships: []
      }
      project_updates: {
        Row: {
          created_at: string
          id: string
          project_id: string
          update: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          update: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          update?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          external_url: string | null
          id: string
          name: string
          owner_id: string
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
          visibility: Database["public"]["Enums"]["project_visibility"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          name: string
          owner_id: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["project_visibility"]
        }
        Update: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          name?: string
          owner_id?: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["project_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      profile_visibility: "public" | "platform" | "private"
      project_status:
        | "planning"
        | "in-progress"
        | "on-hold"
        | "completed"
        | "launched"
      project_visibility: "public" | "private"
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
  graphql_public: {
    Enums: {},
  },
  policy: {
    Enums: {
      consent_methods: ["checkbox", "button_clicked"],
      policy_doc_types: ["T&C", "cookies", "privacy", "disclaimer"],
      revocation_reasons: ["user_request", "account_deletion", "other"],
    },
  },
  public: {
    Enums: {
      profile_visibility: ["public", "platform", "private"],
      project_status: [
        "planning",
        "in-progress",
        "on-hold",
        "completed",
        "launched",
      ],
      project_visibility: ["public", "private"],
    },
  },
} as const


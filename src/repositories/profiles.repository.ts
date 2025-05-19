import { SupabaseClient } from "@supabase/supabase-js";
import { BaseRepository } from "./base.repository";
import { Repository } from "./types";
import { Database } from "supabase/supabase.types";
import { Maybe } from "utils/types";
import { ErrorService } from "@/services/Error.service";

export interface Profile {
  id: string;
  name: Maybe<string>;
  avatar_url: Maybe<string>;
}

export class ProfileRepository
  extends BaseRepository
  implements Repository<Profile>
{
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase);
  }

  async getCurrentUser(): Promise<Maybe<Profile>> {
    try {
      const {
        data: { session },
        error: authUserError,
      } = await this.supabase.auth.getSession();

      if (authUserError || !session?.user) {
        throw new Error("Cannot find user");
      }

      const { data, error } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        throw new Error("Cannot find user profile");
      }

      return data;
    } catch (e) {
      ErrorService.handleError(e);
      return null;
    }
  }

  async getById(id: string): Promise<Maybe<Profile>> {
    try {
      const { data, error } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        throw new Error("Profile not found");
      }

      return data;
    } catch (e) {
      ErrorService.handleError(e);
      return null;
    }
  }

  async getAll(): Promise<Maybe<Profile[]>> {
    try {
      const { data, error } = await this.supabase.from("profiles").select("*");

      if (error) {
        throw new Error("Profiles not found");
      }

      return data;
    } catch (e) {
      ErrorService.handleError(e);
    }
  }

  async update(id: string, update: Partial<Profile>): Promise<Maybe<Profile>> {
    try {
      const { data, error } = await this.supabase
        .from("profiles")
        .update(update)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (error) {
        throw new Error("Cannot update profile");
      }

      return data;
    } catch (e) {
      ErrorService.handleError(e);
      return null;
    }
  }
}

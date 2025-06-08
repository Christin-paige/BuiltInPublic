import { BaseRepository } from "../base.repository";
import { AnySupabaseClient } from "utils/supabase/server";
import { Profile, ProfileDTO } from "./profile.types";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export class ProfileRepository extends BaseRepository<ProfileDTO, Profile> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  getBaseQuery(count: boolean = false): PostgrestFilterBuilder<any, any, any> {
    const query = this.supabase
      .from("profiles")
      .select("*", count ? { count: "exact" } : undefined);

    return query;
  }

  transformDTO(row: ProfileDTO): Profile {
    const { id, name, avatar_url } = row;

    return {
      id,
      name: name || "Unknown",
      avatarUrl: avatar_url || "",
    } satisfies Profile;
  }

  async getCurrentUser(): Promise<Profile | null> {
    try {
      const {
        data: { user },
        error: authUserError,
      } = await this.supabase.auth.getUser();

      if (authUserError || !user) {
        throw new Error("Cannot find user");
      }

      const profile = await this.getById(user.id);
      return profile;
    } catch (e) {
      throw e;
    }
  }

  async getById(id: string): Promise<Profile | null> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, { id });

      if (!data || error) {
        throw new Error("Cannot find profile");
      }

      const profile = this.transformDTO(data);

      return profile;
    } catch (e) {
      throw e;
    }
  }
}

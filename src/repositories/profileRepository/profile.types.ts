export interface ProfileDTO {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  display_name: string | null;
}

export interface Profile {
  id: string;
  username: string | null;
  avatarUrl: string | null;
  bio?: string;
  displayName?: string | null;
}

export interface ProfileDTO {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export interface Profile {
  id: string;
  username: string | null;
  avatarUrl: string | null;
  bio?: string;
}

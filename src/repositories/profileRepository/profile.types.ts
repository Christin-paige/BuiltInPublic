export interface ProfileDTO {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

export interface Profile {
  id: string;
  username: string;
  avatarUrl: string | null;
}

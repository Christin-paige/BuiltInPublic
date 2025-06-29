export interface ProfileDTO {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export interface Profile {
  id: string;
  name: string;
  avatarUrl: string | null;
}

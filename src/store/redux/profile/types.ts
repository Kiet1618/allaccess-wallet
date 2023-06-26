export type Profile = {
  userName: string;
  email: string;
  avatar: string;
};
export type ProfileState = {
  profileInfo: {
    data: Profile;
    loading: boolean;
    error: unknown;
  };
};
